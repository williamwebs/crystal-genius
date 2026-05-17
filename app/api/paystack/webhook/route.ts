import { NextRequest, NextResponse } from "next/server";
import { fulfillSuccessfulPaystackPayment } from "../../../../lib/payments";
import { verifyWebhookSignature } from "../../../../lib/paystack";

/**
 * POST /api/paystack/webhook
 *
 * Called by Paystack when a payment event occurs.
 * - Verifies the HMAC SHA-512 signature
 * - Only processes `charge.success` events
 * - Finalizes the order idempotently and emails the buyer
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature") ?? "";

    const isValid = await verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error("Webhook signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    if (event.event !== "charge.success") {
      return NextResponse.json({ received: true });
    }

    const reference = event.data?.reference;
    if (!reference) {
      return NextResponse.json(
        { error: "Missing Paystack reference" },
        { status: 400 }
      );
    }

    const result = await fulfillSuccessfulPaystackPayment(reference);

    return NextResponse.json({ received: true, order_id: result.orderId });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal processing error" },
      { status: 500 }
    );
  }
}
