
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface ResultProps {
  result: 'good' | 'bad' | null;
  confidence: number;
  resetAnalysis: () => void;
}

const ResultCard: React.FC<ResultProps> = ({ result, confidence, resetAnalysis }) => {
  if (!result) return null;

  return (
    <Card className={`result-card ${result} mt-6 p-6 shadow-md overflow-hidden`}>
      <div className="flex flex-col items-center">
        <div 
          className={`p-4 rounded-full mb-4 ${
            result === 'good' 
              ? 'bg-green-100 text-spectra-good' 
              : 'bg-red-100 text-spectra-bad'
          }`}
        >
          {result === 'good' ? (
            <Check className="h-8 w-8" />
          ) : (
            <X className="h-8 w-8" />
          )}
        </div>
        
        <h3 className="text-2xl font-bold mb-2">
          {result === 'good' ? 'Good Quality' : 'Poor Quality'}
        </h3>
        
        <p className="text-gray-600 mb-4 text-center">
          Our AI detected this as {result === 'good' ? 'good' : 'bad'} quality with {Math.round(confidence)}% confidence.
        </p>
        
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div 
            className={`h-2 rounded-full ${result === 'good' ? 'bg-spectra-good' : 'bg-spectra-bad'}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
        
        <button 
          onClick={resetAnalysis}
          className="text-spectra-primary hover:underline"
        >
          Analyze another image
        </button>
      </div>
    </Card>
  );
};

export default ResultCard;
