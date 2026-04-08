import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cknqwmudnfcpcsaoatem.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_FHlD8NMuVXhEY4Mr_6wXeg_KkQDwq25';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
