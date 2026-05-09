import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "../../../lib/admin-supabase";
import { verifyDownloadToken } from "../../../lib/download";

/**
 * GET /api/download?token=xxx&order_id=xxx
 *
 * Validates the signed download token and expiry, then streams
 * the file from Supabase private storage to the buyer.
 * The real storage URL is never exposed.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const orderId = searchParams.get("order_id");

    if (!token || !orderId) {
      return NextResponse.json(
        { error: "Missing token or order_id" },
        { status: 400 }
      );
    }

    // 1. Verify the token
    const isValid = await verifyDownloadToken(orderId, token);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid download token" },
        { status: 403 }
      );
    }

    // 2. Fetch the order to check expiry and get drawing info
    const supabase = createAdminSupabaseClient();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, download_expires_at, drawing_id, drawing_title, asset_status")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // 3. Check expiry
    if (order.download_expires_at && new Date(order.download_expires_at) < new Date()) {
      return NextResponse.json(
        { error: "Download link has expired. Please contact support." },
        { status: 410 }
      );
    }

    // 4. Fetch the drawing's full file paths
    const { data: drawing, error: drawingError } = await supabase
      .from("drawings")
      .select("full_file_paths, title")
      .eq("id", order.drawing_id)
      .single();

    if (drawingError || !drawing || !drawing.full_file_paths?.length) {
      return NextResponse.json(
        { error: "Drawing files not found" },
        { status: 404 }
      );
    }

    // 5. Create a short-lived signed URL from the private bucket (60 seconds)
    const filePath = drawing.full_file_paths[0]; // Primary file
    const { data: signedUrlData, error: signError } = await supabase.storage
      .from("drawing-files")
      .createSignedUrl(filePath, 60); // 60 seconds

    if (signError || !signedUrlData?.signedUrl) {
      console.error("Failed to create signed URL:", signError);
      return NextResponse.json(
        { error: "Failed to generate download" },
        { status: 500 }
      );
    }

    // 6. Fetch the file and stream it to the client
    const fileResponse = await fetch(signedUrlData.signedUrl);
    if (!fileResponse.ok) {
      return NextResponse.json(
        { error: "Failed to retrieve file" },
        { status: 500 }
      );
    }

    const fileBuffer = await fileResponse.arrayBuffer();
    const fileName = filePath.split("/").pop() || `${drawing.title || "design"}.pdf`;

    const { error: downloadCountError } = await supabase.rpc("increment_download_count", {
      drawing_id: order.drawing_id,
    });

    if (downloadCountError) {
      console.error("Failed to increment download count:", downloadCountError);
    }

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": fileResponse.headers.get("content-type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}
