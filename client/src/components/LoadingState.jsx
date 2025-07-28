import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, FileText, Brain, CheckCircle } from 'lucide-react';

const LoadingState = ({ currentStep = 1 }) => {
  const steps = [
    {
      id: 1,
      name: 'Processing Image',
      icon: FileText,
      description: 'Analyzing uploaded prescription image'
    },
    {
      id: 2,
      name: 'Extracting Text',
      icon: FileText,
      description: 'Using OCR to extract text from image'
    },
    {
      id: 3,
      name: 'AI Analysis',
      icon: Brain,
      description: 'Analyzing medicines and interactions'
    },
    {
      id: 4,
      name: 'Generating Report',
      icon: CheckCircle,
      description: 'Preparing your analysis results'
    }
  ];

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Analyzing Your Prescription</h3>
              <p className="text-muted-foreground">
                Please wait while we process your prescription image...
              </p>
            </div>

            <div className="space-y-3">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</p>
            </div>

            <div className="space-y-3">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary/5 border border-primary/20'
                        : isCompleted
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-muted/50'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        isActive
                          ? 'bg-primary/10'
                          : isCompleted
                          ? 'bg-green-100'
                          : 'bg-muted'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <p
                        className={`font-medium text-sm ${
                          isActive
                            ? 'text-primary'
                            : isCompleted
                            ? 'text-green-700'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {step.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>

                    {isActive && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingState;
