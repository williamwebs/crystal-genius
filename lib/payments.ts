import { createAdminSupabaseClient } from "./admin-supabase";
import { createDownloadToken } from "./download";
import { sendDrawingPurchaseEmail } from "./mailer";
import { verifyTransaction } from "./paystack";
import { resolveSiteUrl } from "./site-url";
import { koboToNaira } from "../types/database";

const DOWNLOAD_WINDOW_MS = 24 * 60 * 60 * 1000;

type ExistingOrder = {
  id: string;
  status: string;
  asset_status: string;
  download_token: string | null;
  download_expires_at: string | null;
};

export type FulfillPaystackPaymentResult = {
  status: "fulfilled" | "already_fulfilled";
  orderId: string;
  reference: string;
  drawingTitle: string;
  buyerEmail: string;
  downloadUrl: string;
};

function getStringMetadata(
  metadata: Record<string, unknown>,
  key: string,
  fallback = ""
) {
  const value = metadata[key];
  return typeof value === "string" ? value.trim() : fallback;
}

function buildDownloadUrl(
  orderId: string,
  downloadToken: string,
  origin?: string | null
) {
  const baseUrl = resolveSiteUrl(origin);
  return `${baseUrl}/api/download?token=${downloadToken}&order_id=${orderId}`;
}

async function createOrUpdateOrder(reference: string) {
  const verification = await verifyTransaction(reference);

  if (!verification.status || verification.data.status !== "success") {
    throw new Error("Payment verification failed");
  }

  const supabase = createAdminSupabaseClient();
  const metadata = verification.data.metadata ?? {};
  const drawingId = getStringMetadata(metadata, "drawing_id");
  const buyerName = getStringMetadata(metadata, "buyer_name") || "Customer";
  const buyerEmail =
    getStringMetadata(metadata, "buyer_email") ||
    verification.data.customer.email;

  if (!drawingId || !buyerEmail) {
    throw new Error("Missing drawing_id or buyer_email in Paystack metadata");
  }

  const { data: drawing, error: drawingError } = await supabase
    .from("drawings")
    .select("id, title, full_file_paths")
    .eq("id", drawingId)
    .single();

  if (drawingError || !drawing) {
    throw new Error("Purchased drawing was not found");
  }

  if (!drawing.full_file_paths?.length) {
    throw new Error("Purchased drawing has no downloadable files");
  }

  const { data: existingOrder, error: existingOrderError } = await supabase
    .from("orders")
    .select("id, status, asset_status, download_token, download_expires_at")
    .eq("paystack_reference", reference)
    .maybeSingle<ExistingOrder>();

  if (existingOrderError) {
    throw existingOrderError;
  }

  const expiresAt = new Date(Date.now() + DOWNLOAD_WINDOW_MS).toISOString();

  if (existingOrder) {
    return {
      supabase,
      order: existingOrder,
      isNewOrder: false,
      buyerName,
      buyerEmail,
      drawingId: drawing.id,
      drawingTitle: drawing.title,
      amount: verification.data.amount,
      expiresAt,
    };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      amount: verification.data.amount,
      status: "approved",
      asset_status: "pending",
      drawing_id: drawing.id,
      drawing_title: drawing.title,
      paystack_reference: reference,
      download_expires_at: expiresAt,
    })
    .select("id, status, asset_status, download_token, download_expires_at")
    .single<ExistingOrder>();

  if (orderError || !order) {
    throw new Error(orderError?.message || "Failed to create order");
  }

  return {
    supabase,
    order,
    isNewOrder: true,
    buyerName,
    buyerEmail,
    drawingId: drawing.id,
    drawingTitle: drawing.title,
    amount: verification.data.amount,
    expiresAt,
  };
}

export async function fulfillSuccessfulPaystackPayment(
  reference: string,
  origin?: string | null
): Promise<FulfillPaystackPaymentResult> {
  const {
    supabase,
    order,
    isNewOrder,
    buyerName,
    buyerEmail,
    drawingTitle,
    amount,
    expiresAt,
  } = await createOrUpdateOrder(reference);

  const orderUpdates: Record<string, string> = {};
  let downloadToken = order.download_token;

  if (!downloadToken) {
    downloadToken = await createDownloadToken(order.id);
    orderUpdates.download_token = downloadToken;
  }

  if (!order.download_expires_at) {
    orderUpdates.download_expires_at = expiresAt;
  }

  if (order.status !== "approved") {
    orderUpdates.status = "approved";
  }

  const downloadUrl = buildDownloadUrl(order.id, downloadToken, origin);
  const alreadyFulfilled = order.asset_status === "sent";

  if (!alreadyFulfilled) {
    await sendDrawingPurchaseEmail({
      buyerEmail,
      buyerName,
      drawingTitle,
      amountKobo: amount,
      reference,
      downloadUrl,
    });

    orderUpdates.asset_status = "sent";
  }

  if (Object.keys(orderUpdates).length > 0) {
    const { error: updateError } = await supabase
      .from("orders")
      .update(orderUpdates)
      .eq("id", order.id);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }

  if (isNewOrder) {
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        title: `New order for ${drawingTitle}`,
        description: `${buyerName} (${buyerEmail}) purchased "${drawingTitle}" for ${koboToNaira(amount)}`,
        type: "order",
        is_read: false,
        reference_id: order.id,
        reference_type: "orders",
      });

    if (notificationError) {
      console.error("Failed to create order notification:", notificationError);
    }
  }

  return {
    status: alreadyFulfilled ? "already_fulfilled" : "fulfilled",
    orderId: order.id,
    reference,
    drawingTitle,
    buyerEmail,
    downloadUrl,
  };
}
