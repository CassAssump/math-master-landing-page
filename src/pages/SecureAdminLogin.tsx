
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, Shield, AlertTriangle } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useSecureAdminAuth } from "@/hooks/useSecureAdminAuth";
import { useToast } from "@/hooks/use-toast";

const SecureAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  const { adminUser, signIn } = useSecureAdminAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  if (adminUser) {
    return <Navigate to="/admin" replace />;
  }

  // Rate limiting - simple client-side protection
  const isRateLimited = attemptCount >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRateLimited) {
      toast({
        title: "Muitas tentativas",
        description: "Aguarde alguns minutos antes de tentar novamente.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signIn(email, password);
      
      if (result.error) {
        setAttemptCount(prev => prev + 1);
        toast({
          title: "Erro no login",
          description: result.error.message || "Credenciais inválidas.",
          variant: "destructive"
        });
      } else {
        setAttemptCount(0);
        toast({
          title: "Login realizado!",
          description: "Bem-vindo à área administrativa!",
        });
      }
    } catch (error) {
      setAttemptCount(prev => prev + 1);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Back to home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-white hover:text-purple-300 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao site
        </Link>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-700 p-3 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Área Administrativa Segura
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Entre com suas credenciais de administrador
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {isRateLimited && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">
                  Muitas tentativas de login. Tente novamente em alguns minutos.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  required
                  className="h-12"
                  disabled={isRateLimited}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-10"
                    disabled={isRateLimited}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isRateLimited}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-purple-700 hover:bg-purple-800 text-white font-semibold"
                disabled={isLoading || isRateLimited}
              >
                {isLoading ? "Verificando..." : "Entrar"}
              </Button>
            </form>

            <div className="text-center text-xs text-gray-500 pt-2">
              Acesso restrito apenas para administradores autorizados
              {attemptCount > 0 && (
                <div className="text-red-600 mt-1">
                  Tentativas restantes: {5 - attemptCount}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Demo credentials - will be removed in production */}
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <p className="text-white text-sm text-center mb-2 font-semibold">📝 Credenciais de Demonstração</p>
          <p className="text-white/90 text-xs text-center">
            <strong>E-mail:</strong> admin@exemplo.com<br />
            <strong>Senha:</strong> qualquer senha (demo)
          </p>
          <p className="text-red-300 text-xs text-center mt-2">
            ⚠️ Sistema de autenticação seguro ativado
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureAdminLogin;
