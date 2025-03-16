
import { Button } from "@/components/ui/button";
import { LeafyGreen } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LeafyGreen className="h-8 w-8 text-spectra-primary" />
          <span className="font-semibold text-xl text-spectra-dark font-display">
            SpectraVision
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-spectra-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-spectra-primary transition-colors">
            How It Works
          </a>
          <a href="#analyze" className="text-gray-600 hover:text-spectra-primary transition-colors">
            Try It
          </a>
        </nav>
        <div>
          <Button className="bg-spectra-primary hover:bg-spectra-dark text-white">
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
