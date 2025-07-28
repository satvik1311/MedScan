# 🏥 AI Prescription Analyzer

An intelligent web application that analyzes medical prescriptions using Azure AI services. Upload prescription images to extract medicine information, detect drug interactions, and receive AI-powered insights.

## ✨ Features

- **📸 Smart Image Upload** - Drag & drop or camera capture for prescription images
- **🔍 OCR Extraction** - Extract medicine names, dosages, and instructions using Azure Computer Vision
- **🧠 AI Analysis** - Analyze drug interactions and provide recommendations using Azure OpenAI
- **📊 Professional Results** - Beautiful, medical-grade interface with risk assessments
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🔒 Privacy-Focused** - Secure processing with no permanent storage of images

## 🏗️ Architecture

### Frontend (React JSX)
- **React 18** with JavaScript (JSX)
- **Tailwind CSS** with medical-themed design system
- **shadcn/ui** components for professional UI
- **Drag & Drop Upload** with image preview
- **Responsive Design** for all devices

### Backend (Azure Services)
- **Azure Static Web Apps** - Frontend hosting with CI/CD
- **Azure Functions** - Serverless API endpoints (Node.js)
- **Azure Computer Vision** - OCR text extraction
- **Azure OpenAI** - GPT-4 for drug interaction analysis
- **Azure Blob Storage** - Temporary image storage
- **Azure Cosmos DB** - Analysis results storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Azure account with the following services:
  - Azure Static Web Apps
  - Azure Functions
  - Azure Computer Vision
  - Azure OpenAI Service
  - Azure Storage Account
  - Azure Cosmos DB

### Local Development

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd ai-prescription-analyzer
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:8080`

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔧 Azure Setup (Backend)

### 1. Create Azure Resources

```bash
# Create Resource Group
az group create --name prescription-analyzer-rg --location eastus

# Create Storage Account
az storage account create --name prescriptionstorage --resource-group prescription-analyzer-rg --location eastus --sku Standard_LRS

# Create Computer Vision
az cognitiveservices account create --name prescription-vision --resource-group prescription-analyzer-rg --kind ComputerVision --sku F0 --location eastus

# Create OpenAI Service
az cognitiveservices account create --name prescription-openai --resource-group prescription-analyzer-rg --kind OpenAI --sku S0 --location eastus

# Create Cosmos DB
az cosmosdb create --name prescription-cosmos --resource-group prescription-analyzer-rg --kind GlobalDocumentDB
```

### 2. Azure Functions Setup

```javascript
// Example Azure Function for prescription analysis
module.exports = async function (context, req) {
    const { imageUrl } = req.body;
    
    // 1. OCR with Computer Vision
    const ocrResult = await analyzeImageWithOCR(imageUrl);
    
    // 2. AI Analysis with OpenAI
    const aiAnalysis = await analyzeWithOpenAI(ocrResult.text);
    
    // 3. Store results in Cosmos DB
    await storeResults(context, aiAnalysis);
    
    context.res = {
        status: 200,
        body: aiAnalysis
    };
};
```

### 3. Required Environment Variables

```bash
# Azure Function App Settings
COMPUTER_VISION_ENDPOINT=https://your-vision.cognitiveservices.azure.com/
COMPUTER_VISION_KEY=your-computer-vision-key
OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
OPENAI_KEY=your-openai-key
COSMOS_DB_ENDPOINT=https://your-cosmos.documents.azure.com:443/
COSMOS_DB_KEY=your-cosmos-key
STORAGE_CONNECTION_STRING=your-storage-connection-string
```

## 📝 API Endpoints

### POST `/api/analyze-prescription`
Analyzes a prescription image and returns extracted information and AI insights.

**Request:**
```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "fileName": "prescription.jpg"
}
```

**Response:**
```json
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
```

## 🎨 Design System

The application uses a medical-grade design system with:

- **Professional Blue** (`hsl(217 91% 60%)`) - Primary medical brand color
- **Success Green** (`hsl(160 60% 45%)`) - Low risk indicators
- **Warning Amber** (`hsl(30 80% 55%)`) - Medium risk alerts
- **Danger Red** (`hsl(0 84% 60%)`) - High risk warnings
- **Inter Font Family** - Clean, professional typography
- **Medical Gradients** - Subtle gradients for visual hierarchy
- **Professional Shadows** - Elevated card designs

## 🔒 Security & Privacy

- **No Permanent Storage** - Images processed and deleted immediately
- **HTTPS Only** - All communications encrypted
- **Azure Key Vault** - Secure API key management
- **RBAC** - Role-based access control
- **Audit Logging** - Complete audit trail in Application Insights

## 📊 Monitoring

- **Azure Application Insights** - Performance monitoring
- **Custom Dashboards** - Usage analytics and error tracking
- **Health Checks** - Automated service monitoring
- **Cost Optimization** - Usage-based scaling

## 💰 Cost Estimation

**Development/Testing (Monthly):**
- Computer Vision: ~$10 (1,000 calls)
- OpenAI GPT-4: ~$30 (moderate usage)
- Storage: ~$1 (minimal storage)
- Functions: ~$0 (consumption plan)
- **Total: ~$41/month**

**Production (Monthly):**
- Scales based on usage
- Consider Azure Reserved Instances for cost optimization

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Test Azure Functions locally
func start
```

## 📈 Deployment

### Automatic Deployment with Azure Static Web Apps

1. **Connect GitHub Repository**
2. **Configure Build Settings:**
   ```yaml
   app_location: "/"
   api_location: "api"
   output_location: "dist"
   ```
3. **Push to Main Branch** - Auto-deploys to Azure

### Manual Deployment

```bash
# Build and deploy static app
npm run build
az staticwebapp deploy --name prescription-analyzer --resource-group prescription-analyzer-rg --source ./dist

# Deploy Azure Functions
func azure functionapp publish prescription-analyzer-functions
```

## 🛠️ Development Roadmap

- [ ] **Multi-language OCR** - Support for multiple languages
- [ ] **Drug Database Integration** - Real-time drug information
- [ ] **Patient History** - Track prescription history
- [ ] **Doctor Portal** - Healthcare provider dashboard
- [ ] **Mobile App** - React Native mobile application
- [ ] **API Rate Limiting** - Advanced throttling and quotas

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## ⚠️ Medical Disclaimer

This application is for **informational purposes only** and should not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical decisions.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, Azure AI, and modern web technologies**
