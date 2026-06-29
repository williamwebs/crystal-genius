"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import { DrawingsSpanIcon, HouseImage, RightArrowIcon } from "../../constants/images";
import Link from "next/link";

export default function DrawingsHero() {
  return (
    <header className="relative h-[800px] md:h-[650px] -mt-20 sm:-mt-20">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 35, 61, 1), rgba(112, 199, 218, 0.24)), url(${"/images/drawings-hero.svg"})`,
        }}
      >
        {/* Static Text */}
        <div className="w-full h-full text-white">
          <div className="container mx-auto px-4 md:px-0 w-full h-full">
            <div className="flex flex-col justify-evenly w-full h-full">
              <div className="flex flex-col md:flex-row items-center w-full lg:max-w-[780px] justify-between">
                <div className="w-full mt-20">
                  <div
                    // variants={fadeIn("right", 0.2)}
                    // initial="hidden"
                    // whileInView={"show"}
                    // viewport={{ once: false, amount: 0.5 }}
                    className="flex items-center gap-2 max-w-[270px] w-full h-[30px] border border-red rounded-full px-2 bg-red/10"
                  >
                    <DrawingsSpanIcon />
                    <span className="text-white text-xs font-normal">
                      Professional Structural Drawings
                    </span>
                  </div>

                  <h2
                    // variants={fadeIn("right", 0.3)}
                    // initial="hidden"
                    // whileInView={"show"}
                    // viewport={{ once: false, amount: 0.5 }}
                    className="text-5xl text-white font-impact capitalize mt-3 md:mt-8"
                  >
                    <span className="text-red text-[64px] font-impact">
                      Build
                    </span>{" "}
                    with Confidence using{" "}
                    <span className="text-red text-[64px] font-impact">
                      Certified Designs
                    </span>
                  </h2>
                  <p
                    // variants={fadeIn("right", 0.2)}
                    // initial="hidden"
                    // whileInView={"show"}
                    // viewport={{ once: false, amount: 0.5 }}
                    className="text-base text-white font-nunito mt-8 mb-5"
                  >
                    Access a library of professionally engineered structural
                    design drawings. Preview layouts for free, and securely
                    purchase full high-resolution plans Instantly.
                  </p>

                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 h-fit md:h-11 w-full">
                    <Link
                      href={"/housing-clusters"}
                      className="bg-red text-white text-sm hover:bg-red/85 font-nunito font-medium min-w-[130px] md:max-w-[250px] w-full h-10 rounded-[4px] inline-flex items-center justify-center gap-2 border border-transparent"
                    >
                      <HouseImage />
                      Become a Landlord Today
                    </Link>
                    <Link
                      href={"#how-it-works"}
                      className="bg-transparent border border-white hover:bg-red/10 text-white font-nunito text-sm w-full md:max  -w-[189px] h-10 md:h-full px-6 rounded-[6px] transition duration-300 flex items-center justify-center gap-2"
                    >
                      How It Works <RightArrowIcon />
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
