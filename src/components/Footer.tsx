
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Footer = () => {
  const handlePurchase = () => {
    window.open('https://pay.hotmart.com/B100450509A', '_blank');
  };

  const handleProfessorPurchase = () => {
    window.open('https://pay.hotmart.com/B100450509A?off=nuf2bm6x', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Pricing Section */}
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

      {/* CTA Section */}
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
      
      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-math-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold">MathFácil</span>
              </div>
              <p className="text-gray-400 mb-4">
                The simplest and most effective way to learn basic mathematics online.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-math-blue-400 transition-colors">
                  📘 Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-math-blue-400 transition-colors">
                  📸 Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-math-blue-400 transition-colors">
                  🎥 YouTube
                </a>
              </div>
            </div>
            
            {/* Course Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Course</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Course Content</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo Lessons</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Certificate</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Methodology</a></li>
              </ul>
            </div>
            
            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 contact@mathfacil.com</li>
                <li>📱 (11) 99999-9999</li>
                <li>⏰ Mon-Fri: 8am to 6pm</li>
                <li>📍 São Paulo, SP</li>
              </ul>
            </div>
          </div>
          
          <hr className="border-gray-700 my-8" />
          
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MathFácil. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
