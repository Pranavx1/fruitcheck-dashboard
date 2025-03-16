
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ResultCard from "./ResultCard";
import { useToast } from "@/components/ui/use-toast";

// Backend API URL (change this to your actual backend URL)
const BACKEND_URL = "http://localhost:5000";

const Analyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<'good' | 'bad' | null>(null);
  const [confidence, setConfidence] = useState(0);
  const { toast } = useToast();

  const handleImageUploaded = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      // Convert file to base64
      const base64Image = await fileToBase64(file);
      console.log("Converting image to base64");
      
      // Send to backend
      console.log("Sending image to backend for analysis");
      const response = await fetch(`${BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received analysis result:", data);
      
      if (data.success) {
        setResult(data.result);
        setConfidence(data.confidence);
        
        toast({
          title: "Analysis complete",
          description: `The image has been classified as ${data.result}.`,
        });
      } else {
        throw new Error(data.error || "Analysis failed");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error analyzing your image. Please try again."
      });
      
      // Fallback to simulation if the backend is not available
      fallbackToSimulation(file);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Fallback to client-side simulation if the backend is not available
  const fallbackToSimulation = (file: File) => {
    console.log("Falling back to client-side simulation");
    // Simulate network delay
    setTimeout(() => {
      // Generate a random result for demonstration
      const result = Math.random() > 0.5 ? 'good' : 'bad' as 'good' | 'bad';
      const confidence = 70 + Math.random() * 25; // Random confidence between 70-95%
      
      setResult(result);
      setConfidence(confidence);
      
      toast({
        title: "Analysis complete (simulated)",
        description: `The image has been classified as ${result}.`,
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  // Convert File to base64 string
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
