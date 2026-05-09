"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import { EditIcon, TrashIcon } from "../../constants/images";
import Image from "next/image";

interface Props {
  id: number;
  images: string[];
  title: string;
  location: string;
  area?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const AdminThumbSlider = ({
  images,
  title,
  location,
  area,
  onEdit,
  onDelete,
  id,
}: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-lg font-nunito">
      {/* Main Image Slider */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          navigation={{
            nextEl: `.admin-next-${id}`,
            prevEl: `.admin-prev-${id}`,
          }}
          thumbs={{ swiper: thumbsSwiper }}
          className="main-slider max-h-[240px] h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-[240px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Hover overlay with edit/delete */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5 z-20">
          {onEdit && (
            <button
              onClick={onEdit}
              className="hover:scale-110 transition-all"
              title="Edit Project"
            >
             <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 21.6842C0 9.70835 9.70835 0 21.6842 0C33.6601 0 43.3684 9.70835 43.3684 21.6842C43.3684 33.6601 33.6601 43.3684 21.6842 43.3684C9.70835 43.3684 0 33.6601 0 21.6842Z" fill="#BBBBBB"/>
<g clip-path="url(#clip0_1266_1438)">
<path d="M29.9683 16.9969C30.446 16.5194 30.7145 15.8716 30.7145 15.1961C30.7146 14.5206 30.4464 13.8728 29.9688 13.3951C29.4912 12.9174 28.8435 12.649 28.168 12.6489C27.4925 12.6488 26.8447 12.9171 26.367 13.3946L14.3087 25.4556C14.099 25.6647 13.9438 25.9223 13.857 26.2055L12.6634 30.1376C12.6401 30.2157 12.6383 30.2987 12.6583 30.3778C12.6784 30.4568 12.7194 30.529 12.7771 30.5866C12.8348 30.6442 12.9071 30.6851 12.9861 30.705C13.0652 30.7249 13.1482 30.723 13.2263 30.6995L17.1593 29.5069C17.4423 29.4208 17.6998 29.2667 17.9092 29.0579L29.9683 16.9969Z" stroke="#333333" stroke-width="2.71053" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.3926 15.3598L28.0066 18.9738" stroke="#333333" stroke-width="2.71053" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1266_1438">
<rect width="21.6842" height="21.6842" fill="white" transform="translate(10.8418 10.8421)"/>
</clipPath>
</defs>
</svg>

            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="hover:scale-110 transition-all"
              title="Delete Project"
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 21.6842C0 9.70835 9.70835 0 21.6842 0C33.6601 0 43.3684 9.70835 43.3684 21.6842C43.3684 33.6601 33.6601 43.3684 21.6842 43.3684C9.70835 43.3684 0 33.6601 0 21.6842Z" fill="#BBBBBB"/>
<g clip-path="url(#clip0_1266_1442)">
<path d="M13.5527 16.2632H29.8159" stroke="#FF0000" stroke-width="2.71053" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M28.0085 16.2632V28.9123C28.0085 29.8158 27.105 30.7194 26.2015 30.7194H17.1664C16.2629 30.7194 15.3594 29.8158 15.3594 28.9123V16.2632" stroke="#FF0000" stroke-width="2.71053" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.0684 16.2633V14.4562C18.0684 13.5527 18.9719 12.6492 19.8754 12.6492H23.4894C24.3929 12.6492 25.2964 13.5527 25.2964 14.4562V16.2633" stroke="#FF0000" stroke-width="2.71053" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.8789 20.7808V26.2019" stroke="#FF0000" stroke-width="2.71053" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.4902 20.7808V26.2019" stroke="#FF0000" stroke-width="2.71053" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1266_1442">
<rect width="21.6842" height="21.6842" fill="white" transform="translate(10.8418 10.8421)"/>
</clipPath>
</defs>
</svg>

            </button>
          )}
        </div>
      </div>

      {/* Thumbnail Slider with Arrows */}
      <div className="relative px-2 py-3 flex items-center">
        {/* Left Arrow */}
        <button
          className={`admin-prev-${id} absolute left-1 z-10 text-white text-lg bg-dark/60 px-2 py-1 rounded hover:bg-dark transition-colors`}
        >
          &#8249;
        </button>

        {/* Thumbnail Slider */}
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          spaceBetween={8}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          breakpoints={{
            768: { slidesPerView: 4 },
          }}
          className="thumbnail-slider w-full h-full px-6"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-full h-[60px] object-cover cursor-pointer rounded-md border-2 border-transparent hover:border-yellow-500 transition-colors"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Arrow */}
        <button
          className={`admin-next-${id} absolute right-1 z-10 text-white text-lg bg-dark/60 px-2 py-1 rounded hover:bg-dark transition-colors`}
        >
          &#8250;
        </button>
      </div>

      {/* Card Content */}
      <div className="flex items-center justify-between">
        <div className="px-4 pb-4 pt-1 flex flex-col">
          <h3 className="text-[#333333] font-semibold text-[15px] line-clamp-1">
            {title}
          </h3>
          {area && (
            <span className="text-[#999999] font-medium text-sm">
              {area} sq ft
            </span>
          )}
        </div>
         <div className="bg-yellow rounded h-10 w-28 flex items-center justify-center gap-2 shadow text-[#555555] text-sm font-nunito font-normal ml-auto mr-2">
                     <Image
                       src={"/location.svg"}
                       width={13}
                       height={13}
                       alt="location icon"
                     />
                     {location}
                   </div>
      </div>
    </div>
  );
};
