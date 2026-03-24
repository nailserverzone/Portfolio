import { createClient } from "@supabase/supabase-js";

/* ── Supabase client ──
   Keys MUST come from environment variables.
   NEXT_PUBLIC_ prefix makes them available client-side,
   which is fine for the anon key (it's meant to be public)
   as long as RLS policies are properly configured.
*/
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
