import { NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../../lib/admin-supabase";
import { getServerSupabaseContext } from "../../../../lib/server-supabase";

function createFileName(file: File) {
  const extension = file.name.split(".").pop() ?? "bin";
  return `${crypto.randomUUID()}.${extension}`;
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
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ projects: data ?? [] });
}

export async function POST(req: Request) {
  const { user, supabase: scopedSupabase } = await getServerSupabaseContext();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = hasAdminSupabaseAccess()
    ? createAdminSupabaseClient()
    : scopedSupabase;

  const formData = await req.formData();
  const title = formData.get("title");
  const location = formData.get("location");
  const area = formData.get("area");
  const year = formData.get("year");
  const category = formData.get("category");
  const status = formData.get("status");
  const description = formData.get("description");

  if (
    typeof title !== "string" ||
    typeof location !== "string" ||
    typeof area !== "string" ||
    typeof year !== "string" ||
    typeof category !== "string" ||
    typeof status !== "string" ||
    typeof description !== "string"
  ) {
    return NextResponse.json(
      { error: "Missing required project fields." },
      { status: 400 }
    );
  }

  const imageFiles = formData
    .getAll("imageFiles")
    .filter((file): file is File => file instanceof File && file.size > 0);

  const uploadedImagePaths: string[] = [];

  try {
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      const filePath = `public/${createFileName(file)}`;
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file, {
          contentType: file.type || undefined,
        });

      if (uploadError) {
        throw new Error(
          `Failed to upload project image to storage: ${uploadError.message}`
        );
      }

      uploadedImagePaths.push(filePath);

      const {
        data: { publicUrl },
      } = supabase.storage.from("project-images").getPublicUrl(filePath);

      imageUrls.push(publicUrl);
    }

    const { error: insertError } = await supabase.from("projects").insert({
      title,
      location,
      area,
      completion_year: Number(year),
      category,
      status,
      description,
      images: imageUrls,
    });

    if (insertError) {
      throw new Error(`Failed to insert project row: ${insertError.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    await Promise.allSettled([
      uploadedImagePaths.length
        ? supabase.storage.from("project-images").remove(uploadedImagePaths)
        : Promise.resolve({ error: null }),
    ]);

    const message =
      error instanceof Error ? error.message : "Failed to create project.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
