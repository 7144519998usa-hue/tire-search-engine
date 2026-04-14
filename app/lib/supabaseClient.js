import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getServerEnv } from "./env";

const { supabaseUrl, supabaseKey } = getServerEnv();

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
