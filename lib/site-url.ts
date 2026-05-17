function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function resolveSiteUrl(fallbackOrigin?: string | null) {
  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL || fallbackOrigin || "http://localhost:3000"
  );
}
