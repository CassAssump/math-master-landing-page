
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Users, Settings, BarChart3, Shield, Save, Trash2 } from "lucide-react";

interface SiteStatistic {
  id: string;
  metric_name: string;
  metric_value: number;
  updated_at: string;
}

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: string;
  description: string | null;
  updated_at: string;
}

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const { adminUser, signOut } = useAdminAuth();
  const { toast } = useToast();
  
  const [statistics, setStatistics] = useState<SiteStatistic[]>([]);
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load statistics
      const { data: statsData } = await supabase
        .from('site_statistics')
        .select('*')
        .order('metric_name');
      
      // Load settings
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*')
        .order('setting_key');
      
      // Load users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (statsData) setStatistics(statsData);
      if (settingsData) setSettings(settingsData);
      if (usersData) setUsers(usersData);
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar dados do dashboard",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (settingId: string, newValue: string) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ 
          setting_value: newValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', settingId);

      if (error) throw error;

      setSettings(prev => 
        prev.map(setting => 
          setting.id === settingId 
            ? { ...setting, setting_value: newValue, updated_at: new Date().toISOString() }
            : setting
        )
      );

      toast({
        title: "Configuração atualizada",
        description: "A configuração foi salva com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar configuração",
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      setUsers(prev => prev.filter(user => user.id !== userId));
      
      toast({
        title: "Usuário excluído",
        description: "O usuário foi removido com sucesso.",
      });
      
      // Reload statistics to update user count
      loadDashboardData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir usuário",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-700 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                Painel Administrativo
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Olá, {adminUser.full_name}
              </span>
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Estatísticas
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statistics.map((stat) => (
                <Card key={stat.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.metric_name === 'total_users' && 'Total de Usuários'}
                      {stat.metric_name === 'page_views' && 'Visualizações de Página'}
                      {stat.metric_name === 'messages_received' && 'Mensagens Recebidas'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.metric_value}</div>
                    <p className="text-xs text-muted-foreground">
                      Atualizado em {new Date(stat.updated_at).toLocaleDateString('pt-BR')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resumo do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total de usuários registrados:</span>
                    <span className="font-semibold">{users.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Configurações do site:</span>
                    <span className="font-semibold">{settings.length} itens</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Status do sistema:</span>
                    <span className="text-green-600 font-semibold">Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Data de Cadastro</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.full_name || 'Não informado'}</TableCell>
                        <TableCell>{user.email || 'Não informado'}</TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Site</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {settings.map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <Label htmlFor={setting.setting_key}>
                      {setting.setting_key === 'site_title' && 'Título do Site'}
                      {setting.setting_key === 'site_description' && 'Descrição do Site'}
                      {setting.setting_key === 'contact_email' && 'E-mail de Contato'}
                      {setting.setting_key === 'course_price' && 'Preço do Curso (USD)'}
                    </Label>
                    {setting.description && (
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    )}
                    <div className="flex space-x-2">
                      {setting.setting_type === 'textarea' ? (
                        <Textarea
                          id={setting.setting_key}
                          value={setting.setting_value || ''}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setSettings(prev => 
                              prev.map(s => 
                                s.id === setting.id 
                                  ? { ...s, setting_value: newValue }
                                  : s
                              )
                            );
                          }}
                          className="flex-1"
                        />
                      ) : (
                        <Input
                          id={setting.setting_key}
                          type={setting.setting_type}
                          value={setting.setting_value || ''}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setSettings(prev => 
                              prev.map(s => 
                                s.id === setting.id 
                                  ? { ...s, setting_value: newValue }
                                  : s
                              )
                            );
                          }}
                          className="flex-1"
                        />
                      )}
                      <Button 
                        onClick={() => updateSetting(setting.id, setting.setting_value || '')}
                        size="sm"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Detalhadas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Métrica</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Última Atualização</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statistics.map((stat) => (
                      <TableRow key={stat.id}>
                        <TableCell className="font-medium">
                          {stat.metric_name === 'total_users' && 'Total de Usuários'}
                          {stat.metric_name === 'page_views' && 'Visualizações de Página'}
                          {stat.metric_name === 'messages_received' && 'Mensagens Recebidas'}
                        </TableCell>
                        <TableCell>{stat.metric_value}</TableCell>
                        <TableCell>
                          {new Date(stat.updated_at).toLocaleString('pt-BR')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
