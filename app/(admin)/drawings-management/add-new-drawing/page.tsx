"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DrawingForm, {
  DrawingFormSubmission,
} from "../../../../components/admin/DrawingForm";
import toast from "react-hot-toast";

const AddNewDrawing = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async ({
    data,
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

      newPreviewFiles.forEach((file) => {
        payload.append("previewFiles", file);
      });
      newFullFiles.forEach((file) => {
        payload.append("fullFiles", file);
      });

      const response = await fetch("/api/admin/drawings", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add drawing");
      }

      toast.success("Drawing added successfully");
      router.push("/drawings-management");
    } catch (error) {
      console.error("Error adding drawing:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add drawing"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DrawingForm
      heading="Add New Drawing"
      submitLabel="Save Drawing"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default AddNewDrawing;
