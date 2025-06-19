import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TopicsSection = () => {
  const topics = [
    {
      category: "Fundamentos",
      items: [
        "Operações básicas (soma, subtração, multiplicação, divisão)",
        "Números inteiros, decimais e frações",
        "Propriedades das operações",
        "Ordem das operações matemáticas"
      ]
    },
    {
      category: "Frações e Decimais",
      items: [
        "Conceitos fundamentais de frações",
        "Operações com frações",
        "Conversão entre frações e decimais",
        "Frações equivalentes e simplificação"
      ]
    },
    {
      category: "Potenciação e Radiciação",
      items: [
        "Conceitos de potência e raiz",
        "Propriedades da potenciação",
        "Notação científica",
        "Raiz quadrada e cúbica"
      ]
    },
    {
      category: "Porcentagem",
      items: [
        "Conceito e cálculos básicos",
        "Porcentagem de desconto e acréscimo",
        "Regra de três simples e composta",
        "Aplicações práticas do dia a dia"
      ]
    },
    {
      category: "Álgebra",
      items: [
        "Expressões algébricas",
        "Equações do 1º e 2º grau",
        "Sistemas de equações",
        "Inequações básicas"
      ]
    },
    {
      category: "Razão e Proporção",
      items: [
        "Conceitos de razão e proporção",
        "Propriedades das proporções",
        "Regra de três simples e composta",
        "Grandezas diretamente e inversamente proporcionais"
      ]
    },
    {
      category: "Funções",
      items: [
        "Conceito de função",
        "Função do 1º grau (linear)",
        "Função do 2º grau (quadrática)",
        "Gráficos e interpretação"
      ]
    },
    {
      category: "Geometria Básica",
      items: [
        "Figuras planas e espaciais",
        "Perímetro e área de figuras",
        "Volume de sólidos geométricos",
        "Teorema de Pitágoras"
      ]
    }
  ];

  const handleAccessComplete = () => {
    window.open('https://pay.kiwify.com.br/2FXZZ95', '_blank');
  };

  return (
    <section id="topicos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Conteúdo Completo do <span className="text-math-green-600">Curso</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa saber sobre matemática básica, organizado de forma lógica e progressiva
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {topics.map((topic, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-math-blue-700 flex items-center">
                  <span className="w-8 h-8 bg-math-gradient rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  {topic.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topic.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                      <span className="text-math-green-500 mr-2 mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="bg-math-gradient rounded-2xl p-8 max-w-4xl mx-auto text-white">
            <h3 className="text-2xl font-bold mb-4">🎯 Mais de 50 Horas de Conteúdo</h3>
            <p className="text-lg mb-6 opacity-90">
              Videoaulas + Exercícios + Material de Apoio + Suporte Completo
            </p>
            <Button 
              size="lg" 
              onClick={handleAccessComplete}
              className="bg-white text-math-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              Quero Ter Acesso Completo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
