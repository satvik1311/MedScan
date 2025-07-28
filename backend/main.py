from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential
from azure.cosmos import CosmosClient, PartitionKey
from dotenv import load_dotenv
from openai import AzureOpenAI
import os
import uuid
from datetime import datetime, timedelta
import logging

# Load environment variables
load_dotenv()

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # change to deployed frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Azure Blob Storage
blob_service_client = BlobServiceClient.from_connection_string(os.getenv("AZURE_BLOB_CONN_STRING"))
storage_account_name = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
storage_account_key = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
container_name = os.getenv("CONTAINER_NAME")

# Azure Form Recognizer
form_recognizer_client = DocumentAnalysisClient(
    endpoint=os.getenv("FORM_RECOGNIZER_ENDPOINT"),
    credential=AzureKeyCredential(os.getenv("FORM_RECOGNIZER_KEY"))
)

# Cosmos DB
cosmos_client = CosmosClient(os.getenv("COSMOS_DB_ENDPOINT"), os.getenv("COSMOS_DB_KEY"))
database = cosmos_client.create_database_if_not_exists(id="medscan-db")
container = database.create_container_if_not_exists(id="prescriptions", partition_key=PartitionKey(path="/id"))

# Azure OpenAI
openai_client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

@app.get("/")
def read_root():
    return {"message": "✅ MedScan backend is running!"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    try:
        filename = f"{uuid.uuid4()}_{file.filename}"
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=filename)
        contents = await file.read()
        blob_client.upload_blob(contents, overwrite=True)
        return {"message": "File uploaded successfully", "blob_name": filename}
    except Exception as e:
        logger.error(f"Upload failed: {e}")
        raise HTTPException(status_code=500, detail="Upload failed.")

@app.post("/analyze")
async def analyze_prescription(data: dict):
    blob_name = data.get("blob_name")
    if not blob_name:
        raise HTTPException(status_code=400, detail="Missing blob_name in request.")

    try:
        # Generate SAS token
        sas_token = generate_blob_sas(
            account_name=storage_account_name,
            container_name=container_name,
            blob_name=blob_name,
            account_key=storage_account_key,
            permission=BlobSasPermissions(read=True),
            expiry=datetime.utcnow() + timedelta(hours=1)
        )

        blob_url = f"https://{storage_account_name}.blob.core.windows.net/{container_name}/{blob_name}?{sas_token}"

        # OCR from Form Recognizer
        poller = form_recognizer_client.begin_analyze_document_from_url(
            model_id="prebuilt-document",
            document_url=blob_url
        )
        result = poller.result()

        extracted_text = "\n".join(line.content for page in result.pages for line in page.lines)
        logger.info(f"Extracted Text: {extracted_text[:300]}...")

        # Azure OpenAI summarization
        completion = openai_client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a medical assistant. Given OCR text from a prescription, return a JSON object including:\n"
                        "- riskLevel (LOW, MODERATE, HIGH)\n"
                        "- summary (1 paragraph)\n"
                        "- medicines: list of {name, type, dosage, frequency, duration, instructions}\n"
                        "- interactions: list of {drug1, drug2, severity, description, recommendation}\n"
                        "- recommendations: 4-5 bullet points for the patient\n"
                        "- extractedText: full OCR result"
                    )
                },
                {"role": "user", "content": extracted_text}
            ],
            temperature=0.4,
            max_tokens=1000,
        )

        ai_analysis = completion.choices[0].message.content

        # Save result to Cosmos DB
        prescription_id = str(uuid.uuid4())
        item = {
            "id": prescription_id,
            "blob_name": blob_name,
            "extracted_text": extracted_text,
            "ai_analysis": ai_analysis,
            "analyzed_at": datetime.utcnow().isoformat()
        }
        container.create_item(item)

        return item
    except Exception as e:
        logger.error(f"Analysis failed: {e}")
        raise HTTPException(status_code=500, detail="Analysis failed.")

@app.post("/test-ocr")
async def test_ocr(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        poller = form_recognizer_client.begin_analyze_document(
            model_id="prebuilt-document",
            document=contents
        )
        result = poller.result()
        lines = [line.content for page in result.pages for line in page.lines]
        return {"ocr_result": lines}
    except Exception as e:
        logger.error(f"OCR Test failed: {e}")
        raise HTTPException(status_code=500, detail="OCR test failed.")
