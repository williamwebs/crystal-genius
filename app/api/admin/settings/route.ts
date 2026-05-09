import { NextResponse } from "next/server";
import { getServerSupabaseContext } from "../../../../lib/server-supabase";

export async function POST(req: Request) {
  const { user, supabase } = await getServerSupabaseContext();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const emailOnNewOrder = body?.email_on_new_order;
  const emailOnContactMessage = body?.email_on_contact_message;

  if (
    typeof emailOnNewOrder !== "boolean" ||
    typeof emailOnContactMessage !== "boolean"
  ) {
    return NextResponse.json(
      { error: "Invalid settings payload." },
      { status: 400 }
    );
  }
  const { data: existingSettings, error: fetchError } = await supabase
    .from("admin_settings")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 400 });
  }

  const payload = {
    user_id: user.id,
    email_on_new_order: emailOnNewOrder,
    email_on_contact_message: emailOnContactMessage,
  };

  const settingsQuery = existingSettings
    ? supabase.from("admin_settings").update(payload).eq("id", existingSettings.id)
    : supabase.from("admin_settings").insert(payload);

  const { error: saveError } = await settingsQuery;

  if (saveError) {
    return NextResponse.json({ error: saveError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
