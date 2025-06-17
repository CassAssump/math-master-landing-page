
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Section */}
      <div className="bg-math-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Pronto Para Dominar a Matemática?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Junte-se a mais de 2.500 alunos que já transformaram sua relação com a matemática
          </p>
          <Button 
            size="lg" 
            className="bg-white text-math-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            🚀 Comece Agora - Oferta Especial
          </Button>
          <p className="text-sm mt-4 text-blue-200">
            ✅ Acesso vitalício • ✅ Certificado incluído • ✅ Suporte 24/7
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
                A forma mais simples e eficaz de aprender matemática básica online.
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
              <h4 className="text-lg font-semibold mb-4">Curso</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Conteúdo Programático</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aulas Demonstrativas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Certificado</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Metodologia</a></li>
              </ul>
            </div>
            
            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fale Conosco</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 contato@mathfacil.com.br</li>
                <li>📱 (11) 99999-9999</li>
                <li>⏰ Seg-Sex: 8h às 18h</li>
                <li>📍 São Paulo, SP</li>
              </ul>
            </div>
          </div>
          
          <hr className="border-gray-700 my-8" />
          
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MathFácil. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Política de Reembolso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
