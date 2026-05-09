import { NextRequest, NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../../../lib/admin-supabase";
import { getServerSupabaseContext } from "../../../../../lib/server-supabase";
import { nairaToKobo } from "../../../../../types/database";

function createFileName(file: File) {
  const extension = file.name.split(".").pop() ?? "bin";
  return `${crypto.randomUUID()}.${extension}`;
}

function getPreviewStoragePath(publicUrl: string) {
  try {
    const { pathname } = new URL(publicUrl);
    const prefix = "/storage/v1/object/public/drawing-previews/";

    if (!pathname.startsWith(prefix)) {
      return null;
    }

    return decodeURIComponent(pathname.slice(prefix.length));
  } catch {
    return null;
  }
}

function uniqueStrings(values: FormDataEntryValue[]) {
  return [...new Set(values.filter((value): value is string => typeof value === "string"))];
}

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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const context = await getAuthorizedSupabase();

  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { supabase } = context;

  const { id } = await params;
  const { data, error } = await supabase
    .from("drawings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: "Drawing not found" }, { status: 404 });
  }

  return NextResponse.json({ drawing: data });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const context = await getAuthorizedSupabase();

  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { supabase } = context;

  const { id } = await params;
  const { data: existingDrawing, error: existingError } = await supabase
    .from("drawings")
    .select("id, preview_images, full_file_paths")
    .eq("id", id)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 400 });
  }

  if (!existingDrawing) {
    return NextResponse.json({ error: "Drawing not found" }, { status: 404 });
  }

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
  const existingPreviewImages = uniqueStrings(
    formData.getAll("existingPreviewImages")
  );
  const existingFullFiles = uniqueStrings(formData.getAll("existingFullFiles"));

  const uploadedPreviewPaths: string[] = [];
  const uploadedFullPaths: string[] = [];

  try {
    const allowedPreviewImages = new Set(existingDrawing.preview_images ?? []);
    const allowedFullFiles = new Set(existingDrawing.full_file_paths ?? []);

    if (!existingPreviewImages.every((url) => allowedPreviewImages.has(url))) {
      throw new Error("One or more preview images are invalid.");
    }

    if (!existingFullFiles.every((path) => allowedFullFiles.has(path))) {
      throw new Error("One or more drawing files are invalid.");
    }

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

    const nextPreviewImages = [...existingPreviewImages, ...previewUrls];
    const nextFullFilePaths = [...existingFullFiles, ...uploadedFullPaths];

    const { data: updatedDrawing, error: updateError } = await supabase
      .from("drawings")
      .update({
        title,
        price: nairaToKobo(Number(price)),
        area,
        number_of_floors: Number(floors),
        type: buildingType,
        status,
        description,
        preview_images: nextPreviewImages,
        full_file_paths: nextFullFilePaths,
      })
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (updateError) {
      throw new Error(`Failed to update drawing row: ${updateError.message}`);
    }

    if (!updatedDrawing) {
      throw new Error(
        hasAdminSupabaseAccess()
          ? "Drawing update did not persist."
          : "Drawing update did not persist. Your Supabase project is still blocking update operations for this admin user. Apply the SQL policies in database/admin-auth-policies.sql or add SUPABASE_SERVICE_ROLE_KEY to your environment."
      );
    }

    const removedPreviewPaths = (existingDrawing.preview_images ?? [])
      .filter((url: string) => !existingPreviewImages.includes(url))
      .map(getPreviewStoragePath)
      .filter((path: string | null): path is string => Boolean(path));
    const removedFullPaths = (existingDrawing.full_file_paths ?? []).filter(
      (path: string) => !existingFullFiles.includes(path)
    );

    await Promise.allSettled([
      removedPreviewPaths.length
        ? supabase.storage.from("drawing-previews").remove(removedPreviewPaths)
        : Promise.resolve({ error: null }),
      removedFullPaths.length
        ? supabase.storage.from("drawing-files").remove(removedFullPaths)
        : Promise.resolve({ error: null }),
    ]);

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
      error instanceof Error ? error.message : "Failed to update drawing.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const context = await getAuthorizedSupabase();

  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { supabase } = context;

  const { id } = await params;
  const { data: existingDrawing, error: existingError } = await supabase
    .from("drawings")
    .select("id, preview_images, full_file_paths")
    .eq("id", id)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 400 });
  }

  if (!existingDrawing) {
    return NextResponse.json({ error: "Drawing not found" }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from("drawings")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  const { data: remainingDrawing, error: remainingError } = await supabase
    .from("drawings")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (remainingError) {
    return NextResponse.json({ error: remainingError.message }, { status: 400 });
  }

  if (remainingDrawing) {
    return NextResponse.json(
      {
        error: hasAdminSupabaseAccess()
          ? "Failed to delete drawing."
          : "Failed to delete drawing. Your Supabase project is still blocking delete operations for this admin user. Apply the SQL policies in database/admin-auth-policies.sql or add SUPABASE_SERVICE_ROLE_KEY to your environment.",
      },
      { status: 400 }
    );
  }

  const previewPaths = (existingDrawing.preview_images ?? [])
    .map(getPreviewStoragePath)
    .filter((path: string | null): path is string => Boolean(path));
  const fullPaths = existingDrawing.full_file_paths ?? [];

  await Promise.allSettled([
    previewPaths.length
      ? supabase.storage.from("drawing-previews").remove(previewPaths)
      : Promise.resolve({ error: null }),
    fullPaths.length
      ? supabase.storage.from("drawing-files").remove(fullPaths)
      : Promise.resolve({ error: null }),
  ]);

  return NextResponse.json({ success: true });
}
