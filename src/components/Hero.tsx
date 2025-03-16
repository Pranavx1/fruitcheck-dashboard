
import { Button } from "@/components/ui/button";
import { ArrowDownCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Fruit & Vegetable
            <span className="text-spectra-primary block">Quality Detection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            SpectraVision uses advanced computer vision technology to instantly assess the 
            quality of fruits and vegetables. Simply upload an image and get immediate results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              className="text-white bg-spectra-primary hover:bg-spectra-dark text-lg px-8 py-6 h-auto" 
              size="lg"
              onClick={() => {
                document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Try It Now
            </Button>
            <Button 
              variant="outline"
              className="border-spectra-primary text-spectra-primary hover:bg-spectra-light text-lg px-8 py-6 h-auto" 
              size="lg"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
          </div>
          <div className="animate-bounce mt-16">
            <ArrowDownCircle 
              className="mx-auto h-10 w-10 text-spectra-secondary cursor-pointer"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
