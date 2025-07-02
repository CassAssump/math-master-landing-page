
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PricingSection = () => {
  const handlePurchase = () => {
    window.open('https://pay.hotmart.com/B100450509A', '_blank');
  };

  const handleProfessorPurchase = () => {
    window.open('https://pay.hotmart.com/B100450509A?off=nuf2bm6x', '_blank');
  };

  return (
    <div id="pricing-section" className="bg-math-gradient py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Ready to Master Mathematics?
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Choose the ideal plan for you and transform your relationship with mathematics
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Student Plan */}
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-yellow-300 hover:border-yellow-400 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-math-blue-700 mb-2">
                📚 Student Plan
              </CardTitle>
              <div className="text-4xl font-bold text-math-blue-700 mb-2">
                $9<span className="text-lg font-normal">/month</span>
              </div>
              <p className="text-gray-600">Perfect for students</p>
            </CardHeader>
            <CardContent className="text-left">
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Access to all video lessons
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Practical exercises
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Certificate of completion
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  24/7 support
                </li>
              </ul>
              <Button 
                onClick={handlePurchase}
                className="w-full bg-math-blue-700 hover:bg-math-blue-800 text-white font-bold py-3 rounded-full"
              >
                Choose Student Plan
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Plan */}
          <Card className="bg-gradient-to-br from-yellow-400 to-orange-400 border-2 border-yellow-300 hover:border-yellow-200 transition-all duration-300 hover:scale-105 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                🔥 MOST POPULAR
              </span>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-math-blue-900 mb-2">
                👨‍🏫 Teacher Plan
              </CardTitle>
              <div className="text-4xl font-bold text-math-blue-900 mb-2">
                $19<span className="text-lg font-normal">/month</span>
              </div>
              <p className="text-math-blue-800">For educators and professionals</p>
            </CardHeader>
            <CardContent className="text-left">
              <ul className="space-y-3 text-math-blue-900 mb-6">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  Everything from Student Plan
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  Teaching materials
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  Question bank
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  Priority support
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  Progress reports
                </li>
              </ul>
              <Button 
                onClick={handleProfessorPurchase}
                className="w-full bg-math-blue-900 hover:bg-math-blue-800 text-white font-bold py-3 rounded-full"
              >
                Choose Teacher Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm mt-6 text-blue-200">
          ✅ Lifetime access • ✅ 30-day guarantee • ✅ Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default PricingSection;
