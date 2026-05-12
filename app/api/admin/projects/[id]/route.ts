import { NextRequest, NextResponse } from "next/server";
import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../../../lib/admin-supabase";
import { getServerSupabaseContext } from "../../../../../lib/server-supabase";

function createFileName(file: File) {
  const extension = file.name.split(".").pop() ?? "bin";
  return `${crypto.randomUUID()}.${extension}`;
}

function getProjectImageStoragePath(publicUrl: string) {
  try {
    const { pathname } = new URL(publicUrl);
    const prefix = "/storage/v1/object/public/project-images/";

    if (!pathname.startsWith(prefix)) {
      return null;
    }

    return decodeURIComponent(pathname.slice(prefix.length));
  } catch {
    return null;
  }
}

function uniqueStrings(values: FormDataEntryValue[]) {
  return [
    ...new Set(
      values.filter((value): value is string => typeof value === "string")
    ),
  ];
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
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ project: data });
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
  const { data: existingProject, error: existingError } = await supabase
    .from("projects")
    .select("id, images")
    .eq("id", id)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 400 });
  }

  if (!existingProject) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const formData = await req.formData();
  const title = formData.get("title");
  const location = formData.get("location");
  const area = formData.get("area");
  const year = formData.get("year");
  const category = formData.get("category");
  const type = formData.get("type");
  const description = formData.get("description");

  if (
    typeof title !== "string" ||
    typeof location !== "string" ||
    typeof area !== "string" ||
    typeof year !== "string" ||
    typeof category !== "string" ||
    typeof type !== "string" ||
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
  const existingImages = uniqueStrings(formData.getAll("existingImages"));
  const uploadedImagePaths: string[] = [];

  try {
    const allowedImages = new Set(existingProject.images ?? []);

    if (!existingImages.every((url) => allowedImages.has(url))) {
      throw new Error("One or more project images are invalid.");
    }

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

    const nextImages = [...existingImages, ...imageUrls];

    const { data: updatedProject, error: updateError } = await supabase
      .from("projects")
      .update({
        title,
        location,
        area,
        completion_year: Number(year),
        category: category || null,
        type,
        description,
        images: nextImages,
      })
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (updateError) {
      throw new Error(`Failed to update project row: ${updateError.message}`);
    }

    if (!updatedProject) {
      throw new Error(
        hasAdminSupabaseAccess()
          ? "Project update did not persist."
          : "Project update did not persist. Your Supabase project is still blocking update operations for this admin user."
      );
    }

    const removedImagePaths = (existingProject.images ?? [])
      .filter((url: string) => !existingImages.includes(url))
      .map(getProjectImageStoragePath)
      .filter((path: string | null): path is string => Boolean(path));

    await Promise.allSettled([
      removedImagePaths.length
        ? supabase.storage.from("project-images").remove(removedImagePaths)
        : Promise.resolve({ error: null }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    await Promise.allSettled([
      uploadedImagePaths.length
        ? supabase.storage.from("project-images").remove(uploadedImagePaths)
        : Promise.resolve({ error: null }),
    ]);

    const message =
      error instanceof Error ? error.message : "Failed to update project.";

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
  const { data: existingProject, error: existingError } = await supabase
    .from("projects")
    .select("id, images")
    .eq("id", id)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 400 });
  }

  if (!existingProject) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  const { data: remainingProject, error: remainingError } = await supabase
    .from("projects")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (remainingError) {
    return NextResponse.json({ error: remainingError.message }, { status: 400 });
  }

  if (remainingProject) {
    return NextResponse.json(
      {
        error: hasAdminSupabaseAccess()
          ? "Failed to delete project."
          : "Failed to delete project. Your Supabase project is still blocking delete operations for this admin user.",
      },
      { status: 400 }
    );
  }

  const imagePaths = (existingProject.images ?? [])
    .map(getProjectImageStoragePath)
    .filter((path: string | null): path is string => Boolean(path));

  await Promise.allSettled([
    imagePaths.length
      ? supabase.storage.from("project-images").remove(imagePaths)
      : Promise.resolve({ error: null }),
  ]);

  return NextResponse.json({ success: true });
}
