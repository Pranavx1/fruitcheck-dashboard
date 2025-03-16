
import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  RotateCw 
} from "lucide-react";

interface ImageUploaderProps {
  onImageUploaded: (file: File) => void;
  isAnalyzing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process the file
  const handleFile = (file: File) => {
    // Check if the file is a jpg image
    if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a JPG image only."
      });
      return;
    }

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    setSelectedFile(file);
    toast({
      title: "Image uploaded",
      description: "Your image has been uploaded successfully."
    });
  };

  // Handle button click
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  // Handle removing the image
  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Handle analyze click
  const handleAnalyze = () => {
    if (selectedFile) {
      onImageUploaded(selectedFile);
    } else {
      toast({
        variant: "destructive",
        title: "No image selected",
        description: "Please upload an image first."
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-6 shadow-md">
        {!previewImage ? (
          <div 
            className={`dropzone ${dragActive ? "active" : ""} p-8 flex flex-col items-center justify-center min-h-[250px]`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Drag & Drop your image here</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Upload a JPG image of fruits or vegetables for quality analysis
            </p>
            <Button 
              variant="outline"
              onClick={onButtonClick}
              className="border-spectra-primary text-spectra-primary hover:bg-spectra-light"
            >
              Browse Files
            </Button>
            <input
              ref={inputRef}
              type="file"
              onChange={handleChange}
              accept=".jpg,.jpeg"
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="relative">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-auto max-h-[350px] object-contain rounded-md border border-gray-200" 
              />
              <button 
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                disabled={isAnalyzing}
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="mt-4 flex justify-center">
              <Button 
                className="bg-spectra-primary hover:bg-spectra-dark text-white w-full"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Analyze Image
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImageUploader;
