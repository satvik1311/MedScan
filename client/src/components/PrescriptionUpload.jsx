import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Camera, FileText, X } from 'lucide-react';
import axios from 'axios';

const PrescriptionUpload = ({ onAnalyze, isAnalyzing }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragLeave = () => setDragActive(false);
  const handleFileInput = (e) => handleFileSelect(e.target.files[0]);

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return alert('Please select a file.');

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { blob_name } = response.data;
      console.log('Uploaded to:', blob_name);

      onAnalyze({ blobName: blob_name });
    } catch (err) {
      console.error('Upload failed:', err.response?.data || err.message);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
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

                <h3 className="text-lg font-semibold mb-2">Upload Prescription Image</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your prescription image here, or click to browse
                </p>

                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Choose File
                  </Button>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" /> Take Photo
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
                  disabled={uploading || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {(uploading || isAnalyzing) ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {uploading ? 'Uploading...' : 'Analyzing Prescription...'}
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