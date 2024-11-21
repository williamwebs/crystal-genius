"use client";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import Image from "next/image";
import Link from "next/link";
import HeroCard from "./HeroCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HeaderPageCard = () => {
  return (
    <>
      {/* desktop and laptop */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="hidden md:block container mx-auto h-[230px] relative z-30 bg-background"
      >
        <div className="absolute -top-[30%] w-full h-full rounded-lg shadow-lg">
          <div className="flex items-center h-full">
            <div
              className="w-full md:w-1/3 h-full px-4 py-5 bg-cover bg-center rounded-tl-lg rounded-bl-lg"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 119, 204, 1), rgba(0, 119, 204, 1)), url(${"/images/header-card-bg.png"})`,
              }}
            >
              <div className="flex items-start gap-5">
                {/* icon */}
                <div className="w-fit">
                  <Image
                    src={"/hugeicons_structure-04.svg"}
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                {/* content */}
                <div className="flex-1 font-nunito">
                  <h5 className="text-lg text- font-bold text-yellow">
                    Crystal Genius International Limited
                  </h5>
                  <p className="my-2">
                    leads the way in transformative building solutions, setting
                    benchmarks in quality, innovation, and reliability across
                    all construction projects.
                  </p>

                  <Link
                    href={"/"}
                    className="bg-red rounded h-10 w-28 flex items-center justify-center mt-7 shadow text-lightGrey text-sm font-nunito font-normal"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 h-full flex items-start justify-between font-nunito">
              <HeroCard
                src="/simple-icons_blueprint.svg"
                title="Innovative Technology & Precision in Every Project"
                content="Our approach combines craftsmanship with advanced tools and
                  techniques, ensuring every home we build is precise, durable,
                  and designed to meet modern standards."
              />
              <HeroCard
                src="/lucide_leaf.svg"
                title="Sustainable Practices for a Better Tomorrow"
                content="We’re dedicated to building homes that respect the
                  environment, using sustainable materials and methods that
                  promote energy efficiency and eco-friendly living."
              />
              <HeroCard
                src="/nimbus_lightbulb.svg"
                title="Comprehensive Training & Development"
                content="Our experienced team brings skill and integrity to every
                  project, delivering homes that stand the test of time and
                  fulfill your vision for the future."
                className="rounded-tr-lg rounded-br-lg"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* mobile */}
      <div className="md:hidden container mx-auto px-4 my-4">
        <div className="h-full rounded-lg shadow-lg">
          <div className="flex flex-col gap-4 h-full">
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="px-2 py-5 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 119, 204, 1), rgba(0, 119, 204, 1)), url(${"/images/header-card-bg.png"})`,
              }}
            >
              <div className="flex items-start gap-3">
                {/* icon */}
                <div className="w-fit">
                  <Image
                    src={"/hugeicons_structure-04.svg"}
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                {/* content */}
                <div className="flex-1 font-nunito">
                  <h5 className="text-lg text- font-bold text-yellow">
                    Crystal Genius International Limited
                  </h5>
                  <p className="my-2">
                    leads the way in transformative building solutions, setting
                    benchmarks in quality, innovation, and reliability across
                    all construction projects.
                  </p>

                  <Link
                    href={"/"}
                    className="bg-red rounded h-10 w-28 flex items-center justify-center mt-7 shadow text-lightGrey text-sm font-nunito font-normal"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="font-nunito"
            >
              <Swiper
                slidesPerView={1.2}
                spaceBetween={16}
                grabCursor={true}
                navigation={false}
                pagination={false}
                style={{ overflow: "visible" }}
              >
                <SwiperSlide>
                  <HeroCard
                    src="/simple-icons_blueprint.svg"
                    title="Innovative Technology & Precision in Every Project"
                    content="Our approach combines craftsmanship with advanced tools and
                  techniques, ensuring every home we build is precise, durable,
                  and designed to meet modern standards."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <HeroCard
                    src="/lucide_leaf.svg"
                    title="Sustainable Practices for a Better Tomorrow"
                    content="We’re dedicated to building homes that respect the
                  environment, using sustainable materials and methods that
                  promote energy efficiency and eco-friendly living."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <HeroCard
                    src="/nimbus_lightbulb.svg"
                    title="Comprehensive Training & Development"
                    content="Our experienced team brings skill and integrity to every
                  project, delivering homes that stand the test of time and
                  fulfill your vision for the future."
                    className="rounded-tr-lg rounded-br-lg"
                  />
                </SwiperSlide>
              </Swiper>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPageCard;
