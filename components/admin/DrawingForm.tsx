"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FileText, ImageIcon } from "lucide-react";
import { CloseXIcon, InfoIcon, UploadIcon } from "../../constants/images";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";

export type DrawingFormData = {
  title: string;
  price: string;
  area: string;
  floors: string;
  buildingType: string;
  status: string;
  description: string;
};

export type DrawingFormInitialAssets = {
  previewImages?: string[];
  fullFiles?: string[];
};

export type DrawingFormSubmission = {
  data: DrawingFormData;
  existingPreviewImages: string[];
  existingFullFiles: string[];
  newPreviewFiles: File[];
  newFullFiles: File[];
};

type PreviewAssetItem =
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

type FullAssetItem =
  | {
      id: string;
      source: "existing";
      path: string;
      name: string;
    }
  | {
      id: string;
      source: "new";
      file: File;
      name: string;
    };

type DrawingFormProps = {
  heading: string;
  submitLabel: string;
  initialData?: Partial<DrawingFormData>;
  initialAssets?: DrawingFormInitialAssets;
  isSubmitting?: boolean;
  onSubmit: (payload: DrawingFormSubmission) => void;
};

const defaultFormData: DrawingFormData = {
  title: "",
  price: "",
  area: "",
  floors: "",
  buildingType: "residential",
  status: "active",
  description: "",
};

const buildingTypeOptions = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "mixed-use", label: "Mixed-Use" },
  { value: "multi-family", label: "Multi-Family" },
];

const statusOptions = [
  { value: "active", label: "Active (Visible)" },
  { value: "inactive", label: "Inactive (Hidden)" },
  { value: "pending", label: "Pending" },
];

function getFileNameFromUrl(url: string) {
  try {
    const pathname = new URL(url).pathname;
    return decodeURIComponent(pathname.split("/").pop() || "preview-image");
  } catch {
    return "preview-image";
  }
}

function getFileNameFromPath(path: string) {
  return decodeURIComponent(path.split("/").pop() || "drawing-file");
}

function createPreviewItems(previewImages: string[]): PreviewAssetItem[] {
  return previewImages.map((url, index) => ({
    id: `existing-preview-${index}-${url}`,
    source: "existing",
    url,
    name: getFileNameFromUrl(url),
  }));
}

function createFullFileItems(fullFiles: string[]): FullAssetItem[] {
  return fullFiles.map((path, index) => ({
    id: `existing-file-${index}-${path}`,
    source: "existing",
    path,
    name: getFileNameFromPath(path),
  }));
}

function revokePreviewUrls(items: PreviewAssetItem[]) {
  items.forEach((item) => {
    if (item.source === "new") {
      URL.revokeObjectURL(item.previewUrl);
    }
  });
}

