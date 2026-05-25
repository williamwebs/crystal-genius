"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

export default function Hero() {
  const images = [
    "/images/hero-1.svg",
    // "/images/hero-2.png",
    // "/images/hero-3.png",
    // "/images/hero-4.png",
    // "/images/hero-5.png",
  ];

  return (
    <header className="relative h-[700px] md:h-[700px] -mt-20 sm:-mt-20">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        // pagination={{ clickable: true }}
        className="absolute inset-0 w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {image.endsWith(".mp4") || image.endsWith(".webm") ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={image} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 35, 61, 1), rgba(112, 199, 218, 0.24)), url(${image})`,
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Static Text */}
      <div className="absolute top-0 z-20 w-full h-full text-white py-20 md:py-0 flex items-center">
        <div className="container mx-auto px-4 md:px-0 w-full">
          <div className="flex flex-col md:flex-row items-center w-full h-full justify-between">
            <div className="w-full md:w-2/3">
              <h1
                // variants={fadeIn("right", 0.2)}
                // initial="hidden"
                // whileInView={"show"}
                // viewport={{ once: false, amount: 0.7 }}
                className="text-5xl text-white font-impact max-w-2xl mt-10 sm:mt-0"
              >
                Pioneering innovation and setting new standards of excellence in
                building construction.
              </h1>
              <p
                // variants={fadeIn("left", 0.3)}
                // initial="hidden"
                // whileInView={"show"}
                // viewport={{ once: false, amount: 0.7 }}
                className="text-base text-gray-300 font-nunito my-5 max-w-xl"
              >
                Crystal Genius International Limited leads the way in
                transformative building solutions, setting benchmarks in
                quality, innovation, and reliability across all construction
                projects.
              </p>

              {/* cta */}
              <div
                // variants={fadeIn("up", 0.3)}
                // initial="hidden"
                // whileInView={"show"}
                // viewport={{ once: false, amount: 0.5 }}
                className="flex flex-col md:flex-row items-center justify-between md:justify-normal gap-3 md:gap-1"
              >
                <Link
                  href={"/"}
                  className="bg-white border border-white rounded w-full md:w-fit h-10 px-12 flex items-center justify-center gap-3 mt-2 shadow text-blue text-xs sm:text-sm font-nunito font-medium btn-dark-shadow"
                >
                  Join Our Verified Housing Cluster
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 15 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.2422 5.62701H0.625C0.45924 5.62701 0.300269 5.69285 0.183058 5.81006C0.0658481 5.92727 0 6.08624 0 6.25201C0 6.41777 0.0658481 6.57674 0.183058 6.69395C0.300269 6.81116 0.45924 6.87701 0.625 6.87701H12.2422L7.68164 11.4336C7.56405 11.5512 7.49799 11.7107 7.49799 11.877C7.49799 12.0433 7.56405 12.2028 7.68164 12.3204C7.79923 12.438 7.95871 12.504 8.125 12.504C8.29129 12.504 8.45077 12.438 8.56836 12.3204L14.1934 6.69536C14.2518 6.63728 14.2982 6.5682 14.3299 6.49211C14.3615 6.41602 14.3778 6.33442 14.3778 6.25201C14.3778 6.16959 14.3615 6.08799 14.3299 6.0119C14.2982 5.93581 14.2518 5.86673 14.1934 5.80865L8.56836 0.183645C8.51014 0.125423 8.44102 0.0792378 8.36494 0.0477278C8.28887 0.0162179 8.20734 1.62311e-09 8.125 0C8.04266 -1.62311e-09 7.96113 0.0162179 7.88506 0.0477278C7.80898 0.0792378 7.73986 0.125423 7.68164 0.183645C7.62342 0.241868 7.57723 0.310989 7.54572 0.38706C7.51421 0.463132 7.49799 0.544665 7.49799 0.627005C7.49799 0.709344 7.51421 0.790878 7.54572 0.866949C7.57723 0.943021 7.62342 1.01214 7.68164 1.07036L12.2422 5.62701Z"
                      fill="#333333"
                    />
                  </svg>
                </Link>
                <Link
                  href={"/"}
                  className="bg-transparent rounded h-10 px-5 flex items-center justify-center mt-2 shadow text-lightGrey text-sm font-nunito font-normal"
                >
                  <Image
                    src={"/play-icon.svg"}
                    width={60}
                    height={60}
                    alt="play icon"
                    className="mr-3"
                  />
                  <span className="text-white hidden md:inline-block">
                    {" "}
                    See video reviews
                  </span>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/3"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
