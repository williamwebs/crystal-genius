import { NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../../lib/admin-supabase";
import { getServerSupabaseContext } from "../../../../lib/server-supabase";

export async function GET() {
  const { user, supabase: scopedSupabase } = await getServerSupabaseContext();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = hasAdminSupabaseAccess()
    ? createAdminSupabaseClient()
    : scopedSupabase;

  const [{ data: notifications, error: notificationsError }, { count, error: countError }] =
    await Promise.all([
      supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false),
    ]);

  if (notificationsError || countError) {
    return NextResponse.json(
      { error: notificationsError?.message || countError?.message || "Failed to load notifications." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    notifications: notifications ?? [],
    unreadCount: count ?? 0,
  });
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
  const markAllRead = body?.mark_all_read;

  if (markAllRead === true) {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("is_read", false);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  }

  if (typeof id !== "string") {
    return NextResponse.json(
      { error: "Invalid notification update payload." },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
