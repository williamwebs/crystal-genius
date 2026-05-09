import { cookies } from "next/headers";
import {
  createClient,
  type SupabaseClient,
  type User,
} from "@supabase/supabase-js";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from "./auth-cookies";

type RefreshedSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: User | null;
};

export type ServerSupabaseContext = {
  supabase: SupabaseClient;
  user: User | null;
  accessToken: string | null;
  refreshedSession: RefreshedSession | null;
};

function createAuthClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

function createScopedClient(accessToken?: string | null) {
  const options = accessToken
    ? {
        accessToken: async () => accessToken,
      }
    : undefined;

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    options
  );
}

function persistRefreshedSession(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  refreshedSession: RefreshedSession
) {
  try {
    cookieStore.set(
      ACCESS_TOKEN_COOKIE,
      refreshedSession.access_token,
      getAccessTokenCookieOptions(refreshedSession.expires_at)
    );
    cookieStore.set(
      REFRESH_TOKEN_COOKIE,
      refreshedSession.refresh_token,
      getRefreshTokenCookieOptions()
    );
  } catch {
    // Server Components may not allow mutating cookies for the current response.
  }
}

export async function getServerSupabaseContext(): Promise<ServerSupabaseContext> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  const authClient = createAuthClient();

  let resolvedUser: User | null = null;
  let resolvedAccessToken = accessToken ?? null;
  let refreshedSession: RefreshedSession | null = null;

  if (resolvedAccessToken) {
    const {
      data: { user },
    } = await authClient.auth.getUser(resolvedAccessToken);

    resolvedUser = user ?? null;
  }

  if (!resolvedUser && refreshToken) {
    const {
      data: { session },
    } = await authClient.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (session?.access_token && session.refresh_token) {
      resolvedAccessToken = session.access_token;
      resolvedUser = session.user ?? null;
      refreshedSession = {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at,
        user: session.user ?? null,
      };

      persistRefreshedSession(cookieStore, refreshedSession);
    }
  }

  return {
    supabase: createScopedClient(resolvedAccessToken),
    user: resolvedUser,
    accessToken: resolvedAccessToken,
    refreshedSession,
  };
}

export async function createServerSupabaseClient() {
  const { supabase } = await getServerSupabaseContext();
  return supabase;
}
