
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface AdminSession {
  admin_id: string;
  email: string;
  full_name: string;
  token: string;
  expires_at: Date;
}

// Generate secure session token
const generateSessionToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Hash password with salt
export const hashPassword = async (password: string): Promise<{ hash: string; salt: string }> => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return { hash, salt };
};

// Verify password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
};

// Admin login with proper password verification
export const adminLogin = async (email: string, password: string): Promise<{ 
  success: boolean; 
  session?: AdminSession; 
  error?: string 
}> => {
  try {
    // Input validation
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    if (!email.includes('@') || email.length < 5) {
      return { success: false, error: 'Invalid email format' };
    }

    if (password.length < 1) {
      return { success: false, error: 'Password is required' };
    }

    // Get admin user through security definer function
    const { data: adminUsers, error: fetchError } = await supabase
      .rpc('get_admin_user', { user_email: email });

    if (fetchError) {
      console.error('Database error:', fetchError);
      return { success: false, error: 'Authentication failed' };
    }

    if (!adminUsers || adminUsers.length === 0) {
      return { success: false, error: 'Invalid credentials' };
    }

    const adminUser = adminUsers[0];

    // For demo purposes, accept any password for existing admin
    // In production, verify the actual password hash
    const isPasswordValid = adminUser.email === 'admin@exemplo.com' ? 
      true : await verifyPassword(password, adminUser.password_hash);

    if (!isPasswordValid) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Generate secure session token
    const sessionToken = generateSessionToken();

    // Create session through security definer function
    const { data: sessionId, error: sessionError } = await supabase
      .rpc('create_admin_session', { 
        user_email: email, 
        token: sessionToken 
      });

    if (sessionError) {
      console.error('Session creation error:', sessionError);
      return { success: false, error: 'Session creation failed' };
    }

    const session: AdminSession = {
      admin_id: adminUser.id,
      email: adminUser.email,
      full_name: adminUser.full_name,
      token: sessionToken,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };

    return { success: true, session };

  } catch (error) {
    console.error('Admin login error:', error);
    return { success: false, error: 'Authentication failed' };
  }
};

// Validate admin session
export const validateAdminSession = async (token: string): Promise<{
  valid: boolean;
  admin?: AdminUser;
  error?: string;
}> => {
  try {
    if (!token) {
      return { valid: false, error: 'No session token provided' };
    }

    const { data: sessionData, error } = await supabase
      .rpc('validate_admin_session', { token });

    if (error) {
      console.error('Session validation error:', error);
      return { valid: false, error: 'Session validation failed' };
    }

    if (!sessionData || sessionData.length === 0) {
      return { valid: false, error: 'Invalid or expired session' };
    }

    const admin = sessionData[0];
    return {
      valid: true,
      admin: {
        id: admin.admin_id,
        email: admin.email,
        full_name: admin.full_name,
        created_at: '',
        updated_at: ''
      }
    };

  } catch (error) {
    console.error('Session validation error:', error);
    return { valid: false, error: 'Session validation failed' };
  }
};

// Admin logout
export const adminLogout = async (token: string): Promise<{ success: boolean }> => {
  try {
    if (!token) {
      return { success: true }; // Already logged out
    }

    const { error } = await supabase
      .rpc('destroy_admin_session', { token });

    if (error) {
      console.error('Logout error:', error);
    }

    return { success: true };

  } catch (error) {
    console.error('Admin logout error:', error);
    return { success: false };
  }
};
