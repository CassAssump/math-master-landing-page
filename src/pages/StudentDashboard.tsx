
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { Home, BookOpen, BarChart3, HelpCircle, LogOut, Play, CheckCircle, Clock, User, MessageSquare, Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  full_name: string | null;
}

const StudentDashboard = () => {
  const { user, signOut, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("inicio");
  const overallProgress = 65; // 65% do curso completo
  
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
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user?.id)
        .single();
      
      setProfile(data);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };
  
  const menuItems = [
    { title: "Início", icon: Home, value: "inicio", isActive: activeTab === "inicio" },
    { title: "Meus Cursos", icon: BookOpen, value: "cursos", isActive: activeTab === "cursos" },
    { title: "Progresso", icon: BarChart3, value: "progresso", isActive: activeTab === "progresso" },
    { title: "Dúvidas", icon: HelpCircle, value: "duvidas", isActive: activeTab === "duvidas" },
  ];

  const courseModules = [
    {
      id: 1,
      title: "Números Naturais",
      description: "Aprenda sobre números naturais, operações básicas e propriedades",
      status: "completed",
      progress: 100
    },
    {
      id: 2,
      title: "Frações",
      description: "Compreenda frações, operações e simplificações",
      status: "completed",
      progress: 100
    },
    {
      id: 3,
      title: "Decimais",
      description: "Trabalhe com números decimais e suas aplicações",
      status: "in-progress",
      progress: 60
    },
    {
      id: 4,
      title: "Porcentagem",
      description: "Calcule porcentagens e resolva problemas do cotidiano",
      status: "not-started",
      progress: 0
    },
    {
      id: 5,
      title: "Equações do 1º Grau",
      description: "Resolva equações lineares e sistemas simples",
      status: "not-started",
      progress: 0
    },
    {
      id: 6,
      title: "Geometria Básica",
      description: "Formas geométricas, perímetro e área",
      status: "not-started",
      progress: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Play className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Revisar Conteúdo";
      case "in-progress":
        return "Continuar Aula";
      default:
        return "Assistir Aula";
    }
  };

  const getButtonVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "outline";
      case "in-progress":
        return "default";
      default:
        return "secondary";
    }
  };

  const studentName = profile?.full_name?.split(' ')[0] || "Aluno";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-math-blue-700 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="border-b p-4">
            <h2 className="text-lg font-semibold text-math-blue-700">
              Dashboard do Aluno
            </h2>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu className="p-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(item.value)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <div className="border-t border-gray-200 mt-4 pt-4">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="w-full justify-start">
                    <Link to="/perfil">
                      <User className="h-4 w-4" />
                      <span>Meu Perfil</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Olá, {studentName}! 👋
              </h1>
              <p className="text-gray-600">Bem-vindo de volta ao seu curso de matemática</p>
            </div>
          </header>

          <main className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="hidden">
                <TabsTrigger value="inicio">Início</TabsTrigger>
                <TabsTrigger value="cursos">Meus Cursos</TabsTrigger>
                <TabsTrigger value="progresso">Progresso</TabsTrigger>
                <TabsTrigger value="duvidas">Dúvidas</TabsTrigger>
              </TabsList>

              <TabsContent value="inicio" className="space-y-6">
                {/* Progresso Atual */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Seu Progresso Atual</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progresso do Curso</span>
                      <span className="font-semibold text-math-blue-700">{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-3" />
                    <p className="text-sm text-gray-600">
                      Você concluiu {Math.round(overallProgress/100 * courseModules.length)} de {courseModules.length} módulos
                    </p>
                    <Button className="bg-math-blue-700 hover:bg-math-blue-800">
                      Continuar de onde parei
                    </Button>
                  </CardContent>
                </Card>

                <div>
                  <h2 className="text-xl font-bold mb-4">Módulos do Curso</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {courseModules.map((module) => (
                      <Card key={module.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            {getStatusIcon(module.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {module.description}
                          </p>
                          
                          {module.status === "in-progress" && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progresso</span>
                                <span>{module.progress}%</span>
                              </div>
                              <Progress value={module.progress} className="h-2" />
                            </div>
                          )}
                          
                          <Button 
                            variant={getButtonVariant(module.status)}
                            className="w-full"
                            disabled={module.status === "not-started"}
                          >
                            {getStatusText(module.status)}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cursos" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Meus Cursos</h2>
                  <p className="text-gray-600 mb-6">Gerencie e acesse todos os seus cursos de matemática</p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-2 border-math-blue-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl text-math-blue-700">Matemática Básica</CardTitle>
                            <p className="text-sm text-gray-600 mt-1">Curso Atual</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-math-blue-700">{overallProgress}%</div>
                            <div className="text-xs text-gray-500">Concluído</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Progress value={overallProgress} className="h-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>4 de 6 módulos concluídos</span>
                          <span>~15h restantes</span>
                        </div>
                        <Button className="w-full bg-math-blue-700 hover:bg-math-blue-800">
                          Continuar Curso
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed border-2 border-gray-300">
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-500">Próximo Curso</CardTitle>
                        <p className="text-sm text-gray-400">Matemática Intermediária</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-500">
                          Disponível após concluir o curso atual
                        </p>
                        <Button variant="outline" disabled className="w-full">
                          Bloqueado
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Módulos Detalhados</h3>
                    <div className="space-y-3">
                      {courseModules.map((module, index) => (
                        <Card key={module.id} className="hover:shadow-sm transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-math-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-math-blue-700">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-medium">{module.title}</h4>
                                  <p className="text-sm text-gray-600">{module.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                {getStatusIcon(module.status)}
                                <Button 
                                  variant={getButtonVariant(module.status)}
                                  size="sm"
                                  disabled={module.status === "not-started"}
                                >
                                  {getStatusText(module.status)}
                                </Button>
                              </div>
                            </div>
                            {module.status === "in-progress" && (
                              <div className="mt-3 ml-12">
                                <Progress value={module.progress} className="h-1" />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="progresso" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Meu Progresso</h2>
                  <p className="text-gray-600 mb-6">Acompanhe seu desenvolvimento e conquistas</p>
                  
                  <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-math-blue-700 mb-2">{overallProgress}%</div>
                        <div className="text-sm text-gray-600">Curso Concluído</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">25</div>
                        <div className="text-sm text-gray-600">Horas Estudadas</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                        <div className="text-sm text-gray-600">Dias Consecutivos</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Progresso por Módulo</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {courseModules.map((module) => (
                          <div key={module.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{module.title}</span>
                              <span className="text-sm text-gray-600">{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Conquistas Recentes</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">Módulo Concluído!</div>
                            <div className="text-sm text-gray-600">Frações - Concluído hoje</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Meta Diária</div>
                            <div className="text-sm text-gray-600">1 hora de estudo - 8 dias consecutivos</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium">Progresso Consistente</div>
                            <div className="text-sm text-gray-600">50% do curso concluído</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="duvidas" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Central de Dúvidas</h2>
                  <p className="text-gray-600 mb-6">Tire suas dúvidas e obtenha ajuda com o conteúdo</p>
                  
                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          Fazer uma Pergunta
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Tem alguma dúvida sobre o conteúdo? Nossa IA está aqui para ajudar!
                        </p>
                        <Button className="w-full bg-math-blue-700 hover:bg-math-blue-800">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Conversar com IA
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <HelpCircle className="h-5 w-5" />
                          FAQ - Perguntas Frequentes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Consulte as perguntas mais comuns sobre o curso
                        </p>
                        <Button variant="outline" className="w-full">
                          <HelpCircle className="h-4 w-4 mr-2" />
                          Ver FAQ
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Dúvidas Recentes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="border-l-4 border-math-blue-200 pl-4 py-2">
                          <div className="font-medium text-sm">Como resolver frações com denominadores diferentes?</div>
                          <div className="text-xs text-gray-600 mt-1">Perguntado em: Módulo Frações • 2 dias atrás</div>
                          <div className="text-sm text-gray-700 mt-2">
                            Para somar frações com denominadores diferentes, você precisa encontrar o MMC...
                          </div>
                          <Button variant="link" className="p-0 h-auto text-math-blue-700 text-sm">
                            Ver resposta completa
                          </Button>
                        </div>

                        <div className="border-l-4 border-green-200 pl-4 py-2">
                          <div className="font-medium text-sm">Qual a diferença entre números decimais e frações?</div>
                          <div className="text-xs text-gray-600 mt-1">Perguntado em: Módulo Decimais • 5 dias atrás</div>
                          <div className="text-sm text-gray-700 mt-2">
                            Números decimais e frações são formas diferentes de representar a mesma coisa...
                          </div>
                          <Button variant="link" className="p-0 h-auto text-math-blue-700 text-sm">
                            Ver resposta completa
                          </Button>
                        </div>

                        <div className="border-l-4 border-yellow-200 pl-4 py-2">
                          <div className="font-medium text-sm">Como calcular porcentagem de desconto?</div>
                          <div className="text-xs text-gray-600 mt-1">Perguntado em: Módulo Porcentagem • 1 semana atrás</div>
                          <div className="text-sm text-gray-700 mt-2">
                            Para calcular desconto, você pode usar a fórmula: Valor original × (desconto/100)...
                          </div>
                          <Button variant="link" className="p-0 h-auto text-math-blue-700 text-sm">
                            Ver resposta completa
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button variant="outline" className="w-full">
                          Ver todas as dúvidas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;