const DrawingForm = ({
  heading,
  submitLabel,
  initialData,
  initialAssets,
  isSubmitting = false,
  onSubmit,
}: DrawingFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<DrawingFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [previewItems, setPreviewItems] = useState<PreviewAssetItem[]>(
    createPreviewItems(initialAssets?.previewImages ?? [])
  );
  const [fullItems, setFullItems] = useState<FullAssetItem[]>(
    createFullFileItems(initialAssets?.fullFiles ?? [])
  );

  const previewInputRef = useRef<HTMLInputElement>(null);
  const fullFileInputRef = useRef<HTMLInputElement>(null);
  const previewItemsRef = useRef<PreviewAssetItem[]>(previewItems);

  useEffect(() => {
    previewItemsRef.current = previewItems;
  }, [previewItems]);

  useEffect(() => {
    return () => {
      revokePreviewUrls(previewItemsRef.current);
    };
  }, []);

  useEffect(() => {
    revokePreviewUrls(previewItemsRef.current);

    setFormData({
      ...defaultFormData,
      ...initialData,
    });
    setPreviewItems(createPreviewItems(initialAssets?.previewImages ?? []));
    setFullItems(createFullFileItems(initialAssets?.fullFiles ?? []));
  }, [initialAssets, initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreviewFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const nextItems = Array.from(e.target.files).map((file, index) => ({
      id: `new-preview-${file.name}-${file.size}-${file.lastModified}-${index}`,
      source: "new" as const,
      file,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));

    setPreviewItems((current) => [...current, ...nextItems]);
    e.target.value = "";
  };

  const handleFullFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const nextItems = Array.from(e.target.files).map((file, index) => ({
      id: `new-full-${file.name}-${file.size}-${file.lastModified}-${index}`,
      source: "new" as const,
      file,
      name: file.name,
    }));

    setFullItems((current) => [...current, ...nextItems]);
    e.target.value = "";
  };

  const removePreviewItem = (itemId: string) => {
    setPreviewItems((current) => {
      const itemToRemove = current.find((item) => item.id === itemId);

      if (itemToRemove?.source === "new") {
        URL.revokeObjectURL(itemToRemove.previewUrl);
      }

      return current.filter((item) => item.id !== itemId);
    });
  };

  const removeFullItem = (itemId: string) => {
    setFullItems((current) => current.filter((item) => item.id !== itemId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      data: formData,
      existingPreviewImages: previewItems
        .filter((item): item is Extract<PreviewAssetItem, { source: "existing" }> => item.source === "existing")
        .map((item) => item.url),
      existingFullFiles: fullItems
        .filter((item): item is Extract<FullAssetItem, { source: "existing" }> => item.source === "existing")
        .map((item) => item.path),
      newPreviewFiles: previewItems
        .filter((item): item is Extract<PreviewAssetItem, { source: "new" }> => item.source === "new")
        .map((item) => item.file),
      newFullFiles: fullItems
        .filter((item): item is Extract<FullAssetItem, { source: "new" }> => item.source === "new")
        .map((item) => item.file),
    });
  };

  return (
    <div className="font-nunito font-medium py-4">
      <div className="border border-D6D6D6/20 rounded-[6px] p-2 w-full bg-[#555555]">
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-4 border-b border-D6D6D6/30">
          <h2 className="text-FCFAFA text-lg">{heading}</h2>
          <button
            type="button"
            onClick={() => router.back()}
            className="hover:opacity-80 transition-opacity text-D6D6D6"
          >
            <CloseXIcon />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-4 py-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormInput
              label="Drawing Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              required
            />

            <FormInput
              label="Price (₦)"
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
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
              label="Number of Floors"
              name="floors"
              value={formData.floors}
              onChange={handleChange}
              type="number"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormSelect
              label="Building Type"
              name="buildingType"
              value={formData.buildingType}
              onChange={handleChange}
              options={buildingTypeOptions}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[13px] text-FCFAFA">Preview Images (Public)</label>
              <div
                onClick={() => previewInputRef.current?.click()}
                className="h-[140px] flex items-center justify-center border border-dashed border-D6D6D6/30 rounded-[6px] py-4 text-center hover:bg-dark transition-colors cursor-pointer bg-dark/50"
              >
                <div className="flex flex-col items-center">
                  <UploadIcon />
                  <p className="text-D6D6D6 mt-2">
                    <span className="text-[#F59E0B] font-medium">Upload images</span> or drag and drop
                  </p>
                  <p className="text-D6D6D6 text-[11px] mt-1">
                    {previewItems.length > 0
                      ? `${previewItems.length} image(s) ready`
                      : "PNG, JPG up to 5MB"}
                  </p>
                </div>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                ref={previewInputRef}
                onChange={handlePreviewFileChange}
              />
              {previewItems.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {previewItems.map((item) => {
                    const previewSrc =
                      item.source === "existing" ? item.url : item.previewUrl;

                    return (
                      <div
                        key={item.id}
                        className="relative overflow-hidden w-[100px] h-[100px] rounded-[10px] border border-D6D6D6/20 bg-dark/50"
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
                          onClick={() => removePreviewItem(item.id)}
                          className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/65 transition-colors hover:bg-black/80"
                          aria-label={`Remove ${item.name}`}
                        >
                          <CloseXIcon />
                        </button>
                        <div className="absolute bottom-1 left-1 ">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-[10px] font-light font-nunito ${
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
              )}
              {previewItems.length === 0 && (
                <div className="flex min-h-[84px] items-center justify-center rounded-[6px] border border-D6D6D6/20 bg-dark/30 px-4 text-center text-[12px] text-D6D6D6">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>No preview images selected yet.</span>
                  </div>
                </div>
              )}
              <div className="bg-dark/50 border border-F59E0B rounded-[4px] py-2 px-3 flex items-start gap-2">
                <InfoIcon />
                <p className="text-[11px] text-F59E0B font-normal">
                  These images will be visible to everyone on the public site (consider using watermarked images).
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] text-FCFAFA">Full Design Files (Private)</label>
              <div
                onClick={() => fullFileInputRef.current?.click()}
                className="h-[140px] flex items-center justify-center border border-dashed border-D6D6D6/30 rounded-[6px] py-4 text-center hover:bg-dark transition-colors cursor-pointer bg-dark/50"
              >
                <div className="flex flex-col items-center">
                  <UploadIcon />
                  <p className="text-D6D6D6 mt-2">
                    <span className="text-red font-medium">Upload PDF/CAD</span> or drag and drop
                  </p>
                  <p className="text-D6D6D6 text-[11px] mt-1">
                    {fullItems.length > 0
                      ? `${fullItems.length} file(s) ready`
                      : "PDF, ZIP, DWG, DXF up to 50MB"}
                  </p>
                </div>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,.zip,.dwg,.dxf,.cad,application/pdf,application/zip"
                className="hidden"
                ref={fullFileInputRef}
                onChange={handleFullFileChange}
              />
              {fullItems.length > 0 && (
                <div className="space-y-2">
                  {fullItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-[8px] border border-D6D6D6/20 bg-dark/40 px-3 py-3 h-[100px]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red/10 text-red">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-1 text-[13px] text-FCFAFA">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-D6D6D6">
                            {item.source === "existing"
                              ? "Existing private file"
                              : "New file ready to upload"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFullItem(item.id)}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/30 transition-colors hover:bg-black/55"
                        aria-label={`Remove ${item.name}`}
                      >
                        <CloseXIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {fullItems.length === 0 && (
                <div className="flex min-h-[84px] items-center justify-center rounded-[6px] border border-D6D6D6/20 bg-dark/30 px-4 text-center text-[12px] text-D6D6D6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>No private design files selected yet.</span>
                  </div>
                </div>
              )}
              <div className="bg-dark/50 border border-red rounded-[4px] py-2 px-3 flex items-start gap-2">
                <InfoIcon />
                <p className="text-[11px] text-red font-normal">
                  These files are SECURE. They will only be delivered to customers who complete their payment.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="w-[87px] h-10 flex items-center justify-center rounded-[6px] bg-transparent text-white text-[13px] hover:bg-dark transition-colors border border-D6D6D6/30 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[139px] px-4 h-10 flex items-center justify-center rounded-[6px] bg-red text-white text-[13px] hover:bg-red/80 transition-colors border border-red disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrawingForm;
