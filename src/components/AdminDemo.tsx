
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Component to initialize demo admin user - this would run once
export const AdminDemo = () => {
  useEffect(() => {
    const initDemoAdmin = async () => {
      // Check if demo admin already exists
      const { data: existingAdmin } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', 'admin@exemplo.com')
        .single();

      if (!existingAdmin) {
        // Create demo admin user
        await supabase
          .from('admin_users')
          .insert({
            email: 'admin@exemplo.com',
            password_hash: 'demo_hash', // In production, this would be properly hashed
            full_name: 'Administrador Demo'
          });
      }

      // Update user count
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id');
      
      if (profiles) {
        await supabase
          .from('site_statistics')
          .update({ 
            metric_value: profiles.length,
            updated_at: new Date().toISOString()
          })
          .eq('metric_name', 'total_users');
      }
    };

    initDemoAdmin();
  }, []);

  return null;
};
