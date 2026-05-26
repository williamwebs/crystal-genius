"use client";

import Image from "next/image";
import {motion } from 'framer-motion'
import {fadeIn} from '../../variants/variant'

export default function ServicePageHero() {
  return (
    <header className="relative h-[700px] md:h-[650px] -mt-20 sm:-mt-20">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 35, 61, 1), rgba(112, 199, 218, 0.24)), url(${"/images/service-hero.svg"})`,
        }}
      >
        {/* Static Text */}
        <div className="w-full h-full text-white">
          <div className="container mx-auto px-4 md:px-0 w-full h-full">
            <div className="flex flex-col justify-evenly w-full h-full">
              <div className="flex flex-col md:flex-row items-center w-full justify-between">
                <div className="w-full md:w-2/3 mt-20">
                  <span
                    // variants={fadeIn("right", 0.2)}
                    // initial="hidden"
                    // whileInView={"show"}
                    // viewport={{ once: true, amount: 0.5 }}
                  >
                    Service
                  </span>
                  <h2
                    // variants={fadeIn("right", 0.3)}
                    // initial="hidden"
                    // whileInView={"show"}
                    // viewport={{ once: true, amount: 0.5 }}
                    className="text-5xl text-white font-impact capitalize mt-7"
                  >
                    Explore our service offerings
                  </h2>
                  <p
                    // variants={fadeIn("right", 0.2)}
                    // initial="hidden"
                    // whileInView={"show"}
                    // viewport={{ once: true, amount: 0.5 }}
                    className="text-base text-gray-300 font-nunito my-5 max-w-2xl"
                  >
                    Our comprehensive suite of services spans various sectors,
                    including infrastructure, urban development, energy,
                    research and development, and project management.
                  </p>

                  {/* button */}
                  <a href={"#contact-form"} className="border border-red rounded-[4px] max-w-[230px] w-full flex items-center justify-center h-10 text-[14px] text-white font-nunito font-medium mt-10 ">
                    Speak to a Consultant
                  </a>
                </div>
                <div className="w-full md:w-1/3"></div>
              </div>

              <div
                // variants={fadeIn("up", 0.3)}
                // initial="hidden"
                // whileInView={"show"}
                // viewport={{ once: true, amount: 0.5 }}
                className="w-full text-center"
              >
                <Image
                  src={"/play-icon.svg"}
                  width={74}
                  height={74}
                  alt="play icon"
                  className="mx-auto cursor-pointer"
                />
                <span className="font-nunito text-xs text-white font-bold text-center my-2 block">
                  See Video reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
