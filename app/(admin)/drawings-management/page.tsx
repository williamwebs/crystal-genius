"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { EditIcon, PlusIcon, TrashIcon } from "../../../constants/images";
import { useRouter } from "next/navigation";
import { Drawing, koboToNaira } from "../../../types/database";
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

const DrawingsManagement = () => {
  const router = useRouter();
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawingToDelete, setDrawingToDelete] = useState<Drawing | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDrawings();
  }, []);

  const totalPages = Math.max(1, Math.ceil(drawings.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDrawings = drawings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const fetchDrawings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/drawings", {
        method: "GET",
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch drawings");
      }

      setDrawings((result.drawings ?? []) as Drawing[]);
    } catch (error) {
      console.error("Error fetching drawings:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch drawings"
      );
      setDrawings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!drawingToDelete) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/drawings/${drawingToDelete.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete drawing");
      }

      toast.success("Drawing deleted successfully");
      setDrawings((current) =>
        current.filter((drawing) => drawing.id !== drawingToDelete.id)
      );
      setDrawingToDelete(null);
    } catch (error) {
      console.error("Error deleting drawing:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete drawing"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 mt-4 relative">
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/drawings-management/add-new-drawing")}
          className="h-[38px] w-full max-w-[176px] flex items-center justify-center gap-1 bg-red hover:bg-red/90 text-white text-[13px] rounded-[6px] font-medium font-nunito transition-colors"
        >
          <PlusIcon />
          Add New Drawing
        </button>
      </div>

      <div className="dashboard-scrollbar-hidden overflow-x-auto pb-2">
        {/* Table Header Wrapper for visual alignment */}
        <div className="grid min-w-[880px] grid-cols-12 gap-4 px-4 py-4 bg-dark border-b border-white/50 text-[13px] font-nunito font-medium text-D6D6D6 tracking-wider">
          <div className="col-span-6">Recent Activity</div>
          <div className="col-span-2">Type / Specs</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* List Body */}
        <div className="">
          {loading ? (
            <div className="min-w-[880px] text-center py-10 text-D6D6D6">Loading drawings...</div>
          ) : drawings.length === 0 ? (
            <div className="min-w-[880px] text-center py-10 text-D6D6D6">No drawings found. Add a new one!</div>
          ) : (
            paginatedDrawings.map((drawing) => (
              <div
                key={drawing.id}
                className="mt-3 grid min-h-[81px] min-w-[880px] grid-cols-12 gap-4 items-center rounded-[4px] border-b border-white/50 bg-[#555555] px-4 py-4 font-nunito font-medium transition-colors hover:bg-dark"
              >
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded object-cover bg-gray-600 shrink-0 overflow-hidden">
                    {drawing.preview_images && drawing.preview_images[0] && (
                      <div className="relative h-full w-full">
                        <Image
                          src={drawing.preview_images[0]}
                          alt={drawing.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="line-clamp-1 text-sm text-FCFAFA">{drawing.title}</h3>
                    <p className="text-[11px] text-D6D6D6">ID: {drawing.id.substring(0, 8)}...</p>
                  </div>
                </div>

                <div className="col-span-2 space-y-2">
                  <p className="line-clamp-1 text-sm text-FCFAFA capitalize">{drawing.type}</p>
                  <p className="text-[11px] text-D6D6D6">
                    {drawing.area ? `${drawing.area} • ` : ''}
                    {drawing.number_of_floors ? `${drawing.number_of_floors} Stories` : ''}
                  </p>
                </div>

                <div className="col-span-2 font-bold text-FCFAFA text-sm">
                  {koboToNaira(drawing.price)}
                </div>

                <div className="col-span-1">
                  <span className={`w-[60px] h-[27px] inline-flex items-center justify-center rounded-full text-[11px] font-medium capitalize ${
                    drawing.status === 'active' ? 'bg-[#DCFCE7] text-[#166534]' : 
                    drawing.status === 'pending' ? 'bg-[#FEF3C7] text-[#92400E]' : 
                    'bg-[#FEE2E2] text-red'
                  }`}>
                    {drawing.status}
                  </span>
                </div>

                <div className="col-span-1 flex items-center justify-end gap-3 text-gray-400">
                  <button
                    onClick={() => router.push(`/drawings-management/edit-drawing/${drawing.id}`)}
                    className="hover:opacity-80 transition-all"
                  >
                    <EditIcon />
                  </button>
                  <button 
                    onClick={() => setDrawingToDelete(drawing)}
                    className="hover:opacity-80 transition-all text-red"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {!loading && drawings.length > 0 && (
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <Dialog
        open={Boolean(drawingToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setDrawingToDelete(null);
          }
        }}
      >
        <DialogContent className="border-white/10 bg-[#2f2f2f] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Drawing</DialogTitle>
            <DialogDescription className="text-D6D6D6">
              {drawingToDelete
                ? `Are you sure you want to delete "${drawingToDelete.title}"? This action cannot be undone.`
                : "Are you sure you want to delete this drawing?"}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setDrawingToDelete(null)}
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
              {isDeleting ? "Deleting..." : "Delete Drawing"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DrawingsManagement;
