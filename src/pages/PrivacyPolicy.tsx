
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </CardTitle>
            <p className="text-gray-600">Effective as of July 2, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none space-y-6">
            <div>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. It is MathFácil's policy to respect your privacy regarding any information we may collect from you across our website, MathFácil, and other sites we own and operate.
              </p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.
              </p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">
                We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.
              </p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">
                We don't share any personally identifying information publicly or with third-parties, except when required to by law.
              </p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">
                Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
              </p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">
                You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
              </p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">
                Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
              </p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-math-blue-700 mb-4">Cookie Policy for MathFácil</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This is the Cookie Policy for MathFácil, accessible from URL www.mathfacil.com.
              </p>
              
              <h3 className="text-xl font-semibold text-math-blue-600 mb-3">What Are Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or break certain elements of the sites functionality.
              </p>

              <h3 className="text-xl font-semibold text-math-blue-600 mb-3">How We Use Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
              </p>

              <h3 className="text-xl font-semibold text-math-blue-600 mb-3">Disabling Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
              </p>

              <h3 className="text-xl font-semibold text-math-blue-600 mb-3">Third Party Cookies</h3>
              <p className="text-gray-700 leading-relaxed">
                In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                This policy is effective as of July 2, 2025. Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
