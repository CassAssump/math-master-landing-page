// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fpfbmhnvnvrwzshccwhe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwZmJtaG52bnZyd3pzaGNjd2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTk2ODEsImV4cCI6MjA2NTg3NTY4MX0.MqAGViHu7S-t8jfdzvXqJzYnBurmiOOu1cdteu6Wk3s";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);