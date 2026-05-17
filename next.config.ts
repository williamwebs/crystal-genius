import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const remotePatterns: RemotePattern[] = [
  ...(supabaseHost
    ? [
        {
          protocol: "https",
          hostname: supabaseHost,
          pathname: "/storage/v1/object/public/**",
        } satisfies RemotePattern,
      ]
    : []),
  {
    protocol: "https",
    hostname: "cdn.sanity.io",
    pathname: "/**",
  } satisfies RemotePattern,
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
