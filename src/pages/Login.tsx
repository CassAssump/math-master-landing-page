
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowLeft, BookOpen } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Redirecionar se já estiver logado
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let result;
      
      if (isSignUp) {
        if (!fullName.trim()) {
          toast({
            title: "Nome obrigatório",
            description: "Por favor, informe seu nome completo.",
            variant: "destructive"
          });
          return;
        }
        result = await signUp(email, password, fullName);
        
        if (!result.error) {
          toast({
            title: "Cadastro realizado!",
            description: "Verifique seu e-mail para confirmar a conta.",
          });
        }
      } else {
        result = await signIn(email, password);
        
        if (!result.error) {
          toast({
            title: "Login realizado!",
            description: "Bem-vindo de volta!",
          });
        }
      }
      
      if (result.error) {
        let errorMessage = "Ocorreu um erro. Tente novamente.";
        
        if (result.error.message.includes("Invalid login credentials")) {
          errorMessage = "E-mail ou senha incorretos.";
        } else if (result.error.message.includes("User already registered")) {
          errorMessage = "Este e-mail já está cadastrado. Tente fazer login.";
        } else if (result.error.message.includes("Password should be at least")) {
          errorMessage = "A senha deve ter pelo menos 6 caracteres.";
        }
        
        toast({
          title: isSignUp ? "Erro no cadastro" : "Erro no login",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Voltar para home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-white hover:text-yellow-300 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao início
        </Link>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-math-blue-700 p-3 rounded-full">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isSignUp ? "Criar Conta" : "Área do Aluno"}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {isSignUp 
                ? "Crie sua conta para acessar o curso" 
                : "Entre com suas credenciais para acessar o curso"
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Seu nome completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={isSignUp}
                    className="h-12"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isSignUp ? "Mínimo 6 caracteres" : "Digite sua senha"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-10"
                    minLength={isSignUp ? 6 : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Lembrar de mim
                    </Label>
                  </div>

                  <button
                    type="button"
                    className="text-sm text-math-blue-700 hover:text-math-blue-800 hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-math-blue-700 hover:bg-math-blue-800 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading 
                  ? (isSignUp ? "Criando conta..." : "Entrando...") 
                  : (isSignUp ? "Criar Conta" : "Entrar")
                }
              </Button>
            </form>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                {isSignUp ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-math-blue-700 hover:text-math-blue-800 hover:underline font-semibold"
                >
                  {isSignUp ? "Faça login aqui" : "Cadastre-se aqui"}
                </button>
              </p>
            </div>

            <div className="text-center text-xs text-gray-500 pt-2">
              Ao {isSignUp ? "criar uma conta" : "entrar"}, você concorda com nossos{" "}
              <button className="hover:underline">Termos de Uso</button> e{" "}
              <button className="hover:underline">Política de Privacidade</button>
            </div>
          </CardContent>
        </Card>

        {/* Demo credentials - only show for login */}
        {!isSignUp && (
          <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="text-white text-sm text-center mb-2 font-semibold">📝 Credenciais de Demonstração</p>
            <p className="text-white/90 text-xs text-center">
              <strong>E-mail:</strong> aluno@exemplo.com<br />
              <strong>Senha:</strong> 123456
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
