
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
  const [activeTab, setActiveTab] = useState("home");
  const overallProgress = 65; // 65% of course completed
  
  // Redirect if not logged in
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
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };
  
  const menuItems = [
    { title: "Home", icon: Home, value: "home", isActive: activeTab === "home" },
    { title: "My Courses", icon: BookOpen, value: "courses", isActive: activeTab === "courses" },
    { title: "Progress", icon: BarChart3, value: "progress", isActive: activeTab === "progress" },
    { title: "Questions", icon: HelpCircle, value: "questions", isActive: activeTab === "questions" },
  ];

  const courseModules = [
    {
      id: 1,
      title: "Natural Numbers",
      description: "Learn about natural numbers, basic operations and properties",
      status: "completed",
      progress: 100
    },
    {
      id: 2,
      title: "Fractions",
      description: "Understand fractions, operations and simplifications",
      status: "completed",
      progress: 100
    },
    {
      id: 3,
      title: "Decimals",
      description: "Work with decimal numbers and their applications",
      status: "in-progress",
      progress: 60
    },
    {
      id: 4,
      title: "Percentage",
      description: "Calculate percentages and solve everyday problems",
      status: "not-started",
      progress: 0
    },
    {
      id: 5,
      title: "1st Degree Equations",
      description: "Solve linear equations and simple systems",
      status: "not-started",
      progress: 0
    },
    {
      id: 6,
      title: "Basic Geometry",
      description: "Geometric shapes, perimeter and area",
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
        return "Review Content";
      case "in-progress":
        return "Continue Lesson";
      default:
        return "Watch Lesson";
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

  const studentName = profile?.full_name?.split(' ')[0] || "Student";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-math-blue-700 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
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
              Student Dashboard
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
                      <span>My Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
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
                Hello, {studentName}! 👋
              </h1>
              <p className="text-gray-600">Welcome back to your mathematics course</p>
            </div>
          </header>

          <main className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="hidden">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
              </TabsList>

              <TabsContent value="home" className="space-y-6">
                {/* Current Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Your Current Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Course Progress</span>
                      <span className="font-semibold text-math-blue-700">{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-3" />
                    <p className="text-sm text-gray-600">
                      You have completed {Math.round(overallProgress/100 * courseModules.length)} of {courseModules.length} modules
                    </p>
                    <Button className="bg-math-blue-700 hover:bg-math-blue-800">
                      Continue where I left off
                    </Button>
                  </CardContent>
                </Card>

                <div>
                  <h2 className="text-xl font-bold mb-4">Course Modules</h2>
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
                                <span>Progress</span>
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

              <TabsContent value="courses" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">My Courses</h2>
                  <p className="text-gray-600 mb-6">Manage and access all your mathematics courses</p>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-2 border-math-blue-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl text-math-blue-700">Basic Mathematics</CardTitle>
                            <p className="text-sm text-gray-600 mt-1">Current Course</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-math-blue-700">{overallProgress}%</div>
                            <div className="text-xs text-gray-500">Completed</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Progress value={overallProgress} className="h-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>4 of 6 modules completed</span>
                          <span>~15h remaining</span>
                        </div>
                        <Button className="w-full bg-math-blue-700 hover:bg-math-blue-800">
                          Continue Course
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed border-2 border-gray-300">
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-500">Next Course</CardTitle>
                        <p className="text-sm text-gray-400">Intermediate Mathematics</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-500">
                          Available after completing current course
                        </p>
                        <Button variant="outline" disabled className="w-full">
                          Locked
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Detailed Modules</h3>
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

              <TabsContent value="progress" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">My Progress</h2>
                  <p className="text-gray-600 mb-6">Track your development and achievements</p>
                  
                  <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-math-blue-700 mb-2">{overallProgress}%</div>
                        <div className="text-sm text-gray-600">Course Completed</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">25</div>
                        <div className="text-sm text-gray-600">Hours Studied</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                        <div className="text-sm text-gray-600">Consecutive Days</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Progress by Module</CardTitle>
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
                        <CardTitle className="text-lg">Recent Achievements</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">Module Completed!</div>
                            <div className="text-sm text-gray-600">Fractions - Completed today</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Daily Goal</div>
                            <div className="text-sm text-gray-600">1 hour of study - 8 consecutive days</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium">Consistent Progress</div>
                            <div className="text-sm text-gray-600">50% of course completed</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Support Center</h2>
                  <p className="text-gray-600 mb-6">Ask questions and get help with the content</p>
                  
                  <div className="grid gap-6 md:grid-cols-2 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          Ask a Question
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Have any questions about the content? Our AI is here to help!
                        </p>
                        <Button className="w-full bg-math-blue-700 hover:bg-math-blue-800">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat with AI
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <HelpCircle className="h-5 w-5" />
                          FAQ - Frequently Asked Questions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Check the most common questions about the course
                        </p>
                        <Button variant="outline" className="w-full">
                          <HelpCircle className="h-4 w-4 mr-2" />
                          View FAQ
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="border-l-4 border-math-blue-200 pl-4 py-2">
                          <div className="font-medium text-sm">How to solve fractions with different denominators?</div>
                          <div className="text-xs text-gray-600 mt-1">Asked in: Fractions Module • 2 days ago</div>
                          <div className="text-sm text-gray-700 mt-2">
                            To add fractions with different denominators, you need to find the LCM...
                          </div>
                          <Button variant="link" className="p-0 h-auto text-math-blue-700 text-sm">
                            View complete answer
                          </Button>
                        </div>

                        <div className="border-l-4 border-green-200 pl-4 py-2">
                          <div className="font-medium text-sm">What's the difference between decimal numbers and fractions?</div>
                          <div className="text-xs text-gray-600 mt-1">Asked in: Decimals Module • 5 days ago</div>
                          <div className="text-sm text-gray-700 mt-2">
                            Decimal numbers and fractions are different ways of representing the same thing...
                          </div>
                          <Button variant="link" className="p-0 h-auto text-math-blue-700 text-sm">
                            View complete answer
                          </Button>
                        </div>

                        <div className="border-l-4 border-yellow-200 pl-4 py-2">
                          <div className="font-medium text-sm">How to calculate discount percentage?</div>
                          <div className="text-xs text-gray-600 mt-1">Asked in: Percentage Module • 1 week ago</div>
                          <div className="text-sm text-gray-700 mt-2">
                            To calculate discount, you can use the formula: Original value × (discount/100)...
                          </div>
                          <Button variant="link" className="p-0 h-auto text-math-blue-700 text-sm">
                            View complete answer
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button variant="outline" className="w-full">
                          View all questions
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
