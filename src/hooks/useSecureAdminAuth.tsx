
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { adminLogin, validateAdminSession, adminLogout, AdminUser, AdminSession } from '@/utils/adminAuth';

interface SecureAdminAuthContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const SecureAdminAuthContext = createContext<SecureAdminAuthContextType | undefined>(undefined);

export const SecureAdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('admin_session_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const { valid, admin, error } = await validateAdminSession(token);
      
      if (valid && admin) {
        setAdminUser(admin);
        setSessionToken(token);
      } else {
        // Invalid session, clean up
        localStorage.removeItem('admin_session_token');
        localStorage.removeItem('admin_user');
        if (error) {
          console.log('Session validation failed:', error);
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_user');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const result = await adminLogin(email, password);
      
      if (result.success && result.session) {
        const admin: AdminUser = {
          id: result.session.admin_id,
          email: result.session.email,
          full_name: result.session.full_name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        setAdminUser(admin);
        setSessionToken(result.session.token);
        
        // Store secure session data
        localStorage.setItem('admin_session_token', result.session.token);
        localStorage.setItem('admin_user', JSON.stringify(admin));
        
        return { error: null };
      } else {
        return { error: { message: result.error || 'Login failed' } };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: { message: 'Login failed' } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (sessionToken) {
        await adminLogout(sessionToken);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      // Clean up local state
      setAdminUser(null);
      setSessionToken(null);
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_user');
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado da área administrativa.",
      });
    }
  };

  const value: SecureAdminAuthContextType = {
    adminUser,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!adminUser && !!sessionToken
  };

  return (
    <SecureAdminAuthContext.Provider value={value}>
      {children}
    </SecureAdminAuthContext.Provider>
  );
};

export const useSecureAdminAuth = () => {
  const context = useContext(SecureAdminAuthContext);
  if (context === undefined) {
    throw new Error('useSecureAdminAuth must be used within a SecureAdminAuthProvider');
  }
  return context;
};
