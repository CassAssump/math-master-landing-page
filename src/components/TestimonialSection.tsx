
import { Card, CardContent } from "@/components/ui/card";

const TestimonialSection = () => {
  return (
    <section id="depoimento" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What Our <span className="text-math-blue-600">Students</span> Say
          </h2>
          <p className="text-xl text-gray-600">
            Real stories of transformation through mathematics
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <CardContent className="p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/3 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-math-blue-400 to-math-green-400 flex items-center justify-center text-white text-4xl font-bold">
                    MC
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Maria Clara Santos</h4>
                  <p className="text-gray-600">Student, 16 years old</p>
                  <div className="flex justify-center mt-2 text-yellow-400">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="text-6xl text-math-blue-200 mb-4">"</div>
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                    I always had a lot of difficulty with mathematics and would get anxious just thinking about tests. 
                    MathFácil completely changed my relationship with numbers! The teacher explains in such a 
                    simple way that I finally understood concepts that seemed impossible. My grade 
                    improved from 4 to 9 in just 3 months! Today I even enjoy solving math exercises. 
                    I recommend it to everyone who has difficulties like I had.
                  </blockquote>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="bg-math-blue-100 text-math-blue-700 px-3 py-1 rounded-full">
                      📈 Grade: 4 → 9
                    </div>
                    <div className="bg-math-green-100 text-math-green-700 px-3 py-1 rounded-full">
                      ⏱️ In 3 months
                    </div>
                    <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      😊 No more anxiety
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-math-blue-600">95%</div>
              <div className="text-gray-600">Improved their grades</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-math-green-600">4.9/5</div>
              <div className="text-gray-600">Student rating</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-yellow-600">2.500+</div>
              <div className="text-gray-600">Successful students</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
