/**
 * Paystack server-side helpers.
 * The secret key is NEVER exposed to the frontend.
 */

const PAYSTACK_BASE_URL = "https://api.paystack.co";

function getPaystackSecretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;

  if (!key) {
    throw new Error(
      "Missing PAYSTACK_SECRET_KEY environment variable. Restart the Next.js server after updating your .env file."
    );
  }

  return key;
}

interface PaystackInitializeParams {
  email: string;
  amount: number; // in kobo
  metadata: Record<string, unknown>;
  callback_url?: string;
}

interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: string; // "success" | "failed" | "abandoned"
    reference: string;
    amount: number;
    currency: string;
    metadata: Record<string, unknown>;
    customer: {
      email: string;
    };
    paid_at: string;
  };
}

/** Initialize a Paystack transaction (server-side) */
export async function initializeTransaction(
  params: PaystackInitializeParams
): Promise<PaystackInitializeResponse> {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getPaystackSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Paystack initialize failed: ${res.status} ${errorBody}`);
  }

  return res.json();
}

/** Verify a Paystack transaction by reference (server-side) */
export async function verifyTransaction(
  reference: string
): Promise<PaystackVerifyResponse> {
  const res = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getPaystackSecretKey()}`,
      },
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Paystack verify failed: ${res.status} ${errorBody}`);
  }

  return res.json();
}

/** Verify Paystack webhook signature (HMAC SHA-512) */
export async function verifyWebhookSignature(
  body: string,
  signature: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getPaystackSecretKey()),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const expectedSignature = Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expectedSignature === signature;
}
