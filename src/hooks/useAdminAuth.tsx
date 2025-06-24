
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is logged in (using localStorage for simplicity)
    const checkAdminAuth = () => {
      const adminData = localStorage.getItem('admin_user');
      if (adminData) {
        try {
          const admin = JSON.parse(adminData);
          setAdminUser(admin);
        } catch (error) {
          localStorage.removeItem('admin_user');
        }
      }
      setLoading(false);
    };

    checkAdminAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // For demo purposes, we'll use a simple check
      // In production, you'd want proper password hashing and verification
      const { data: adminUsers, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !adminUsers) {
        return { error: { message: 'Invalid credentials' } };
      }

      // In production, verify password hash here
      // For demo, we'll accept any password for existing admins
      const adminUser: AdminUser = {
        id: adminUsers.id,
        email: adminUsers.email,
        full_name: adminUsers.full_name,
        created_at: adminUsers.created_at,
        updated_at: adminUsers.updated_at
      };

      setAdminUser(adminUser);
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      
      return { error: null };
    } catch (error) {
      return { error: { message: 'Login failed' } };
    }
  };

  const signOut = async () => {
    setAdminUser(null);
    localStorage.removeItem('admin_user');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado da área administrativa.",
    });
  };

  const value: AdminAuthContextType = {
    adminUser,
    loading,
    signIn,
    signOut
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
