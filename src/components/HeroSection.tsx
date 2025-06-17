
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const handleViewContent = () => {
    window.open('/conteudo-curso', '_blank');
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
              className="bg-white text-math-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🚀 Quero Aprender Matemática
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleViewContent}
              className="border-white text-white hover:bg-white hover:text-math-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              Ver Conteúdo do Curso
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
