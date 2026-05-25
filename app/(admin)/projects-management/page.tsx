"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PlusIcon } from "../../../constants/images";
import { useRouter } from "next/navigation";
import { AdminThumbSlider } from "../../../components/admin/AdminThumbSlider";
import { Project, ProjectCategory } from "../../../types/database";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import AdminPagination from "../../../components/admin/AdminPagination";
import { Pencil, Trash2, Tag, Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 10;
const FALLBACK_PROJECT_IMAGE = "/images/no-property.png";

const ProjectsManagement = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Categories dialog state
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isDeletingCategory, setIsDeletingCategory] = useState<string | null>(
    null
  );

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

  // --- Categories logic ---

  const fetchCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch("/api/admin/categories", {
        method: "GET",
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch categories");
      }

      setCategories((result.categories ?? []) as ProjectCategory[]);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch categories"
      );
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const handleOpenCategories = () => {
    setCategoriesOpen(true);
    void fetchCategories();
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    setIsAddingCategory(true);
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add category");
      }

      toast.success("Category added successfully");
      setNewCategoryName("");
      setShowAddCategory(false);
      void fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add category"
      );
    } finally {
      setIsAddingCategory(false);
    }
  };

  const handleEditCategory = async (id: string) => {
    if (!editCategoryName.trim()) return;

    setIsEditingCategory(true);
    try {
      const response = await fetch("/api/admin/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: editCategoryName.trim() }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update category");
      }

      toast.success("Category updated successfully");
      setEditingCategory(null);
      setEditCategoryName("");
      void fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update category"
      );
    } finally {
      setIsEditingCategory(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setIsDeletingCategory(id);
    try {
      const response = await fetch(`/api/admin/categories?id=${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete category");
      }

      toast.success("Category deleted successfully");
      void fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete category"
      );
    } finally {
      setIsDeletingCategory(null);
    }
  };

  const startEditCategory = (category: ProjectCategory) => {
    setEditingCategory(category.id);
    setEditCategoryName(category.name);
  };

  const cancelEditCategory = () => {
    setEditingCategory(null);
    setEditCategoryName("");
  };

  return (
    <div className="space-y-8 pb-20 mt-4 relative">
      <div className="flex justify-end gap-3">
        <button
          onClick={handleOpenCategories}
          className="h-[38px] flex items-center justify-center gap-1.5 bg-[#555555] hover:bg-[#666666] text-white text-[13px] rounded-[6px] font-medium font-nunito transition-colors px-4 border border-D6D6D6/20"
        >
          <Tag className="h-4 w-4" />
          Categories
        </button>
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

      {/* Delete Project Dialog */}
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

      {/* Categories Dialog */}
      <Dialog
        open={categoriesOpen}
        onOpenChange={(open) => {
          if (!open) {
            setCategoriesOpen(false);
            setShowAddCategory(false);
            setNewCategoryName("");
            setEditingCategory(null);
            setEditCategoryName("");
          }
        }}
      >
        <DialogContent className="border-white/10 bg-[#2f2f2f] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Project Categories</DialogTitle>
            <DialogDescription className="text-D6D6D6">
              Manage your project categories. Categories are used to organize
              projects.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            {loadingCategories ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-5 w-5 animate-spin text-D6D6D6" />
                <span className="ml-2 text-sm text-D6D6D6">
                  Loading categories...
                </span>
              </div>
            ) : categories.length === 0 ? (
              <div className="rounded-[6px] border border-D6D6D6/20 bg-dark/30 px-4 py-6 text-center text-sm text-D6D6D6">
                No categories found. Add your first category below.
              </div>
            ) : (
              <div className="max-h-[280px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-[6px] border border-D6D6D6/15 bg-dark/40 px-3 py-2.5 group hover:border-D6D6D6/30 transition-colors"
                  >
                    {editingCategory === category.id ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              void handleEditCategory(category.id);
                            }
                            if (e.key === "Escape") {
                              cancelEditCategory();
                            }
                          }}
                          className="flex-1 h-8 bg-dark/60 border border-D6D6D6/30 rounded-[4px] px-2.5 text-sm text-white focus:outline-none focus:border-red transition-colors"
                          autoFocus
                          disabled={isEditingCategory}
                        />
                        <button
                          type="button"
                          onClick={() => void handleEditCategory(category.id)}
                          disabled={
                            isEditingCategory || !editCategoryName.trim()
                          }
                          className="h-8 rounded-[4px] bg-red px-3 text-xs text-white transition-colors hover:bg-red/80 disabled:opacity-50"
                        >
                          {isEditingCategory ? "Saving..." : "Save"}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditCategory}
                          disabled={isEditingCategory}
                          className="h-8 rounded-[4px] border border-D6D6D6/30 px-3 text-xs text-white transition-colors hover:bg-dark disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm text-white font-medium">
                          {category.name}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => startEditCategory(category)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] text-D6D6D6 hover:bg-white/10 hover:text-white transition-colors"
                            title="Edit category"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              void handleDeleteCategory(category.id)
                            }
                            disabled={isDeletingCategory === category.id}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] text-D6D6D6 hover:bg-red/20 hover:text-red transition-colors disabled:opacity-50"
                            title="Delete category"
                          >
                            {isDeletingCategory === category.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add Category Form */}
            {showAddCategory ? (
              <div className="rounded-[6px] border border-D6D6D6/20 bg-dark/40 p-3 space-y-3">
                <label className="text-[13px] text-D6D6D6 block">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      void handleAddCategory();
                    }
                    if (e.key === "Escape") {
                      setShowAddCategory(false);
                      setNewCategoryName("");
                    }
                  }}
                  placeholder="Enter category name"
                  className="w-full h-10 bg-dark/60 border border-D6D6D6/30 rounded-[6px] px-3 text-sm text-white placeholder:text-D6D6D6/50 focus:outline-none focus:border-red transition-colors"
                  autoFocus
                  disabled={isAddingCategory}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategoryName("");
                    }}
                    disabled={isAddingCategory}
                    className="h-9 rounded-[6px] border border-D6D6D6/30 px-4 text-xs text-white transition-colors hover:bg-dark disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleAddCategory()}
                    disabled={isAddingCategory || !newCategoryName.trim()}
                    className="h-9 rounded-[6px] bg-red px-4 text-xs text-white transition-colors hover:bg-red/80 disabled:opacity-50"
                  >
                    {isAddingCategory ? "Adding..." : "Add Category"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddCategory(true)}
                className="w-full h-10 flex items-center justify-center gap-1.5 rounded-[6px] border border-dashed border-D6D6D6/30 text-sm text-D6D6D6 hover:border-D6D6D6/50 hover:text-white hover:bg-dark/30 transition-colors"
              >
                <PlusIcon />
                Add New Category
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsManagement;
