"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

function formatDrawingDescription(desc: string | null | undefined): string {
  if (!desc) return "";
  const trimmed = desc.trim();
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed;
  }
  return trimmed
    .split(/\n\s*\n/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br/>")}</p>`)
    .join("");
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

  const descContentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const formattedDescription = useMemo(
    () => formatDrawingDescription(drawing.description),
    [drawing.description]
  );

  useEffect(() => {
    const el = descContentRef.current;
    if (!el) return;

    const check = () => {
      setIsTruncated(el.scrollHeight > 48);
    };
    check();

    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [formattedDescription]);

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const mainImage = galleryImages[0];
  const image2 = galleryImages[1] ?? galleryImages[0];
  const image3 = galleryImages[2] ?? galleryImages[galleryImages.length - 1];

  return (
    <>
    <div className="flex flex-col h-[640px] rounded-[12px] overflow-hidden shadow bg-white">
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

      <div className="flex-1 px-5 py-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-[#333333] text-[16px]  font-nunito font-extrabold line-clamp-1">
              {drawing.title}
            </h3>
            <span className="bg-[#FFE5E5] h-10 min-w-fit flex items-center justify-center rounded px-4 py-2 font-extrabold font-nunito text-red text-[15px] md:text-[16px] whitespace-nowrap shadow-xs">
              {koboToNaira(drawing.price)}
            </span>
          </div>

          <div className="relative my-2.5">
            <div
              className={`transition-all duration-200 ${
                expanded
                  ? "max-h-[145px] overflow-y-auto"
                  : "max-h-[80px] overflow-hidden line-clamp-4"
              }`}
            >
              <div
                ref={descContentRef}
                className="text-[#333333] text-xs md:text-sm font-nunito font-normal prose prose-sm max-w-none [&_*]:!text-[#333333] [&_p]:!text-[#333333] [&_li]:!text-[#333333] [&_span]:!text-[#333333] [&_strong]:!text-[#111827] [&_strong]:!font-bold [&_em]:italic [&_p]:my-0.5 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:my-0.5 [&_h2]:text-sm [&_h2]:!font-bold [&_h3]:text-xs [&_h3]:!font-bold leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formattedDescription }}
              />

              {expanded && isTruncated && (
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="mt-1.5 inline-block text-red text-xs font-nunito font-bold hover:underline"
                >
                  See less
                </button>
              )}
            </div>

            {!expanded && isTruncated && (
              <div className="absolute bottom-0 right-0 pl-6 bg-gradient-to-l from-white via-white/95 to-transparent flex items-end">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="text-red text-xs md:text-sm font-nunito font-bold hover:underline"
                >
                  ... See more
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          <div className="h-[64px] grid grid-cols-3">
            <div className="h-full flex flex-col items-center">
              <AreaIcon />
              <span className="text-paragraphGrey text-[11px] font-nunito font-bold mt-1">
                Area
              </span>
              <span className="text-dark text-[13px] font-nunito font-extrabold">
                {drawing.area || 'N/A'}
              </span>
            </div>
            <div className="h-full flex flex-col items-center">
              <FloorIcon />
              <span className="text-paragraphGrey text-[11px] font-nunito font-bold mt-1">
                Floors
              </span>
              <span className="text-dark text-[13px] font-nunito font-extrabold">
                {drawing.number_of_floors ? `${drawing.number_of_floors} Stories` : 'N/A'}
              </span>
            </div>
            <div className="h-full flex flex-col items-center">
              <TypeIcon />
              <span className="text-paragraphGrey text-[11px] font-nunito font-bold mt-1">
                Type
              </span>
              <span className="text-dark text-[13px] font-nunito font-extrabold capitalize">
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
    </div>
      <DrawingLightbox
        title={drawing.title}
        images={galleryImages}
        open={viewerOpen}
        startIndex={viewerIndex}
        onOpenChange={setViewerOpen}
        actionHref={`/drawings/${drawing.id}`}
        showActionOnLastSlide
        cover={false}
      />
    </>
  );
};

export default DrawingsCard;
