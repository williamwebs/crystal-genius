import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "../../../../lib/server-supabase";
import { initializeTransaction } from "../../../../lib/paystack";
import { resolveSiteUrl } from "../../../../lib/site-url";

/**
 * POST /api/paystack/initialize
 *
 * Body: { drawing_id: string, buyer_name: string, buyer_email: string }
 *
 * Fetches the drawing price from DB, then calls Paystack to create
 * a transaction. Returns the authorization_url for the frontend popup.
 */
export async function POST(req: NextRequest) {
  try {
    const { drawing_id, buyer_name, buyer_email } = await req.json();

    if (!drawing_id || !buyer_name || !buyer_email) {
      return NextResponse.json(
        { error: "drawing_id, buyer_name, and buyer_email are required" },
        { status: 400 }
      );
    }

    // Fetch drawing to get the price
    const supabase = await createServerSupabaseClient();
    const { data: drawing, error: dbError } = await supabase
      .from("drawings")
      .select("id, title, price")
      .eq("id", drawing_id)
      .single();

    if (dbError || !drawing) {
      return NextResponse.json(
        { error: "Drawing not found" },
        { status: 404 }
      );
    }

    // Initialize Paystack transaction (amount is already in kobo)
    const callbackUrl = new URL(
      "/payment/verify",
      resolveSiteUrl(req.nextUrl.origin)
    );
    callbackUrl.searchParams.set("drawing_id", drawing.id);

    const paystackRes = await initializeTransaction({
      email: buyer_email,
      amount: drawing.price,
      callback_url: callbackUrl.toString(),
      metadata: {
        drawing_id: drawing.id,
        drawing_title: drawing.title,
        buyer_name,
        buyer_email,
      },
    });

    if (!paystackRes.status) {
      return NextResponse.json(
        { error: paystackRes.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      authorization_url: paystackRes.data.authorization_url,
      reference: paystackRes.data.reference,
      access_code: paystackRes.data.access_code,
    });
  } catch (error) {
    console.error("Paystack initialize error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to initialize payment",
      },
      { status: 500 }
    );
  }
}
