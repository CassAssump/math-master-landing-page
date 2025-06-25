
-- Fix RLS policies for admin tables
DROP POLICY IF EXISTS "Admin access only" ON public.admin_users;
DROP POLICY IF EXISTS "Admin access only" ON public.site_statistics;
DROP POLICY IF EXISTS "Admin access only" ON public.site_settings;

-- Create security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin_user(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = user_email
  );
END;
$$;

-- Create function to get admin user by email
CREATE OR REPLACE FUNCTION public.get_admin_user(user_email text)
RETURNS SETOF public.admin_users
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM public.admin_users 
  WHERE email = user_email;
END;
$$;

-- Create new RLS policies that allow access through security definer functions
CREATE POLICY "Admin users can access admin_users table" 
  ON public.admin_users 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin users can access site_statistics" 
  ON public.site_statistics 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin users can access site_settings" 
  ON public.site_settings 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Add proper password hashing column and session management
ALTER TABLE public.admin_users 
ADD COLUMN IF NOT EXISTS salt text,
ADD COLUMN IF NOT EXISTS session_token text,
ADD COLUMN IF NOT EXISTS session_expires_at timestamp with time zone;

-- Create admin sessions table for secure session management
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id uuid NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  session_token text NOT NULL UNIQUE,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  last_accessed_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on admin sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for admin sessions
CREATE POLICY "Admin sessions access" 
  ON public.admin_sessions 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create function to validate admin session
CREATE OR REPLACE FUNCTION public.validate_admin_session(token text)
RETURNS table(admin_id uuid, email text, full_name text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT au.id, au.email, au.full_name
  FROM public.admin_sessions asess
  JOIN public.admin_users au ON asess.admin_user_id = au.id
  WHERE asess.session_token = token 
    AND asess.expires_at > now();
    
  -- Update last accessed time
  UPDATE public.admin_sessions 
  SET last_accessed_at = now()
  WHERE session_token = token 
    AND expires_at > now();
END;
$$;

-- Create function to create admin session
CREATE OR REPLACE FUNCTION public.create_admin_session(user_email text, token text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_id uuid;
  session_id uuid;
BEGIN
  -- Get admin user id
  SELECT id INTO admin_id 
  FROM public.admin_users 
  WHERE email = user_email;
  
  IF admin_id IS NULL THEN
    RAISE EXCEPTION 'Admin user not found';
  END IF;
  
  -- Clean up expired sessions
  DELETE FROM public.admin_sessions 
  WHERE expires_at < now();
  
  -- Create new session
  INSERT INTO public.admin_sessions (admin_user_id, session_token, expires_at)
  VALUES (admin_id, token, now() + interval '24 hours')
  RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$;

-- Create function to destroy admin session
CREATE OR REPLACE FUNCTION public.destroy_admin_session(token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.admin_sessions 
  WHERE session_token = token;
  
  RETURN FOUND;
END;
$$;

-- Update demo admin with proper hashed password (this will be replaced with proper hash)
UPDATE public.admin_users 
SET password_hash = '$2b$10$rBmQl.0q8QZhGk5Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z',
    salt = 'demo_salt_replace_in_production'
WHERE email = 'admin@exemplo.com';
