import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oaasoxtrlydejkulokvt.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hYXNveHRybHlkZWprdWxva3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMjIxNTcsImV4cCI6MjA4OTU5ODE1N30.s0_q0XLX8ULKjpkgKNeOoFdIm4QwBc3N9KMFgAqEtc0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const EDGE_FN_URL = `${supabaseUrl}/functions/v1/admin-delete`;
