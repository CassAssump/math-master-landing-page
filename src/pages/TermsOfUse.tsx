
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-math-blue-700">
              Terms of Use
            </CardTitle>
            <p className="text-gray-600">Effective as of July 2, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-math-blue-700 mb-4">User's Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The user undertakes the responsibility to make appropriate use of the contents and information offered on the site with enunciative, but not imitative, behaviour:
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="font-semibold text-math-blue-600">A)</span>
                  <p className="text-gray-700">
                    Not to engage in activities that are illegal or contrary to good faith and public order;
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <span className="font-semibold text-math-blue-600">B)</span>
                  <p className="text-gray-700">
                    Not to spread propaganda or content of a racist, xenophobic or gambling nature, any type of illegal pornography, terrorist claims or against human rights;
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <span className="font-semibold text-math-blue-600">C)</span>
                  <p className="text-gray-700">
                    Do not cause damage to physical systems (hardware) and unattainable (software) of MathFácil, its suppliers or third parties, to introduce or disseminate computer viruses or any other hardware or software systems that are capable of causing damage previously mentioned.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-math-blue-700 mb-4">More Information</h2>
              <p className="text-gray-700 leading-relaxed">
                Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                This policy is effective as of July 2, 2025 16:23.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfUse;
