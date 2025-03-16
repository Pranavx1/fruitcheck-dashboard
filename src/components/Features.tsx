
import { 
  Clock, 
  Check, 
  Zap, 
  Shield, 
  Microscope, 
  Award 
} from "lucide-react";

const features = [
  {
    icon: <Clock className="h-8 w-8 text-spectra-primary" />,
    title: "Instant Results",
    description: "Get quality assessment feedback within seconds of uploading your image."
  },
  {
    icon: <Check className="h-8 w-8 text-spectra-primary" />,
    title: "High Accuracy",
    description: "Our AI model has been trained on thousands of images for reliable results."
  },
  {
    icon: <Zap className="h-8 w-8 text-spectra-primary" />,
    title: "Easy to Use",
    description: "Simple drag and drop interface makes quality checking accessible to everyone."
  },
  {
    icon: <Shield className="h-8 w-8 text-spectra-primary" />,
    title: "Secure Processing",
    description: "All uploaded images are processed securely and not stored permanently."
  },
  {
    icon: <Microscope className="h-8 w-8 text-spectra-primary" />,
    title: "Detailed Analysis",
    description: "Receive clear 'good' or 'bad' classification based on visual quality indicators."
  },
  {
    icon: <Award className="h-8 w-8 text-spectra-primary" />,
    title: "Quality Assurance",
    description: "Perfect for businesses, markets, and consumers who prioritize quality."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful <span className="text-spectra-primary">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SpectraVision offers cutting-edge technology that makes quality assessment 
            of fruits and vegetables simple, fast, and reliable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="mb-4 p-3 inline-block bg-spectra-light rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
