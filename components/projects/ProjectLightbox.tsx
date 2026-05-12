"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

type ProjectLightboxProps = {
  title: string;
  description: string;
  location: string;
  images: string[];
  open: boolean;
  startIndex?: number;
  onOpenChange: (open: boolean) => void;
};

function wrapIndex(index: number, length: number) {
  if (length === 0) {
    return 0;
  }

  return (index + length) % length;
}

const ProjectLightbox = ({
  title,
  description,
  location,
  images,
  open,
  startIndex = 0,
  onOpenChange,
}: ProjectLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    if (open) {
      setCurrentIndex(wrapIndex(startIndex, images.length));
    }
  }, [images.length, open, startIndex]);

  useEffect(() => {
    if (!open || images.length <= 1) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => wrapIndex(prev - 1, images.length));
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => wrapIndex(prev + 1, images.length));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, open]);

  if (images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[min(96vw,1100px)] h-screen overflow-hidden rounded-none bg-[#333333] py-5 px-8 text-white sm:max-w-[1300px]"
      >
        <DialogTitle className="sr-only">{title} gallery</DialogTitle>

        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <div className="flex flex-col gap-0">
              <h3 className="font-nunito text-sm font-medium text-white">
                {title}
              </h3>
              <p className="font-nunito font-medium text-xs text-[#999999]">
                Image {currentIndex + 1} of {images.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close gallery"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="white"
                  strokeOpacity="0.7"
                  strokeWidth="3.08343"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="white"
                  strokeOpacity="0.7"
                  strokeWidth="3.08343"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="relative aspect-[16/10] w-full h-full mx-auto max-h-[500px] max-w-[1300px] rounded-md overflow-hidden my-8">
            <Image
              src={currentImage}
              alt={`${title} preview ${currentIndex + 1}`}
              fill
              className="object-cover"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      wrapIndex(prev - 1, images.length),
                    )
                  }
                  className="absolute left-0 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center backdrop-blur bg-black/25 hover:bg-black/50"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      wrapIndex(prev + 1, images.length),
                    )
                  }
                  className="absolute right-0 top-1/2 z-20 inline-flex items-center justify-center -translate-y-1/2 h-10 w-10 backdrop-blur bg-black/25 hover:bg-black/50"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {/* Project info */}
          {/* <div className="space-y-2 mb-4">
            <h4 className="font-nunito font-bold text-white text-lg">
              {title}
            </h4>
            <p className="font-nunito font-medium text-[#999999] text-sm">
              {location}
            </p>
            {description && (
              <p className="font-nunito font-medium text-D6D6D6 text-sm line-clamp-3">
                {description}
              </p>
            )}
          </div> */}

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto z-20">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[8px] border transition-all ${
                  currentIndex === index
                    ? "border-red ring-2 ring-red/30"
                    : "border-white/10 hover:border-white/35"
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectLightbox;
