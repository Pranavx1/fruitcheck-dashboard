
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ResultCard from "./ResultCard";
import { useToast } from "@/components/ui/use-toast";

const Analyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<'good' | 'bad' | null>(null);
  const [confidence, setConfidence] = useState(0);
  const { toast } = useToast();

  const handleImageUploaded = async (file: File) => {
    // Show analyzing state
    setIsAnalyzing(true);
    
    try {
      // Convert file to base64
      const base64Image = await fileToBase64(file);
      
      // Send to backend
      const response = await fetch("http://localhost:5000/analyze/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });
      
      if (!response.ok) {
        throw new Error("Server error");
      }
      
      const data = await response.json();
      
      // Update state with results
      setResult(data.result);
      setConfidence(data.confidence);
      
      toast({
        title: "Analysis complete",
        description: `The image is ${data.result}.`,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error. Please try again."
      });
      
      // Fallback to simulation if server is unavailable
      simulateAnalysis();
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Simple simulation if backend is not available
  const simulateAnalysis = () => {
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'good' : 'bad' as 'good' | 'bad';
      const confidence = 70 + Math.random() * 25;
      
      setResult(result);
      setConfidence(confidence);
      
      toast({
        title: "Analysis complete (simulated)",
        description: `The image is ${result}.`,
      });
    }, 2000);
  };

  // Helper function to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const resetAnalysis = () => {
    setResult(null);
    setConfidence(0);
  };

  return (
    <section id="analyze" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Try It Now
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
          
          {result && (
            <ResultCard 
              result={result}
              confidence={confidence}
              resetAnalysis={resetAnalysis}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Analyzer;
