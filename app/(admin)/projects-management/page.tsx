"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PlusIcon } from "../../../constants/images";
import { useRouter } from "next/navigation";
import { AdminThumbSlider } from "../../../components/admin/AdminThumbSlider";
import { Project } from "../../../types/database";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import AdminPagination from "../../../components/admin/AdminPagination";

const ITEMS_PER_PAGE = 10;
const FALLBACK_PROJECT_IMAGE = "/images/no-property.png";

const ProjectsManagement = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    void fetchProjects();
  }, []);

  const totalPages = Math.max(1, Math.ceil(projects.length / ITEMS_PER_PAGE));
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, projects]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/projects", {
        method: "GET",
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch projects");
      }

      setProjects((result.projects ?? []) as Project[]);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch projects"
      );
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/projects/${projectToDelete.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete project");
      }

      toast.success("Project deleted successfully");
      setProjects((current) =>
        current.filter((project) => project.id !== projectToDelete.id)
      );
      setProjectToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete project"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 mt-4 relative">
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/projects-management/add-project")}
          className="w-[176px] h-[38px] flex items-center justify-center gap-1 bg-red hover:bg-red/90 text-white text-[13px] rounded-[6px] font-medium font-nunito transition-colors"
        >
          <PlusIcon />
          Add New Project
        </button>
      </div>

      {loading ? (
        <div className="rounded-lg bg-[#555555] px-6 py-20 text-center font-nunito text-white">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-lg bg-[#555555] px-6 py-20 text-center font-nunito text-white">
          No portfolio projects found. Click &quot;Add New Project&quot; to
          create one.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 rounded-lg bg-[#555555] px-3 py-4 font-nunito md:grid-cols-2 lg:grid-cols-3">
            {paginatedProjects.map((project, index) => (
              <AdminThumbSlider
                key={project.id}
                id={(currentPage - 1) * ITEMS_PER_PAGE + index}
                images={
                  project.images?.length
                    ? project.images
                    : [FALLBACK_PROJECT_IMAGE]
                }
                title={project.title}
                location={project.location ?? "Location unavailable"}
                area={project.area ?? undefined}
                onEdit={() =>
                  router.push(
                    `/projects-management/edit-projects/${project.id}`,
                  )
                }
                onDelete={() => setProjectToDelete(project)}
              />
            ))}
          </div>

          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <Dialog
        open={Boolean(projectToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setProjectToDelete(null);
          }
        }}
      >
        <DialogContent className="border-white/10 bg-[#2f2f2f] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription className="text-D6D6D6">
              {projectToDelete
                ? `Are you sure you want to delete "${projectToDelete.title}"? This action cannot be undone.`
                : "Are you sure you want to delete this project?"}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setProjectToDelete(null)}
              disabled={isDeleting}
              className="h-10 rounded-[6px] border border-D6D6D6/30 px-4 text-sm text-white transition-colors hover:bg-dark disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={isDeleting}
              className="h-10 rounded-[6px] bg-red px-4 text-sm text-white transition-colors hover:bg-red/80 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsManagement;
