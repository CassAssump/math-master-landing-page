
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";

const CourseContent = () => {
  const topics = [
    {
      category: "Fundamentos",
      description: "Base sólida para toda matemática",
      items: [
        "Operações básicas (soma, subtração, multiplicação, divisão)",
        "Números inteiros, decimais e frações",
        "Propriedades das operações",
        "Ordem das operações matemáticas",
        "Múltiplos e divisores",
        "Números primos e compostos"
      ]
    },
    {
      category: "Frações e Decimais",
      description: "Domine frações e números decimais",
      items: [
        "Conceitos fundamentais de frações",
        "Operações com frações (soma, subtração, multiplicação, divisão)",
        "Conversão entre frações e decimais",
        "Frações equivalentes e simplificação",
        "Comparação de frações",
        "Problemas práticos com frações"
      ]
    },
    {
      category: "Potenciação e Radiciação",
      description: "Potências e raízes sem mistério",
      items: [
        "Conceitos de potência e raiz",
        "Propriedades da potenciação",
        "Potências com expoente negativo",
        "Notação científica",
        "Raiz quadrada e cúbica",
        "Simplificação de radicais"
      ]
    },
    {
      category: "Porcentagem",
      description: "Matemática do dia a dia",
      items: [
        "Conceito e cálculos básicos de porcentagem",
        "Porcentagem de desconto e acréscimo",
        "Juros simples e compostos",
        "Regra de três simples e composta",
        "Aplicações práticas do dia a dia",
        "Problemas de aumento e diminuição percentual"
      ]
    },
    {
      category: "Álgebra",
      description: "Introdução ao mundo das letras na matemática",
      items: [
        "Expressões algébricas",
        "Operações com expressões algébricas",
        "Equações do 1º grau",
        "Equações do 2º grau",
        "Sistemas de equações",
        "Inequações básicas",
        "Fatoração"
      ]
    },
    {
      category: "Razão e Proporção",
      description: "Relacionando grandezas matemáticas",
      items: [
        "Conceitos de razão e proporção",
        "Propriedades das proporções",
        "Regra de três simples",
        "Regra de três composta",
        "Grandezas diretamente proporcionais",
        "Grandezas inversamente proporcionais",
        "Divisão proporcional"
      ]
    },
    {
      category: "Funções",
      description: "Relacionando variáveis matematicamente",
      items: [
        "Conceito de função",
        "Domínio e contradomínio",
        "Função do 1º grau (linear)",
        "Função do 2º grau (quadrática)",
        "Gráficos e interpretação",
        "Função inversa",
        "Função composta"
      ]
    },
    {
      category: "Geometria Básica",
      description: "Formas, medidas e espaço",
      items: [
        "Figuras planas (triângulo, quadrado, círculo)",
        "Perímetro de figuras planas",
        "Área de figuras planas",
        "Figuras espaciais (cubo, cilindro, esfera)",
        "Volume de sólidos geométricos",
        "Teorema de Pitágoras",
        "Relações métricas no triângulo"
      ]
    },
    {
      category: "Estatística e Probabilidade",
      description: "Dados, gráficos e chances",
      items: [
        "Coleta e organização de dados",
        "Medidas de tendência central (média, moda, mediana)",
        "Gráficos (barras, linhas, setores)",
        "Conceitos básicos de probabilidade",
        "Eventos simples e compostos",
        "Análise combinatória básica"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.close()}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Conteúdo Completo do <span className="text-math-blue-600">Curso</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Plataforma interativa com questões práticas e teoria organizada por tópicos
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-math-blue-500" />
                <span>9 Módulos Completos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-math-green-500" />
                <span>500+ Exercícios Interativos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {topics.map((topic, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center mb-2">
                  <span className="w-10 h-10 bg-math-gradient rounded-full flex items-center justify-center text-white text-lg font-bold mr-4">
                    {index + 1}
                  </span>
                  <div>
                    <CardTitle className="text-xl font-bold text-math-blue-700">
                      {topic.category}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {topic.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                      <span className="text-math-green-500 mr-3 mt-1 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-math-gradient rounded-2xl p-8 max-w-4xl mx-auto text-white">
            <h3 className="text-3xl font-bold mb-4">🎯 Metodologia Interativa</h3>
            <p className="text-lg mb-6 opacity-90">
              Aprenda através de exercícios práticos e questões interativas organizadas por dificuldade
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-yellow-300">📚</div>
                <div className="text-sm mt-2">Teoria Organizada por Tópicos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-yellow-300">🎮</div>
                <div className="text-sm mt-2">Exercícios Interativos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-yellow-300">📊</div>
                <div className="text-sm mt-2">Acompanhamento de Progresso</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
