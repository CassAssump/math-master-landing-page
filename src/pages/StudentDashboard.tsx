
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Home, BookOpen, BarChart3, HelpCircle, LogOut, Play, CheckCircle, Clock } from "lucide-react";

const StudentDashboard = () => {
  const studentName = "João";
  const overallProgress = 65; // 65% do curso completo
  
  const menuItems = [
    { title: "Início", icon: Home, isActive: true },
    { title: "Meus Cursos", icon: BookOpen },
    { title: "Progresso", icon: BarChart3 },
    { title: "Dúvidas", icon: HelpCircle },
    { title: "Sair", icon: LogOut },
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
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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

          <main className="flex-1 space-y-6 p-6">
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

            {/* Módulos do Curso */}
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
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;
