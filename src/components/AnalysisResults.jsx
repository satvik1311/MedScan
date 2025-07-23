import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Download, 
  RefreshCw,
  Clock,
  Pill
} from 'lucide-react';

const AnalysisResults = ({ results, onNewAnalysis }) => {
  if (!results) return null;

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <XCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const downloadReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      extractedText: results.extractedText,
      medicines: results.medicines,
      interactions: results.interactions,
      recommendations: results.recommendations
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Analysis Results</h2>
        <div className="flex gap-2">
          <Button onClick={downloadReport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button onClick={onNewAnalysis} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Overall Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getRiskIcon(results.overallRisk)}
            Overall Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-3">
            <Badge className={getRiskColor(results.overallRisk)}>
              {results.overallRisk?.toUpperCase() || 'UNKNOWN'} RISK
            </Badge>
            <span className="text-sm text-muted-foreground">
              Analysis completed at {new Date().toLocaleString()}
            </span>
          </div>
          <p className="text-muted-foreground">
            {results.summary || 'Analysis completed successfully.'}
          </p>
        </CardContent>
      </Card>

      {/* Extracted Medicines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5" />
            Extracted Medicines ({results.medicines?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {results.medicines?.map((medicine, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-primary">{medicine.name}</h4>
                  <Badge variant="outline">{medicine.type || 'Medication'}</Badge>
                </div>
                
                <div className="space-y-1 text-sm">
                  {medicine.dosage && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dosage:</span>
                      <span className="font-medium">{medicine.dosage}</span>
                    </div>
                  )}
                  
                  {medicine.frequency && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="font-medium">{medicine.frequency}</span>
                    </div>
                  )}
                  
                  {medicine.duration && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{medicine.duration}</span>
                    </div>
                  )}
                  
                  {medicine.instructions && (
                    <div className="mt-2">
                      <span className="text-muted-foreground text-xs">Instructions:</span>
                      <p className="text-xs mt-1 p-2 bg-muted rounded">
                        {medicine.instructions}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drug Interactions */}
      {results.interactions && results.interactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Potential Drug Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.interactions.map((interaction, index) => (
                <Alert key={index}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <strong>{interaction.drugs?.join(' + ') || 'Drug Interaction'}</strong>
                        <Badge className={getRiskColor(interaction.severity)}>
                          {interaction.severity?.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm">{interaction.description}</p>
                      {interaction.recommendation && (
                        <p className="text-sm font-medium text-primary">
                          Recommendation: {interaction.recommendation}
                        </p>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {results.recommendations && results.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Extracted Text */}
      {results.extractedText && (
        <Card>
          <CardHeader>
            <CardTitle>Extracted Text (OCR)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {results.extractedText}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Medical Disclaimer:</strong> This analysis is for informational purposes only. 
          Always consult with healthcare professionals before making any medical decisions. 
          This tool should not replace professional medical advice, diagnosis, or treatment.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AnalysisResults;