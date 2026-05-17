export const ACCESS_TOKEN_COOKIE = "sb-access-token";
export const REFRESH_TOKEN_COOKIE = "sb-refresh-token";

const ACCESS_TOKEN_FALLBACK_MAX_AGE = 60 * 60;
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30;

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function getAccessTokenMaxAge(expiresAt?: number | null) {
  if (!expiresAt) {
    return ACCESS_TOKEN_FALLBACK_MAX_AGE;
  }

  const secondsUntilExpiry = expiresAt - Math.floor(Date.now() / 1000);
  return Math.max(secondsUntilExpiry, 0);
}

export function getAccessTokenCookieOptions(expiresAt?: number | null) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProduction(),
    path: "/",
    maxAge: getAccessTokenMaxAge(expiresAt),
  };
}

export function getRefreshTokenCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProduction(),
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  };
}
