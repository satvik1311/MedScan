# 🏥 MedScan – AI Prescription Analyzer  

MedScan is an intelligent web application that analyzes medical prescriptions using **Azure AI services**.  
Upload prescription images to extract medicine details, detect possible drug interactions, and receive **AI-powered insights**.  

---

## ✨ Features  
- 📸 **Smart Image Upload** – Drag & drop or camera capture for prescription images  
- 🔍 **OCR Extraction** – Extract medicine names, dosages, and instructions using **Azure Computer Vision**  
- 🧠 **AI Analysis** – Detect drug interactions & provide recommendations using **Azure OpenAI**  
- 📊 **Professional Results** – Clean, medical-grade UI with risk assessments  
- 📱 **Responsive Design** – Works seamlessly across devices  
- 🔒 **Privacy-Focused** – Images stored temporarily with **Azure Blob Storage**  

---

## 🏗️ Tech Stack  
**Frontend:**  
- React 18 (JSX)  
- Tailwind CSS  
- shadcn/ui Components  

**Backend:**  
- Node.js + Express.js  
- REST API for prescription analysis  
- **Azure Blob Storage** for secure uploads  
- **Azure Computer Vision** for OCR  
- **Azure OpenAI** for drug interaction insights  
- **Azure Cosmos DB** for result storage  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js 18+  
- Azure Account with the following services:  
  - Azure Blob Storage  
  - Azure Computer Vision  
  - Azure OpenAI  
  - Azure Cosmos DB  

---

### 1️⃣ Clone & Install  
```bash
git clone https://github.com/satvik1311/MedScan.git
cd MedScan
npm install


2️⃣ Configure Environment
Create a .env file in the backend folder:

env
Copy
Edit
PORT=5000
AZURE_BLOB_SAS_URL=your-sas-url
COMPUTER_VISION_ENDPOINT=https://your-computer-vision.cognitiveservices.azure.com/
COMPUTER_VISION_KEY=your-computer-vision-key
OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
OPENAI_KEY=your-openai-key
COSMOS_DB_ENDPOINT=https://your-cosmos.documents.azure.com:443/
COSMOS_DB_KEY=your-cosmos-key
3️⃣ Run the App
Backend:

bash
Copy
Edit
cd backend
node index.js
Frontend:

bash
Copy
Edit
npm run dev
Visit 👉 http://localhost:5173

📝 API Endpoint
POST /api/upload
Analyzes a prescription image and returns AI-powered insights.

Request (Form-Data):

json
Copy
Edit
{
  "file": "prescription.jpg"
}
Response:

json
Copy
Edit
{
  "extractedText": "Dr. John Smith...",
  "medicines": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Every 8 hours",
      "duration": "7 days"
    }
  ],
  "interactions": [
    {
      "drugs": ["Drug A", "Drug B"],
      "severity": "medium",
      "description": "May cause interaction..."
    }
  ],
  "recommendations": ["Complete full course..."],
  "overallRisk": "low"
}
📊 Architecture
React Frontend

Node.js/Express Backend

Azure Blob Storage → Stores prescription images

Azure Computer Vision → OCR for text extraction

Azure OpenAI → Prescription analysis & interactions

Azure Cosmos DB → Stores analysis results

📌 Roadmap
 Multi-language OCR

 Doctor Dashboard

 Mobile App (React Native)

 Patient Prescription History

🤝 Contributing
Fork this repo

Create a branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push (git push origin feature/amazing-feature)

Open a Pull Request

⚠️ Disclaimer
MedScan is for educational purposes only.
It should not replace professional medical advice. Always consult a healthcare provider.
