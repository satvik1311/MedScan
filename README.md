🩺 MedScan
MedScan is an AI-powered prescription analysis platform that enables users to upload prescription images and receive smart, automated insights. Using OCR and AI, MedScan extracts medical information, identifies medications, detects possible interactions, and provides safety recommendations — all through a seamless and secure interface.

🚀 Features
📸 Upload and analyze handwritten prescription images

🧠 Azure AI-powered summarization and classification

🔍 OCR using Azure Computer Vision / Form Recognizer

⚕️ Medicine extraction and interaction analysis

📝 Auto-generated health recommendations

☁️ Azure Blob Storage for secure file management

🛢️ Cosmos DB for storing analysis history

⚡ FastAPI backend + React.js frontend

📄 Downloadable reports

🧠 Technologies Used
Layer	Tech
Frontend	React.js + Tailwind CSS
Backend	FastAPI (Python)
Storage	Azure Blob Storage
OCR	Azure Computer Vision / Form Recognizer
AI Analysis	Azure OpenAI (gpt-35-turbo)
Database	Azure Cosmos DB
Auth	(optional) Azure AD / JWT (future roadmap)

📂 Project Structure
bash
Copy
Edit
medscan/
├── backend/
│   ├── main.py                 # FastAPI server entry
│   ├── ocr.py                  # OCR logic using Azure Form Recognizer
│   ├── ai_analysis.py          # AI summarization + classification
│   ├── blob_utils.py           # Uploads to Azure Blob Storage
│   ├── cosmos.py               # Cosmos DB interaction
│   └── .env                    # Azure credentials
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PrescriptionUpload.jsx
│   │   │   ├── AnalysisResults.jsx
│   │   │   └── LoadingState.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   └── public/
│       └── index.html
│
└── README.md
⚙️ Setup Instructions
🔐 Prerequisites
Azure Subscription

React + Node.js installed

Python 3.10+

Azure Services:

Blob Storage

Computer Vision or Form Recognizer

Azure OpenAI (gpt-35-turbo)

Cosmos DB

🧪 Backend Setup
Install dependencies

bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
Configure .env

Create a .env file in the backend/ directory:

env
Copy
Edit
AZURE_BLOB_CONNECTION_STRING=...
AZURE_FORM_RECOGNIZER_ENDPOINT=...
AZURE_FORM_RECOGNIZER_KEY=...
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_KEY=...
AZURE_COSMOS_ENDPOINT=...
AZURE_COSMOS_KEY=...
AZURE_COSMOS_DB_NAME=medscan
Run FastAPI server

bash
Copy
Edit
uvicorn main:app --reload
💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
Make sure the backend is running on http://127.0.0.1:8000. The frontend will send image files and receive analysis data from the backend.

📷 How It Works
Upload a photo of your prescription.

The backend uses OCR to extract text.

The extracted text is sent to Azure OpenAI for classification and analysis.

Medicine names, usage, warnings, and possible interactions are detected.

Results are stored in Cosmos DB and displayed in a beautiful UI.

📥 Example Output
txt
Copy
Edit
Overall Risk Assessment: MODERATE
Medicines: Augmentin 625mg, Enzoflam
Analysis: Prescription includes antibiotics and painkillers. Risk of stomach upset. Avoid alcohol.
Recommendations: Take after food. Follow dosage strictly.
📌 Future Improvements
User authentication (JWT or Azure AD)

History dashboard with filters

Auto-email reports

Multilingual prescription support

Integration with pharmacy APIs


👨‍💻 Contributors
Satvik Gaur — Developer, Designer, and Architect

Special thanks to Azure AI Services for providing infrastructure

🧠 Icon & Branding
You can use this free MedScan icon suggestion:







