
import { LeafyGreen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <LeafyGreen className="h-8 w-8 text-spectra-secondary" />
            <span className="font-semibold text-xl">SpectraVision</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#features" className="hover:text-spectra-secondary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-spectra-secondary transition-colors">
              How It Works
            </a>
            <a href="#analyze" className="hover:text-spectra-secondary transition-colors">
              Try It
            </a>
            <a href="#" className="hover:text-spectra-secondary transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-spectra-secondary transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SpectraVision. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
