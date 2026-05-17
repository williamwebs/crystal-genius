"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import DrawingLightbox from "./DrawingLightbox";

type DrawingDetailGalleryProps = {
  title: string;
  images: string[];
};

const fallbackImages = [
  "/images/building-2.png",
  "/images/building-1.png",
  "/images/building-3.png",
];

const DrawingDetailGallery = ({
  title,
  images,
}: DrawingDetailGalleryProps) => {
  const galleryImages = images.length > 0 ? images : fallbackImages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    setViewerIndex(0);
  }, [title]);

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setActiveIndex(index);
    setViewerOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => openViewer(activeIndex)}
          className="relative block w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm transition-transform hover:scale-[1.01]"
        >
          <div className="relative aspect-video">
            <Image
              src={galleryImages[activeIndex]}
              fill
              alt={`${title} preview ${activeIndex + 1}`}
              className="object-cover"
              priority
            />
          </div>
        </button>

        {galleryImages.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => openViewer(index)}
                className={`relative aspect-square overflow-hidden rounded-md border transition-all ${
                  activeIndex === index
                    ? "border-red ring-2 ring-red/20"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image
                  src={image}
                  fill
                  alt={`${title} view ${index + 1}`}
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <DrawingLightbox
        title={title}
        images={galleryImages}
        open={viewerOpen}
        startIndex={viewerIndex}
        onOpenChange={setViewerOpen}
      />
    </>
  );
};

export default DrawingDetailGallery;
