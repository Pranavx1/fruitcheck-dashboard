
import { 
  Image, 
  Upload, 
  Cpu, 
  CheckCircle 
} from "lucide-react";

const steps = [
  {
    icon: <Image className="h-12 w-12 text-white" />,
    title: "Take a Photo",
    description: "Take a clear photo of the fruit or vegetable you want to assess."
  },
  {
    icon: <Upload className="h-12 w-12 text-white" />,
    title: "Upload Image",
    description: "Drag and drop your image into our secure uploader."
  },
  {
    icon: <Cpu className="h-12 w-12 text-white" />,
    title: "AI Analysis",
    description: "Our CNN model analyzes visual features to determine quality."
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-white" />,
    title: "Get Results",
    description: "Receive instant feedback on whether the item is good or bad."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-spectra-primary">It Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SpectraVision makes quality assessment simple with just a few steps.
            Here's how our technology works for you.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start justify-between relative">
          {/* Line connector */}
          <div className="hidden md:block absolute left-0 right-0 top-24 h-0.5 bg-spectra-secondary z-0"></div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative z-10">
                <div className="mb-6 bg-spectra-primary p-5 rounded-full shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
