"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import ProjectForm, {
  ProjectFormData,
  ProjectFormSubmission,
} from "../../../../../components/admin/ProjectForm";
import { Project } from "../../../../../types/database";
import toast from "react-hot-toast";

function toFormData(project: Project): ProjectFormData {
  return {
    title: project.title,
    location: project.location ?? "",
    area: project.area ?? "",
    year: project.completion_year ? String(project.completion_year) : "",
    category: project.category ?? "residential",
    status: project.status,
    description: project.description ?? "",
  };
}

const EditProject = () => {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialFormData = useMemo(
    () => (project ? toFormData(project) : undefined),
    [project]
  );
  const initialAssets = useMemo(
    () => ({
      images: project?.images ?? [],
    }),
    [project]
  );

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/projects/${projectId}`, {
          method: "GET",
          cache: "no-store",
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to load project");
        }

        setProject(result.project as Project);
      } catch (error) {
        console.error("Error loading project:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to load project"
        );
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      void fetchProject();
    }
  }, [projectId]);

  const handleSubmit = async ({
    data,
    existingImages,
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

      existingImages.forEach((image) => {
        payload.append("existingImages", image);
      });
      newImageFiles.forEach((file) => {
        payload.append("imageFiles", file);
      });

      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: "PATCH",
        body: payload,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update project");
      }

      toast.success("Project updated successfully");
      router.push("/projects-management");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update project"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="font-nunito font-medium flex items-center justify-center min-h-[500px]">
        <p className="text-D6D6D6">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="font-nunito font-medium flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-1">
          <p className="text-D6D6D6">Project not found</p>
          <button
            onClick={() => router.back()}
            className="w-[100px] h-10 flex items-center justify-center bg-red text-white rounded-[4px] hover:bg-red/80 transition-colors text-sm mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProjectForm
      heading="Edit Project"
      submitLabel="Update Project"
      initialData={initialFormData}
      initialAssets={initialAssets}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default EditProject;
