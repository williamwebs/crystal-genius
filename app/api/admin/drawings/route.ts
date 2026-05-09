import { NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../../lib/admin-supabase";
import { getServerSupabaseContext } from "../../../../lib/server-supabase";
import { nairaToKobo } from "../../../../types/database";

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
    .from("drawings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ drawings: data ?? [] });
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
  const price = formData.get("price");
  const area = formData.get("area");
  const floors = formData.get("floors");
  const buildingType = formData.get("buildingType");
  const status = formData.get("status");
  const description = formData.get("description");

  if (
    typeof title !== "string" ||
    typeof price !== "string" ||
    typeof area !== "string" ||
    typeof floors !== "string" ||
    typeof buildingType !== "string" ||
    typeof status !== "string" ||
    typeof description !== "string"
  ) {
    return NextResponse.json(
      { error: "Missing required drawing fields." },
      { status: 400 }
    );
  }

  const previewFiles = formData
    .getAll("previewFiles")
    .filter((file): file is File => file instanceof File && file.size > 0);
  const fullFiles = formData
    .getAll("fullFiles")
    .filter((file): file is File => file instanceof File && file.size > 0);
  const uploadedPreviewPaths: string[] = [];
  const uploadedFullPaths: string[] = [];

  try {
    const previewUrls: string[] = [];

    for (const file of previewFiles) {
      const filePath = `public/${createFileName(file)}`;
      const { error: uploadError } = await supabase.storage
        .from("drawing-previews")
        .upload(filePath, file, {
          contentType: file.type || undefined,
        });

      if (uploadError) {
        throw new Error(
          `Failed to upload preview image to storage: ${uploadError.message}`
        );
      }

      uploadedPreviewPaths.push(filePath);

      const {
        data: { publicUrl },
      } = supabase.storage.from("drawing-previews").getPublicUrl(filePath);

      previewUrls.push(publicUrl);
    }

    for (const file of fullFiles) {
      const filePath = `private/${createFileName(file)}`;
      const { error: uploadError } = await supabase.storage
        .from("drawing-files")
        .upload(filePath, file, {
          contentType: file.type || undefined,
        });

      if (uploadError) {
        throw new Error(
          `Failed to upload full drawing file to storage: ${uploadError.message}`
        );
      }

      uploadedFullPaths.push(filePath);
    }

    const { error: insertError } = await supabase.from("drawings").insert({
      title,
      price: nairaToKobo(Number(price)),
      area,
      number_of_floors: Number(floors),
      type: buildingType,
      status,
      description,
      preview_images: previewUrls,
      full_file_paths: uploadedFullPaths,
    });

    if (insertError) {
      throw new Error(`Failed to insert drawing row: ${insertError.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    await Promise.allSettled([
      uploadedPreviewPaths.length
        ? supabase.storage.from("drawing-previews").remove(uploadedPreviewPaths)
        : Promise.resolve({ error: null }),
      uploadedFullPaths.length
        ? supabase.storage.from("drawing-files").remove(uploadedFullPaths)
        : Promise.resolve({ error: null }),
    ]);

    const message =
      error instanceof Error ? error.message : "Failed to create drawing.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
