# 🩺 MedScan

**MedScan** is an AI-powered prescription analysis platform that lets users upload images of medical prescriptions and receive automatic insights. It uses OCR to extract text and Azure AI to summarize, analyze, and detect drug interactions. All data is securely stored and presented in an easy-to-understand interface.

---

## 🚀 Features

- 📸 Upload and analyze handwritten prescription images
- 🧠 Azure OpenAI-powered summarization and classification
- 🔍 OCR using Azure Computer Vision or Form Recognizer
- ⚕️ Medicine extraction and interaction detection
- 📝 AI-generated health recommendations
- ☁️ Secure storage via Azure Blob Storage
- 🛢️ Cosmos DB for analysis history
- ⚡ FastAPI backend + React frontend
- 📄 Downloadable reports

---

## 🧠 Technologies Used

| Layer | Tech Stack |
|-------|------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | FastAPI (Python) |
| **Storage** | Azure Blob Storage |
| **OCR** | Azure Form Recognizer / Computer Vision |
| **AI Analysis** | Azure OpenAI (`gpt-35-turbo`) |
| **Database** | Azure Cosmos DB |

---

# 📂 Project Structure
```
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

```
---

## ⚙️ Setup Instructions

### 🔐 Prerequisites

- Node.js and npm
- Python 3.10+
- Azure Subscription with:
  - Blob Storage
  - Form Recognizer / Computer Vision
  - OpenAI resource
  - Cosmos DB

---

### 🧪 Backend Setup

```
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
# Create a .env file:
```
AZURE_BLOB_CONNECTION_STRING=your_blob_connection
AZURE_FORM_RECOGNIZER_ENDPOINT=...
AZURE_FORM_RECOGNIZER_KEY=...
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_KEY=...
AZURE_COSMOS_ENDPOINT=...
AZURE_COSMOS_KEY=...
AZURE_COSMOS_DB_NAME=medscan 
```
# Start the backend:
```
Copy
Edit
uvicorn main:app --reload
```
# 💻 Frontend Setup
```
cd frontend
npm install
npm start
```
# 📷 How It Works
Upload a prescription image.

OCR extracts medical text.

Azure OpenAI analyzes it for context and safety.

Output includes medicines, risks, and recommendations.

Results are saved to Cosmos DB.

# 📌 Future Improvements
Authentication (JWT or Azure AD)

History and dashboard view

Email report delivery

Support for regional languages

Pharmacy integration


