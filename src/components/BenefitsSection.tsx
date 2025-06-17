
import { Card, CardContent } from "@/components/ui/card";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Linguagem Simples",
      description: "Explicações claras e diretas, sem complicação. Matemática explicada de forma que qualquer um entende."
    },
    {
      icon: "📹",
      title: "Videoaulas Didáticas",
      description: "Mais de 100 videoaulas com exemplos práticos do dia a dia para fixar o aprendizado."
    },
    {
      icon: "💡",
      title: "Exemplos Práticos",
      description: "Aprenda matemática com situações reais: calcular descontos, juros, medidas e muito mais."
    },
    {
      icon: "📱",
      title: "Acesso Vitalício",
      description: "Estude quando e onde quiser. Acesso pelo computador, tablet ou celular, sem prazo para acabar."
    },
    {
      icon: "🏆",
      title: "Certificado de Conclusão",
      description: "Receba seu certificado digital ao concluir o curso e comprove seu conhecimento."
    },
    {
      icon: "👨‍🏫",
      title: "Professor Especialista",
      description: "Aprenda com quem tem mais de 10 anos de experiência ensinando matemática de forma descomplicada."
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Por Que Escolher o <span className="text-math-blue-600">MathFácil</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra os diferenciais que fazem do nosso curso a melhor escolha para dominar a matemática
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
