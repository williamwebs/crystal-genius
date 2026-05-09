"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ProjectForm, {
  ProjectFormSubmission,
} from "../../../../components/admin/ProjectForm";
import toast from "react-hot-toast";

const AddNewProject = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async ({
    data,
    newImageFiles,
  }: ProjectFormSubmission) => {
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.set("title", data.title);
      payload.set("location", data.location);
      payload.set("area", data.area);
      payload.set("year", data.year);
      payload.set("category", data.category);
      payload.set("status", data.status);
      payload.set("description", data.description);

      newImageFiles.forEach((file) => {
        payload.append("imageFiles", file);
      });

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create project");
      }

      toast.success("Project added successfully");
      router.push("/projects-management");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create project"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProjectForm
      heading="Add New Project"
      submitLabel="Save Project"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default AddNewProject;
