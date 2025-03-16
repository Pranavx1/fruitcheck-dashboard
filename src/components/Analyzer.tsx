
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ResultCard from "./ResultCard";
import { useToast } from "@/components/ui/use-toast";

// Simulated backend response
const simulateBackendAnalysis = (file: File): Promise<{ result: 'good' | 'bad', confidence: number }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // This is where you would normally send the file to your Python backend
      // We're simulating the response here
      
      // Generate a random result for demonstration
      const result = Math.random() > 0.5 ? 'good' : 'bad';
      const confidence = 70 + Math.random() * 25; // Random confidence between 70-95%
      
      resolve({ result, confidence });
    }, 2000); // 2 second delay to simulate processing
  });
};

const Analyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<'good' | 'bad' | null>(null);
  const [confidence, setConfidence] = useState(0);
  const { toast } = useToast();

  const handleImageUploaded = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      // This is where you would send the image to your backend
      // For now, we'll use our simulation function
      console.log("Analyzing image:", file.name);
      
      const response = await simulateBackendAnalysis(file);
      setResult(response.result);
      setConfidence(response.confidence);
      
      toast({
        title: "Analysis complete",
        description: `The image has been classified as ${response.result}.`,
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error analyzing your image. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setConfidence(0);
  };

  return (
    <section id="analyze" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Try <span className="text-spectra-primary">It Now</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a JPG image of a fruit or vegetable and our AI will analyze its quality.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ImageUploader 
            onImageUploaded={handleImageUploaded} 
            isAnalyzing={isAnalyzing} 
          />
          
          <ResultCard 
            result={result}
            confidence={confidence}
            resetAnalysis={resetAnalysis}
          />
        </div>
      </div>
    </section>
  );
};

export default Analyzer;
