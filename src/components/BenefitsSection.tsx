
import { Card, CardContent } from "@/components/ui/card";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Simple Language",
      description: "Clear and direct explanations, without complications. Mathematics explained in a way that anyone can understand."
    },
    {
      icon: "📹",
      title: "Educational Video Lessons",
      description: "Over 100 video lessons with practical everyday examples to reinforce learning."
    },
    {
      icon: "💡",
      title: "Practical Examples",
      description: "Learn mathematics with real-life situations: calculating discounts, interest, measurements and much more."
    },
    {
      icon: "📱",
      title: "Lifetime Access",
      description: "Study whenever and wherever you want. Access via computer, tablet or phone, with no expiration date."
    },
    {
      icon: "🏆",
      title: "Certificate of Completion",
      description: "Receive your digital certificate upon course completion and prove your knowledge."
    },
    {
      icon: "👨‍🏫",
      title: "Expert Teacher",
      description: "Learn from someone with over 10 years of experience teaching mathematics in an uncomplicated way."
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Why Choose <span className="text-math-blue-600">MathFácil</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the advantages that make our course the best choice for mastering mathematics
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
