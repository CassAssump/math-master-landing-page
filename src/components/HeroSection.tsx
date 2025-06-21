
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HeroSection = () => {
  const handleGuaranteeAccess = () => {
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-hero-gradient flex items-center justify-center text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Domine a <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Matemática</span> de Uma Vez Por Todas!
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Plataforma interativa de matemática básica com exercícios práticos e teoria organizada por tópicos. 
            Do ensino fundamental ao médio, com linguagem simples que realmente funciona.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={handleGuaranteeAccess}
              className="bg-white text-math-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🚀 Quero Garantir
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-yellow-300">100+</div>
              <div className="text-sm text-blue-100">Videoaulas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-yellow-300">50+</div>
              <div className="text-sm text-blue-100">Exercícios</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-yellow-300">24/7</div>
              <div className="text-sm text-blue-100">Suporte</div>
            </div>
          </div>

          {/* Pricing Section */}
          <div id="pricing-section" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Pronto Para Dominar a Matemática?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Escolha o plano ideal para você e transforme sua relação com a matemática
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Plano Aluno */}
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-yellow-300 hover:border-yellow-400 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-math-blue-700 mb-2">
                    📚 Plano Aluno
                  </CardTitle>
                  <div className="text-4xl font-bold text-math-blue-700 mb-2">
                    $9<span className="text-lg font-normal">/mês</span>
                  </div>
                  <p className="text-gray-600">Perfeito para estudantes</p>
                </CardHeader>
                <CardContent className="text-left">
                  <ul className="space-y-3 text-gray-700 mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      Acesso a todas as videoaulas
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      Exercícios práticos
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      Certificado de conclusão
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      Suporte 24/7
                    </li>
                  </ul>
                  <Button className="w-full bg-math-blue-700 hover:bg-math-blue-800 text-white font-bold py-3 rounded-full">
                    Escolher Plano Aluno
                  </Button>
                </CardContent>
              </Card>

              {/* Plano Professor */}
              <Card className="bg-gradient-to-br from-yellow-400 to-orange-400 border-2 border-yellow-300 hover:border-yellow-200 transition-all duration-300 hover:scale-105 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    🔥 MAIS POPULAR
                  </span>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-math-blue-900 mb-2">
                    👨‍🏫 Plano Professor
                  </CardTitle>
                  <div className="text-4xl font-bold text-math-blue-900 mb-2">
                    $19<span className="text-lg font-normal">/mês</span>
                  </div>
                  <p className="text-math-blue-800">Para educadores e profissionais</p>
                </CardHeader>
                <CardContent className="text-left">
                  <ul className="space-y-3 text-math-blue-900 mb-6">
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✅</span>
                      Tudo do Plano Aluno
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✅</span>
                      Materiais para ensino
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✅</span>
                      Banco de questões
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✅</span>
                      Suporte prioritário
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✅</span>
                      Relatórios de progresso
                    </li>
                  </ul>
                  <Button className="w-full bg-math-blue-900 hover:bg-math-blue-800 text-white font-bold py-3 rounded-full">
                    Escolher Plano Professor
                  </Button>
                </CardContent>
              </Card>
            </div>

            <p className="text-sm mt-6 text-blue-200">
              ✅ Acesso vitalício • ✅ Garantia de 30 dias • ✅ Cancele quando quiser
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
