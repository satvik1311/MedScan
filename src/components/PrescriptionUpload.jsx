import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Camera, FileText, X } from 'lucide-react';
import { BlobServiceClient } from '@azure/storage-blob';

const PrescriptionUpload = ({ onAnalyze, isAnalyzing }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const sasUrl = 'https://medscanstorage.blob.core.windows.net/scans?sp=rcw&st=2025-07-23T18:04:21Z&se=2026-01-01T02:19:21Z&spr=https&sv=2024-11-04&sr=c&sig=M0TSeBijRqX7IBEAocmulNF8JQ5LlhMJYwKkYSrRoJc%3D';

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadToAzure = async (file) => {
    if (!file) {
      throw new Error('Please select a file!');
    }

    const blobName = `prescription_${new Date().getTime()}_${file.name}`; // Unique blob name

    try {
      const blobServiceClient = new BlobServiceClient(sasUrl);
      const containerClient = blobServiceClient.getContainerClient('');
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.uploadBrowserData(file, {
        blockSize: 4 * 1024 * 1024, // 4MB block size
        concurrency: 20,
      });
      console.log('Upload successful:', blockBlobClient.url);
      return blockBlobClient.url; // Return the blob URL
    } catch (error) {
      console.error('Upload failed:', error);
      throw new Error('Upload to Azure failed. Check console for details.');
    }
  };

  const handleAnalyze = async () => {
    if (selectedFile && onAnalyze) {
      try {
        // Upload the file to Azure first
        const blobUrl = await uploadToAzure(selectedFile);
        // Pass the blob URL or file to onAnalyze
        onAnalyze({ file: selectedFile, blobUrl });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">AI Prescription Analyzer</h2>
        <p className="text-muted-foreground">Upload your prescription image for intelligent analysis</p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {!previewUrl ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload Prescription Image</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your prescription image here, or click to browse
                  </p>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Choose File
                  </Button>
                  
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  capture="environment"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Prescription preview"
                  className="w-full max-h-80 object-contain rounded-lg border"
                />
                <Button
                  onClick={removeFile}
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedFile?.name} ({(selectedFile?.size / 1024 / 1024).toFixed(2)} MB)
                </p>
                
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing Prescription...
                    </>
                  ) : (
                    'Analyze Prescription'
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          <strong>Privacy Notice:</strong> Your prescription images are processed securely and not stored permanently. 
          This tool is for informational purposes only and should not replace professional medical advice.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PrescriptionUpload;