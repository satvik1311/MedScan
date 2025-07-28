Absolutely! Here's a professional and comprehensive **`README.md`** file for your MedScan project:

---

# 🩺 MedScan – AI-Powered Prescription Analyzer

MedScan is an AI-driven web application that empowers users to understand handwritten or printed medical prescriptions with ease. By combining Optical Character Recognition (OCR) and Natural Language Processing (NLP), MedScan extracts, interprets, and displays detailed insights from prescription images—right in your browser.

## 🚀 Features

* 📸 Upload handwritten or printed prescriptions
* 🧠 AI-generated summary using Azure OpenAI (GPT-3.5)
* 💊 Extracted medicines with:

  * Dosage
  * Frequency & Duration
  * Usage instructions
* ⚠️ Risk assessment (e.g., Low, Moderate)
* ✅ Recommendations for safe medication use
* 📂 Downloadable prescription report
* 🧾 Analysis stored in **Azure Cosmos DB** for future reference

---

## 🧪 Tech Stack

### 👨‍⚕️ Frontend

* **React.js** with Tailwind CSS
* **React Router** for routing
* **Axios** & **TanStack React Query** for API requests
* **UI Components**: Sonner, Tooltip, Dropzone

### 🔧 Backend (FastAPI)

* **FastAPI** – Python backend API
* **Azure Form Recognizer** – OCR for text extraction
* **Azure OpenAI** – Natural Language Summarization
* **Azure Blob Storage** – Image uploads
* **Azure Cosmos DB** – Persistent storage of results

---

## 📷 Sample Prescription

![Sample](https://example.com/sample-prescription.jpg)

📝 Output Example:

```
Medication: Tab. Augmentin 625mg  
Dosage: 1 tablet  
Frequency: 1-0-1  
Duration: 5 days  
Instructions: Take after meals  
...
Risk Assessment: MODERATE  
Recommendations: Take full course, maintain hygiene, consult dentist if any side effects occur.
```

---

## 📁 Project Structure

```
medscan/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── backend/
│   ├── main.py
│   ├── ocr.py
│   ├── ai_analysis.py
│   └── cosmos.py
```

---

## 🛠️ Setup Instructions

### ✅ Prerequisites

* Node.js & npm
* Python 3.10+
* Azure accounts for OpenAI, Blob Storage, Form Recognizer, Cosmos DB

### 🔧 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

📝 Add your Azure credentials in `.env`:

```env
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_KEY=...
FORM_RECOGNIZER_ENDPOINT=...
FORM_RECOGNIZER_KEY=...
AZURE_BLOB_CONNECTION_STRING=...
COSMOS_DB_ENDPOINT=...
COSMOS_DB_KEY=...
```

---

## 📦 API Endpoints

| Endpoint    | Method | Description                        |
| ----------- | ------ | ---------------------------------- |
| `/upload`   | POST   | Uploads and analyzes prescription  |
| `/analyze`  | POST   | Summarizes OCR output using OpenAI |
| `/test-ocr` | POST   | OCR only, for testing purposes     |

---

## 🧠 AI Disclaimer

This application uses AI to **assist** with medical document understanding. It **does not** replace medical professionals. Always consult a qualified healthcare provider before taking medications.

---

## 📬 Contact

Built by Satvik
📧 Email: [satvik.gaur12@gmail.com](mailto:satvik.gaur12@gmail.com)

---

