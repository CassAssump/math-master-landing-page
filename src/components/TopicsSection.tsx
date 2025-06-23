
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TopicsSection = () => {
  const topics = [
    {
      category: "Fundamentals",
      items: [
        "Basic operations (addition, subtraction, multiplication, division)",
        "Integers, decimals and fractions",
        "Properties of operations",
        "Order of mathematical operations"
      ]
    },
    {
      category: "Fractions and Decimals",
      items: [
        "Fundamental concepts of fractions",
        "Operations with fractions",
        "Conversion between fractions and decimals",
        "Equivalent fractions and simplification"
      ]
    },
    {
      category: "Exponentiation and Roots",
      items: [
        "Concepts of power and root",
        "Properties of exponentiation",
        "Scientific notation",
        "Square and cube root"
      ]
    },
    {
      category: "Percentage",
      items: [
        "Basic concepts and calculations",
        "Discount and markup percentages",
        "Simple and compound rule of three",
        "Practical everyday applications"
      ]
    },
    {
      category: "Algebra",
      items: [
        "Algebraic expressions",
        "First and second degree equations",
        "Systems of equations",
        "Basic inequalities"
      ]
    },
    {
      category: "Ratio and Proportion",
      items: [
        "Concepts of ratio and proportion",
        "Properties of proportions",
        "Simple and compound rule of three",
        "Directly and inversely proportional quantities"
      ]
    },
    {
      category: "Functions",
      items: [
        "Function concept",
        "First degree function (linear)",
        "Second degree function (quadratic)",
        "Graphs and interpretation"
      ]
    },
    {
      category: "Basic Geometry",
      items: [
        "Plane and spatial figures",
        "Perimeter and area of figures",
        "Volume of geometric solids",
        "Pythagorean theorem"
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
            Complete <span className="text-math-green-600">Course</span> Content
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about basic mathematics, organized logically and progressively
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
            <h3 className="text-2xl font-bold mb-4">🎯 Over 50 Hours of Content</h3>
            <p className="text-lg mb-6 opacity-90">
              Video Lessons + Exercises + Support Materials + Complete Support
            </p>
            <Button 
              size="lg" 
              onClick={handleAccessComplete}
              className="bg-white text-math-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              I Want Complete Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
