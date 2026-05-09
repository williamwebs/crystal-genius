"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  AreaIcon,
  FloorIcon,
  LockIcon,
  TypeIcon,
} from "../../constants/images";
import { Drawing, koboToNaira } from "../../types/database";
import Link from "next/link";
import DrawingLightbox from "../drawings/DrawingLightbox";

interface DrawingsCardProps {
  drawing: Drawing;
}

const DrawingsCard = ({ drawing }: DrawingsCardProps) => {
  const galleryImages = useMemo(
    () =>
      drawing.preview_images && drawing.preview_images.length > 0
        ? drawing.preview_images
        : [
            "/images/building-2.png",
            "/images/building-1.png",
            "/images/building-3.png",
          ],
    [drawing.preview_images]
  );
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const mainImage = galleryImages[0];
  const image2 = galleryImages[1] ?? galleryImages[0];
  const image3 = galleryImages[2] ?? galleryImages[galleryImages.length - 1];

  return (
    <>
    <div className="flex flex-col h-[640px] rounded-[12px] overflow-hidden shadow">
      <div className="h-[281px] w-full relative flex gap-1">
        {/* absolute text */}
        <div className="absolute top-3 left-3 bg-red dark-shadow w-[80px] h-[24px] rounded flex items-center justify-center text-white text-[11px] uppercase z-10">
          {drawing.status === "active" ? "Featured" : "Inactive"}
        </div>
        {/* main image */}
        <button
          type="button"
          onClick={() => openViewer(0)}
          className="relative h-[280px] w-1/2 bg-gray-200 md:w-[280px]"
        >
          <Image
            src={mainImage}
            fill
            alt={drawing.title}
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        </button>
        {/* other images in col */}
        <div className="flex-1 h-full">
          <div className="grid grid-cols-1 gap-1 h-full bg-gray-200">
            <button
              type="button"
              onClick={() => openViewer(Math.min(1, galleryImages.length - 1))}
              className="relative h-full w-full"
            >
              <Image
                src={image2}
                fill
                alt={`${drawing.title} detail`}
                className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </button>
            <button
              type="button"
              onClick={() => openViewer(Math.min(2, galleryImages.length - 1))}
              className="relative h-full w-full bg-gray-200"
            >
              <Image
                src={image3}
                fill
                alt={`${drawing.title} detail`}
                className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[#333333] text-[17px] md:text-[19px] font-nunito font-extrabold line-clamp-1">
            {drawing.title}
          </h3>
          <span className="bg-[#FFE5E5] h-10 min-w-[66px] flex items-center justify-center rounded px-2 font-extrabold font-nunito text-red text-[15px] md:text-[16px] whitespace-nowrap">
            {koboToNaira(drawing.price)}
          </span>
        </div>

        <p className="text-dark text-sm font-nunito font-bold my-3 h-[70px] line-clamp-4">
          {drawing.description}
        </p>

        <div className="my-10 h-[64px] grid grid-cols-3">
          <div className="h-full flex flex-col items-center">
            <AreaIcon />
            <span className="text-paragraphGrey text-[11px] font-nunito font-bold mt-1">
              Area
            </span>
            <span className="text-dark text-sm font-nunito font-extrabold">
              {drawing.area || 'N/A'}
            </span>
          </div>
          <div className="h-full flex flex-col items-center">
            <FloorIcon />
            <span className="text-paragraphGrey text-[11px] font-nunito font-bold mt-1">
              Floors
            </span>
            <span className="text-dark text-sm font-nunito font-extrabold">
              {drawing.number_of_floors ? `${drawing.number_of_floors} Stories` : 'N/A'}
            </span>
          </div>
          <div className="h-full flex flex-col items-center">
            <TypeIcon />
            <span className="text-paragraphGrey text-[11px] font-nunito font-bold mt-1">
              Type
            </span>
            <span className="text-dark text-sm font-nunito font-extrabold capitalize">
              {drawing.type}
            </span>
          </div>
        </div>

        <Link href={`/drawings/${drawing.id}`} className="bg-red hover:bg-red/80 rounded h-10 flex items-center justify-center gap-2 w-full transition-colors duration-150">
          <LockIcon />
          <span className="text-white text-sm font-nunito font-normal">
            Unlock Full Design
          </span>
        </Link>
      </div>
    </div>
      <DrawingLightbox
        title={drawing.title}
        images={galleryImages}
        open={viewerOpen}
        startIndex={viewerIndex}
        onOpenChange={setViewerOpen}
        actionHref={`/drawings/${drawing.id}`}
        showActionOnLastSlide
      />
    </>
  );
};

export default DrawingsCard;
