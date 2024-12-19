"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import Image from "next/image";

interface Props {
  id: number;
  images: string[];
  title: string;
  description: string;
  location: string;
  type: string;
  isCompleted: boolean;
}

export const ThumbSlider = ({
  images,
  title,
  description,
  location,
  type,
  isCompleted,
  id,
}: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Thumbs]}
        spaceBetween={10}
        navigation={{
          nextEl: `.custom-next-${id}`,
          prevEl: `.custom-prev-${id}`,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        className="main-slider mt-1 rounded-lg max-h-[150px] md:max-h-[300px] h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider with Arrows */}
      <div className="relative mt-4 flex items-center">
        {/* Left Arrow */}
        <button
          className={`custom-prev-${id} absolute left-1 z-10 text-red text-lg bg-white px-2 py-1 mb-1 rounded`}
        >
          &#8249;
        </button>

        {/* Thumbnail Slider */}
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          spaceBetween={10}
          slidesPerView={2} // 2 on mobile screens
          freeMode={true}
          watchSlidesProgress={true}
          breakpoints={{
            768: { slidesPerView: 4 },
          }}
          className="thumbnail-slider w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-full h-[112px] object-cover cursor-pointer rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Arrow */}
        <button
          className={`custom-next-${id} absolute right-1 mb-1 z-10  text-red text-lg bg-white px-2 py-1 rounded`}
        >
          &#8250;
        </button>
      </div>

      <div className="w-full flex items-center justify-between mt-1">
        <div className="w-1/2">
          <h5 className="font-bold font-nunito text-[#555555] text-xl md:text-2xl text-left ">
            {title}
          </h5>
          <p className="text-paragraphGrey text-sm md:text-base">
            {description}
          </p>
        </div>
        <div className="w-1/2">
          <div className="bg-yellow rounded h-10 w-28 flex items-center justify-center gap-2 shadow text-[#555555] text-sm font-nunito font-normal ml-auto">
            <Image
              src={"/location.svg"}
              width={14}
              height={14}
              alt="location icon"
            />
            {location}
          </div>
        </div>
      </div>

      {/* label */}
      <div className="border border-yellow bg-white rounded-lg w-fit md:w-2/5 h-10 flex items-stretch font-nunito font-normal text-sm absolute top-1 -left-2 md:top-5 md:-left-4 z-10 ">
        <div
          className="rounded-lg text-white px-4 py-1 md:px-2 md:py-2 w-1/2 flex items-center justify-center text-xs md:text-sm"
          style={{
            background: "linear-gradient(to right,  #D3857A, #FFD554)",
          }}
        >
          {type}
        </div>
        <div className=" text-red p-3 w-1/2 flex items-center justify-center text-xs md:text-sm">
          {isCompleted ? "Completed" : "In Progress"}
        </div>
      </div>
    </div>
  );
};
