
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LogOut, ArrowLeft } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
}

const Profile = () => {
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Redirecionar se não estiver logado
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Erro ao buscar perfil:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar seu perfil.",
          variant: "destructive"
        });
      } else {
        setProfile(data);
        setFullName(data.full_name || "");
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) {
        toast({
          title: "Erro",
          description: "Não foi possível atualizar seu perfil.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Perfil atualizado!",
          description: "Suas informações foram salvas com sucesso.",
        });
        fetchProfile(); // Recarregar dados
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-math-blue-700 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-math-blue-700 hover:text-math-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Link>

          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-math-blue-700 p-4 rounded-full">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Meu Perfil
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Gerencie suas informações pessoais
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={updateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="h-12 bg-gray-50"
                />
                <p className="text-xs text-gray-500">
                  O e-mail não pode ser alterado por questões de segurança.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-math-blue-700 hover:bg-math-blue-800 text-white font-semibold"
                disabled={isUpdating}
              >
                {isUpdating ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </form>

            {/* Account Info */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informações da Conta
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ID do Usuário:</span>
                  <span className="font-mono text-xs">{profile?.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Conta criada em:</span>
                  <span>{new Date(profile?.created_at || "").toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
