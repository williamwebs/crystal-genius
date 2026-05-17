/**
 * Download token helpers — sign and verify expiring download tokens.
 * Uses Web Crypto API (works in Edge Runtime and Node).
 */

function getDownloadSecret() {
  const secret = process.env.DOWNLOAD_SECRET;

  if (!secret) {
    throw new Error(
      "Missing DOWNLOAD_SECRET environment variable. Generate a long random string and add it to your environment."
    );
  }

  return secret;
}

/** Create a signed download token for an order */
export async function createDownloadToken(orderId: string): Promise<string> {
  const payload = `${orderId}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getDownloadSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Verify a download token against the order ID */
export async function verifyDownloadToken(
  orderId: string,
  token: string
): Promise<boolean> {
  const expectedToken = await createDownloadToken(orderId);
  return expectedToken === token;
}
