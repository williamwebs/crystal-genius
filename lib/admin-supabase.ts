import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getServiceRoleKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    null
  );
}

export function hasAdminSupabaseAccess() {
  return Boolean(getServiceRoleKey());
}

export function createAdminSupabaseClient(): SupabaseClient {
  const serviceRoleKey = getServiceRoleKey();

  if (!serviceRoleKey) {
    throw new Error(
      "Missing Supabase service role key. Set SUPABASE_SERVICE_ROLE_KEY in your environment so admin write operations can bypass restrictive RLS."
    );
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
