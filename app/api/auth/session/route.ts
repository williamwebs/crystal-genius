import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from "../../../../lib/auth-cookies";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const accessToken =
    typeof body?.access_token === "string" ? body.access_token : null;
  const refreshToken =
    typeof body?.refresh_token === "string" ? body.refresh_token : null;
  const expiresAt =
    typeof body?.expires_at === "number" ? body.expires_at : null;

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { error: "Missing auth session tokens." },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    accessToken,
    getAccessTokenCookieOptions(expiresAt)
  );
  response.cookies.set(
    REFRESH_TOKEN_COOKIE,
    refreshToken,
    getRefreshTokenCookieOptions()
  );

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    ...getAccessTokenCookieOptions(0),
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    ...getRefreshTokenCookieOptions(),
    maxAge: 0,
  });

  return response;
}
