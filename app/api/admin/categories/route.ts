import { NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../../lib/admin-supabase";
import { getServerSupabaseContext } from "../../../../lib/server-supabase";

async function getAuthorizedSupabase() {
  const context = await getServerSupabaseContext();

  if (!context.user) {
    return null;
  }

  return {
    ...context,
    supabase: hasAdminSupabaseAccess()
      ? createAdminSupabaseClient()
      : context.supabase,
  };
}

export async function GET() {
  const context = await getAuthorizedSupabase();

  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { supabase } = context;

  const { data, error } = await supabase
    .from("project_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ categories: data ?? [] });
}

export async function POST(req: Request) {
  const context = await getAuthorizedSupabase();

  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { supabase } = context;

  const body = await req.json();
  const { name } = body;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { error: "Category name is required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("project_categories")
    .insert({ name: name.trim() })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "A category with this name already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ category: data });
}

export async function PATCH(req: Request) {
  const context = await getAuthorizedSupabase();

  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { supabase } = context;

  const body = await req.json();
  const { id, name } = body;

  if (typeof id !== "string" || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { error: "Category ID and name are required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("project_categories")
    .update({ name: name.trim() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "A category with this name already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ category: data });
}

export async function DELETE(req: Request) {
  const context = await getAuthorizedSupabase();

  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { supabase } = context;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Category ID is required." },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("project_categories")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
