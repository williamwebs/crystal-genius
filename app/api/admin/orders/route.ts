import { NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../../lib/admin-supabase";
import { getServerSupabaseContext } from "../../../../lib/server-supabase";

function isValidStatus(status: unknown): status is "pending" | "approved" | "declined" {
  return status === "pending" || status === "approved" || status === "declined";
}

export async function GET() {
  const { user, supabase: scopedSupabase } = await getServerSupabaseContext();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = hasAdminSupabaseAccess()
    ? createAdminSupabaseClient()
    : scopedSupabase;

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      drawing:drawings (
        preview_images
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ orders: data ?? [] });
}

export async function PATCH(req: Request) {
  const { user, supabase: scopedSupabase } = await getServerSupabaseContext();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = hasAdminSupabaseAccess()
    ? createAdminSupabaseClient()
    : scopedSupabase;

  const body = await req.json();
  const id = body?.id;
  const status = body?.status;

  if (typeof id !== "string" || !isValidStatus(status)) {
    return NextResponse.json(
      { error: "Invalid order update payload." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select(`
      *,
      drawing:drawings (
        preview_images
      )
    `)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Failed to update order." },
      { status: 400 }
    );
  }

  return NextResponse.json({ order: data });
}
