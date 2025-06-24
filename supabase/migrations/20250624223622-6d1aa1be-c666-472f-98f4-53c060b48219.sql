
-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site statistics table
CREATE TABLE public.site_statistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL UNIQUE,
  metric_value INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type TEXT NOT NULL DEFAULT 'text',
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default statistics
INSERT INTO public.site_statistics (metric_name, metric_value) VALUES
('total_users', 0),
('page_views', 0),
('messages_received', 0);

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_title', 'Math Course Platform', 'text', 'Main title of the website'),
('site_description', 'Learn mathematics with our comprehensive online course', 'textarea', 'Site description'),
('contact_email', 'contact@mathcourse.com', 'email', 'Contact email address'),
('course_price', '99.99', 'number', 'Course price in USD');

-- Add RLS policies for admin tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies (these will be managed by the admin authentication system)
CREATE POLICY "Admin access only" ON public.admin_users FOR ALL USING (false);
CREATE POLICY "Admin access only" ON public.site_statistics FOR ALL USING (false);
CREATE POLICY "Admin access only" ON public.site_settings FOR ALL USING (false);

-- Create function to update user count
CREATE OR REPLACE FUNCTION update_user_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.site_statistics 
  SET metric_value = (SELECT COUNT(*) FROM public.profiles),
      updated_at = now()
  WHERE metric_name = 'total_users';
END;
$$;

-- Create trigger to automatically update user count when profiles change
CREATE OR REPLACE FUNCTION trigger_update_user_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM update_user_count();
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER profiles_count_trigger
  AFTER INSERT OR DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION trigger_update_user_count();
