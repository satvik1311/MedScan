import React, { useState } from 'react';
import PrescriptionUpload from '@/components/PrescriptionUpload';
import AnalysisResults from '@/components/AnalysisResults';
import LoadingState from '@/components/LoadingState';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  // Mock API call for demonstration
  const mockAnalyzeImage = async (file) => {
    const steps = [
      { delay: 1500, step: 1 },
      { delay: 2000, step: 2 },
      { delay: 2500, step: 3 },
      { delay: 1500, step: 4 }
    ];

    for (const { delay, step } of steps) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setCurrentStep(step);
    }

    // Mock results
    return {
      extractedText: `Dr. John Smith, MD
Date: ${new Date().toLocaleDateString()}

Patient: Jane Doe
DOB: 01/15/1980

Rx:
1. Amoxicillin 500mg - Take 1 capsule every 8 hours for 7 days
2. Ibuprofen 400mg - Take 1 tablet every 6 hours as needed for pain
3. Omeprazole 20mg - Take 1 capsule daily before breakfast

Instructions: Complete full course of antibiotics. Take with food to reduce stomach upset.

Dr. John Smith, MD
License #: MD123456`,
      
      medicines: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Every 8 hours',
          duration: '7 days',
          type: 'Antibiotic',
          instructions: 'Take with food to reduce stomach upset. Complete full course.'
        },
        {
          name: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Every 6 hours',
          duration: 'As needed',
          type: 'Pain Relief',
          instructions: 'Take with food. Do not exceed 6 tablets in 24 hours.'
        },
        {
          name: 'Omeprazole',
          dosage: '20mg',
          frequency: 'Once daily',
          duration: 'Ongoing',
          type: 'Acid Reducer',
          instructions: 'Take before breakfast on empty stomach.'
        }
      ],
      
      interactions: [
        {
          drugs: ['Ibuprofen', 'Omeprazole'],
          severity: 'low',
          description: 'Minor interaction: Omeprazole may slightly reduce the effectiveness of Ibuprofen.',
          recommendation: 'Monitor for reduced pain relief. Consider alternative pain management if needed.'
        }
      ],
      
      recommendations: [
        'Complete the full course of Amoxicillin even if symptoms improve',
        'Take Ibuprofen with food to prevent stomach irritation',
        'Omeprazole should be taken 30-60 minutes before breakfast',
        'Contact your doctor if you experience severe side effects',
        'Stay hydrated and get adequate rest during antibiotic treatment'
      ],
      
      overallRisk: 'low',
      summary: 'This prescription appears to be a standard treatment combination with minimal risks. The detected interaction is minor and manageable with proper monitoring.'
    };
  };

  const handleAnalyze = async (file) => {
    setIsAnalyzing(true);
    setAnalysisResults(null);
    setCurrentStep(1);

    try {
      // In a real app, this would call your Azure Functions API
      const results = await mockAnalyzeImage(file);
      setAnalysisResults(results);
      
      toast({
        title: "Analysis Complete",
        description: "Your prescription has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed", 
        description: "There was an error analyzing your prescription. Please try again.",
        variant: "destructive",
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
