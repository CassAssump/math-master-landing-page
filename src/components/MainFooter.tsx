
import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
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
            <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
