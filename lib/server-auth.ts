import "server-only";

import { type User } from "@supabase/supabase-js";
import { getServerSupabaseContext } from "./server-supabase";

export async function getServerSupabaseUser(): Promise<User | null> {
  const { user } = await getServerSupabaseContext();
  return user;
}
