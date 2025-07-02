
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const handlePurchase = () => {
    window.open('https://pay.hotmart.com/B100450509A', '_blank');
  };

  return (
    <div className="bg-math-gradient py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Ready to Master Mathematics?
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Join over 2,500 students who have already transformed their relationship with mathematics
        </p>
        <Button 
          size="lg" 
          onClick={handlePurchase}
          className="bg-white text-math-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          🚀 Start Now - Special Offer
        </Button>
        <p className="text-sm mt-4 text-blue-200">
          ✅ Lifetime access • ✅ Certificate included • ✅ 24/7 support
        </p>
      </div>
    </div>
  );
};

export default CTASection;
