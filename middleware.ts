import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from "./lib/auth-cookies";

/**
 * Protected admin routes — unauthenticated users are redirected to /cg-login.
 * If an authenticated user visits /cg-login, they're redirected to /cg-admin.
 */

const PROTECTED_PATHS = [
  "/cg-admin",
  "/drawings-management",
  "/orders",
  "/projects-management",
  "/settings",
];

function isAdminApiPath(pathname: string) {
  return pathname === "/api/admin" || pathname.startsWith("/api/admin/");
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );

  let isLoggedIn = false;
  let refreshedSession:
    | {
        access_token: string;
        refresh_token: string;
        expires_at?: number;
      }
    | null = null;

  if (accessToken) {
    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    isLoggedIn = !!user;
  }

  if (!isLoggedIn && refreshToken) {
    const {
      data: { session },
    } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (session?.access_token && session.refresh_token) {
      isLoggedIn = true;
      refreshedSession = {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at,
      };
    }
  }

  // --- If visiting login page while already authenticated, redirect to dashboard ---
  if (pathname === "/cg-login" && isLoggedIn) {
    const redirectTo = req.nextUrl.searchParams.get("redirect");
    const destination =
      redirectTo && redirectTo.startsWith("/") ? redirectTo : "/cg-admin";
    const response = NextResponse.redirect(new URL(destination, req.url));

    if (refreshedSession) {
      response.cookies.set(
        ACCESS_TOKEN_COOKIE,
        refreshedSession.access_token,
        getAccessTokenCookieOptions(refreshedSession.expires_at)
      );
      response.cookies.set(
        REFRESH_TOKEN_COOKIE,
        refreshedSession.refresh_token,
        getRefreshTokenCookieOptions()
      );
    }

    return response;
  }

  // --- If visiting a protected route without auth, redirect to login ---
  if (isAdminApiPath(pathname) && !isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isProtectedPath(pathname) && !isLoggedIn) {
    const loginUrl = new URL("/cg-login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();

  if (refreshedSession) {
    response.cookies.set(
      ACCESS_TOKEN_COOKIE,
      refreshedSession.access_token,
      getAccessTokenCookieOptions(refreshedSession.expires_at)
    );
    response.cookies.set(
      REFRESH_TOKEN_COOKIE,
      refreshedSession.refresh_token,
      getRefreshTokenCookieOptions()
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/cg-admin/:path*",
    "/drawings-management/:path*",
    "/orders/:path*",
    "/projects-management/:path*",
    "/settings/:path*",
    "/api/admin/:path*",
    "/cg-login",
  ],
};
