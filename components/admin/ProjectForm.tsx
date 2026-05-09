"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { CloseXIcon, InfoIcon, UploadIcon } from "../../constants/images";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";

export type ProjectFormData = {
  title: string;
  location: string;
  area: string;
  year: string;
  category: string;
  status: string;
  description: string;
};

export type ProjectFormInitialAssets = {
  images?: string[];
};

export type ProjectFormSubmission = {
  data: ProjectFormData;
  existingImages: string[];
  newImageFiles: File[];
};

type ProjectImageItem =
  | {
      id: string;
      source: "existing";
      url: string;
      name: string;
    }
  | {
      id: string;
      source: "new";
      file: File;
      name: string;
      previewUrl: string;
    };

type ProjectFormProps = {
  heading: string;
  submitLabel: string;
  initialData?: Partial<ProjectFormData>;
  initialAssets?: ProjectFormInitialAssets;
  isSubmitting?: boolean;
  onSubmit: (payload: ProjectFormSubmission) => void;
};

const defaultFormData: ProjectFormData = {
  title: "",
  location: "",
  area: "",
  year: "",
  category: "residential",
  status: "active",
  description: "",
};

const categoryOptions = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "mixed-use", label: "Mixed-Use" },
  { value: "interior-design", label: "Interior Design" },
  { value: "urban-planning", label: "Urban Planning" },
];

const statusOptions = [
  { value: "active", label: "Active (Visible)" },
  { value: "inactive", label: "Inactive (Hidden)" },
];

function getFileNameFromUrl(url: string) {
  try {
    const pathname = new URL(url).pathname;
    return decodeURIComponent(pathname.split("/").pop() || "project-image");
  } catch {
    return "project-image";
  }
}

function createImageItems(images: string[]): ProjectImageItem[] {
  return images.map((url, index) => ({
    id: `existing-project-image-${index}-${url}`,
    source: "existing",
    url,
    name: getFileNameFromUrl(url),
  }));
}

function revokePreviewUrls(items: ProjectImageItem[]) {
  items.forEach((item) => {
    if (item.source === "new") {
      URL.revokeObjectURL(item.previewUrl);
    }
  });
}

const ProjectForm = ({
  heading,
  submitLabel,
  initialData,
  initialAssets,
  isSubmitting = false,
  onSubmit,
}: ProjectFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [imageItems, setImageItems] = useState<ProjectImageItem[]>(
    createImageItems(initialAssets?.images ?? [])
  );

  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageItemsRef = useRef<ProjectImageItem[]>(imageItems);

  useEffect(() => {
    imageItemsRef.current = imageItems;
  }, [imageItems]);

  useEffect(() => {
    return () => {
      revokePreviewUrls(imageItemsRef.current);
    };
  }, []);

  useEffect(() => {
    revokePreviewUrls(imageItemsRef.current);
    setFormData({
      ...defaultFormData,
      ...initialData,
    });
    setImageItems(createImageItems(initialAssets?.images ?? []));
  }, [initialAssets, initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const nextItems = Array.from(e.target.files).map((file, index) => ({
      id: `new-project-image-${file.name}-${file.size}-${file.lastModified}-${index}`,
      source: "new" as const,
      file,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));

    setImageItems((current) => [...current, ...nextItems]);
    e.target.value = "";
  };

  const removeImageItem = (itemId: string) => {
    setImageItems((current) => {
      const itemToRemove = current.find((item) => item.id === itemId);

      if (itemToRemove?.source === "new") {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }

      return current.filter((item) => item.id !== itemId);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      data: formData,
      existingImages: imageItems
        .filter(
          (
            item
          ): item is Extract<ProjectImageItem, { source: "existing" }> =>
            item.source === "existing"
        )
        .map((item) => item.url),
      newImageFiles: imageItems
        .filter(
          (
            item
          ): item is Extract<ProjectImageItem, { source: "new" }> =>
            item.source === "new"
        )
        .map((item) => item.file),
    });
  };

  return (
    <div className="font-nunito font-medium py-4">
      <div className="border border-D6D6D6/20 rounded-[6px] p-2 w-full bg-[#555555]">
        <div className="flex items-center justify-between py-4 px-4 border-b border-D6D6D6/30">
          <h2 className="text-FCFAFA">{heading}</h2>
          <button
            type="button"
            onClick={() => router.back()}
            className="hover:opacity-80 transition-opacity"
          >
            <CloseXIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormInput
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              required
            />

            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              type="text"
              required
            />

            <FormInput
              label="Area (e.g., 3,200 sq.ft)"
              name="area"
              value={formData.area}
              onChange={handleChange}
              type="text"
              required
            />

            <FormInput
              label="Completion Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              type="number"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormSelect
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categoryOptions}
            />

            <FormSelect
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />

            <div className="col-span-2">
              <FormTextarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] text-FCFAFA block">Images</label>
            <div
              onClick={() => imageInputRef.current?.click()}
              className="h-[140px] flex items-center justify-center border border-dashed border-D6D6D6/30 rounded-[6px] py-4 text-center hover:bg-dark transition-colors cursor-pointer bg-dark/50"
            >
              <div className="flex flex-col items-center">
                <UploadIcon />
                <p className="text-D6D6D6 mt-2">
                  <span className="text-[#F59E0B] font-medium">
                    Upload files
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-D6D6D6 text-[11px]">
                  {imageItems.length > 0
                    ? `${imageItems.length} image(s) ready`
                    : "PNG, JPG, GIF up to 10MB"}
                </p>
              </div>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              ref={imageInputRef}
              onChange={handleImageFileChange}
            />

            {imageItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {imageItems.map((item) => {
                  const previewSrc =
                    item.source === "existing" ? item.url : item.previewUrl;

                  return (
                    <div
                      key={item.id}
                      className="relative overflow-hidden rounded-[10px] border border-D6D6D6/20 bg-dark/40"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={previewSrc}
                          fill
                          alt={item.name}
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 180px"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImageItem(item.id)}
                        className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/65 transition-colors hover:bg-black/80"
                        aria-label={`Remove ${item.name}`}
                      >
                        <CloseXIcon />
                      </button>
                      <div className="space-y-1 px-3 py-2">
                        <p className="line-clamp-1 text-[12px] text-FCFAFA">
                          {item.name}
                        </p>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-[10px] ${
                            item.source === "existing"
                              ? "bg-[#1f2937] text-[#93c5fd]"
                              : "bg-[#3f2b04] text-[#F59E0B]"
                          }`}
                        >
                          {item.source === "existing" ? "Existing" : "New"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[84px] items-center justify-center rounded-[6px] border border-D6D6D6/20 bg-dark/30 px-4 text-center text-[12px] text-D6D6D6">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>No project images selected yet.</span>
                </div>
              </div>
            )}

            <div className="bg-dark/50 border border-D6D6D6/30 rounded-[4px] py-2 px-3 flex items-start gap-2 mt-2">
              <InfoIcon />
              <p className="text-[11px] text-D6D6D6 font-normal">
                Upload multiple images. They will be displayed as a slider
                gallery on the project portfolio card.
              </p>
            </div>
          </div>

          <div className="flex justify-start gap-3 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="w-[87px] h-10 flex items-center justify-center rounded-[6px] bg-transparent text-white text-[13px] hover:bg-D6D6D6/20 transition-colors border border-red disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[139px] h-10 flex items-center justify-center rounded-[6px] bg-red text-white text-[13px] hover:bg-red/80 transition-colors border border-red disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
