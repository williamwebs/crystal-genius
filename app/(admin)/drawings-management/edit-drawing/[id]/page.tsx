"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import DrawingForm, {
  DrawingFormData,
  DrawingFormSubmission,
} from "../../../../../components/admin/DrawingForm";
import { Drawing } from "../../../../../types/database";
import toast from "react-hot-toast";

function toFormData(drawing: Drawing): DrawingFormData {
  return {
    title: drawing.title,
    price: String(drawing.price / 100),
    area: drawing.area ?? "",
    floors: drawing.number_of_floors ? String(drawing.number_of_floors) : "",
    buildingType: drawing.type,
    status: drawing.status,
    description: drawing.description ?? "",
  };
}

const EditDrawing = () => {
  const router = useRouter();
  const params = useParams();
  const drawingId = params.id as string;
  const [drawing, setDrawing] = useState<Drawing | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialFormData = useMemo(
    () => (drawing ? toFormData(drawing) : undefined),
    [drawing]
  );
  const initialAssets = useMemo(
    () => ({
      previewImages: drawing?.preview_images ?? [],
      fullFiles: drawing?.full_file_paths ?? [],
    }),
    [drawing]
  );

  useEffect(() => {
    const fetchDrawing = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/drawings/${drawingId}`, {
          method: "GET",
          cache: "no-store",
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to load drawing");
        }

        setDrawing(result.drawing as Drawing);
      } catch (error) {
        console.error("Error loading drawing:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to load drawing"
        );
        setDrawing(null);
      } finally {
        setLoading(false);
      }
    };

    if (drawingId) {
      void fetchDrawing();
    }
  }, [drawingId]);

  const handleSubmit = async ({
    data,
    existingPreviewImages,
    existingFullFiles,
    newPreviewFiles,
    newFullFiles,
  }: DrawingFormSubmission) => {
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.set("title", data.title);
      payload.set("price", data.price);
      payload.set("area", data.area);
      payload.set("floors", data.floors);
      payload.set("buildingType", data.buildingType);
      payload.set("status", data.status);
      payload.set("description", data.description);

      existingPreviewImages.forEach((url) => {
        payload.append("existingPreviewImages", url);
      });
      existingFullFiles.forEach((path) => {
        payload.append("existingFullFiles", path);
      });
      newPreviewFiles.forEach((file) => {
        payload.append("previewFiles", file);
      });
      newFullFiles.forEach((file) => {
        payload.append("fullFiles", file);
      });

      const response = await fetch(`/api/admin/drawings/${drawingId}`, {
        method: "PATCH",
        body: payload,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update drawing");
      }

      toast.success("Drawing updated successfully");
      router.push("/drawings-management");
    } catch (error) {
      console.error("Error updating drawing:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update drawing"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="font-nunito font-medium flex items-center justify-center min-h-[500px]">
        <p className="text-D6D6D6">Loading drawing...</p>
      </div>
    );
  }

  if (!drawing) {
    return (
      <div className="font-nunito font-medium flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-1">
          <p className="text-D6D6D6">Drawing not found</p>
        <button
          onClick={() => router.back()}
          className="w-[100px] h-10 flex items-center justify-center bg-red text-white rounded-[4px] hover:bg-red/80 transition-colors text-sm"
        >
          Go Back
        </button>
        </div>
      </div>
    );
  }

  return (
    <DrawingForm
      heading="Edit Drawing"
      submitLabel="Update Drawing"
      initialData={initialFormData}
      initialAssets={initialAssets}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default EditDrawing;
