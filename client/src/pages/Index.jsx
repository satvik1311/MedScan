import React, { useState } from 'react';
import PrescriptionUpload from '@/components/PrescriptionUpload';
import AnalysisResults from '@/components/AnalysisResults';
import LoadingState from '@/components/LoadingState';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const handleAnalyze = async ({ blobName }) => {
    setIsAnalyzing(true);
    setAnalysisResults(null);
    setCurrentStep(1);

    try {
      setCurrentStep(2);

      // Step 2: Analyze the uploaded image
      const analyzeResponse = await axios.post('http://localhost:8000/analyze', {
        blob_name: blobName,
      });

      setCurrentStep(3);

      setAnalysisResults(analyzeResponse.data);
      setCurrentStep(4);

      toast({
        title: 'Analysis Complete',
        description: 'Your prescription has been successfully analyzed.',
      });
    } catch (error) {
      console.error('Analysis error:', error.response?.data || error.message);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing your prescription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisResults(null);
    setIsAnalyzing(false);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto">
        {isAnalyzing ? (
          <LoadingState currentStep={currentStep} />
        ) : analysisResults ? (
          <AnalysisResults
            results={analysisResults}
            onNewAnalysis={handleNewAnalysis}
          />
        ) : (
          <PrescriptionUpload
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        )}
      </div>
    </div>
  );
};

export default Index;