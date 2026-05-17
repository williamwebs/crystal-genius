"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

type DrawingLightboxProps = {
  title: string;
  images: string[];
  open: boolean;
  startIndex?: number;
  onOpenChange: (open: boolean) => void;
  actionHref?: string;
  actionLabel?: string;
  showActionOnLastSlide?: boolean;
};

function wrapIndex(index: number, length: number) {
  if (length === 0) {
    return 0;
  }

  return (index + length) % length;
}

const DrawingLightbox = ({
  title,
  images,
  open,
  startIndex = 0,
  onOpenChange,
  actionHref,
  actionLabel = "Unlock Full Design",
  showActionOnLastSlide = false,
}: DrawingLightboxProps) => {
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
  const isLastSlide = currentIndex === images.length - 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        // max-w-[min(96vw,1100px)]
        className="max-w-screen h-screen overflow-hidden rounded-none bg-[#333333] py-5 px-2 md:px-8 text-white md:max-w-[1300px]"
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
              className=""
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
                  stroke-opacity="0.7"
                  stroke-width="3.08343"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="white"
                  stroke-opacity="0.7"
                  stroke-width="3.08343"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="relative md:aspect-[16/10] w-full h-full mx-auto max-h-[500px] md:max-w-[1300px] rounded-md overflow-hidden my-8">
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
                  className="absolute right-0 top-1/2 z-20 inline-flex items-center justify-center -translate-y-1/2 h-10 w-10  backdrop-blur bg-black/25 hover:bg-black/50"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {showActionOnLastSlide && isLastSlide && actionHref && (
              <div className="absolute inset-0 z-10 flex items-center justify-center p-3 bg-[#555]/40 backdrop-blur">
                <div className="flex w-full h-full max-w-[500px] max-h-[300px] flex-col items-center justify-center space-y-10 rounded-[18px] bg-black/44 backdrop-blur px-6 py-5 text-center">
                  <div className="flex flex-col gap-3">
                    <div className="w-fit mx-auto">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z"
                          fill="#FFE5E5"
                          fill-opacity="0.2"
                        />
                        <path
                          d="M41.3704 30.265H22.7038C21.231 30.265 20.0371 31.4589 20.0371 32.9316V42.265C20.0371 43.7377 21.231 44.9316 22.7038 44.9316H41.3704C42.8432 44.9316 44.0371 43.7377 44.0371 42.265V32.9316C44.0371 31.4589 42.8432 30.265 41.3704 30.265Z"
                          stroke="#FF0000"
                          stroke-width="2.9399"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M25.3711 30.2649V24.9316C25.3711 23.1635 26.0735 21.4678 27.3237 20.2175C28.574 18.9673 30.2697 18.2649 32.0378 18.2649C33.8059 18.2649 35.5016 18.9673 36.7518 20.2175C38.002 21.4678 38.7044 23.1635 38.7044 24.9316V30.2649"
                          stroke="#FF0000"
                          stroke-width="2.9399"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="text-white text-center text-lg font-nunito font-bold">
                      Premium Content
                    </h4>
                    <p className="font-nunito font-medium text-sm text-D6D6D6">
                      This detailed structural plan is part of the premium
                      package. Unlock the full design to view all
                      specifications.
                    </p>
                  </div>
                  <Link
                    href={actionHref}
                    className="inline-flex max-w-[360px] w-full h-[47px] items-center justify-center rounded-[8px] bg-red font-nunito text-sm font-semibold text-white transition-colors hover:bg-red/85"
                  >
                    {actionLabel}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-5 md:bottom-0 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto z-20">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`relative h-[60px] w-[60px] shadow shrink-0 overflow-hidden rounded-[8px] border transition-all ${
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

export default DrawingLightbox;
