
import { Button } from "@/components/ui/button";

const Header = () => {
  const handlePurchase = () => {
    window.open('https://pay.hotmart.com/B100450509A', '_blank');
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-math-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-800">MathFácil</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#curso" className="text-gray-600 hover:text-math-blue-600 transition-colors">
              The Course
            </a>
            <a href="#beneficios" className="text-gray-600 hover:text-math-blue-600 transition-colors">
              Benefits
            </a>
            <a href="#topicos" className="text-gray-600 hover:text-math-blue-600 transition-colors">
              Content
            </a>
            <a href="#depoimento" className="text-gray-600 hover:text-math-blue-600 transition-colors">
              Testimonials
            </a>
          </nav>
          
          <Button 
            onClick={handlePurchase}
            className="bg-math-gradient hover:opacity-90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
