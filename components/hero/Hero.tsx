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
    "/images/hero-1.png",
    "/images/hero-2.png",
    "/images/hero-3.png",
    "/images/hero-4.png",
    "/images/hero-5.png", // replace this with video
  ];

  return (
    <header className="relative h-[700px] md:h-[600px] -mt-20 sm:-mt-0">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
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
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${image})`,
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
              <motion.h1
                variants={fadeIn("right", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className="text-5xl text-white font-impact max-w-2xl mt-10 sm:mt-0"
              >
                Pioneering innovation and setting new standards of excellence in
                building construction.
              </motion.h1>
              <motion.p
                variants={fadeIn("left", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className="text-base text-gray-300 font-nunito my-5 max-w-xl"
              >
                Crystal Genius International Limited leads the way in
                transformative building solutions, setting benchmarks in
                quality, innovation, and reliability across all construction
                projects.
              </motion.p>

              {/* cta */}
              <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.5 }}
                className="flex items-center justify-between md:justify-normal gap-1"
              >
                <Link
                  href={"/about-us"}
                  className="bg-transparent border border-red rounded w-full md:w-fit h-10 px-12 flex items-center justify-center mt-2 shadow text-lightGrey text-sm font-nunito font-normal"
                >
                  Learn more
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
              </motion.div>
            </div>
            <div className="w-full md:w-1/3"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
