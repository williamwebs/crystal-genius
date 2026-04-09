"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import { DrawingsSpanIcon, RightArrowIcon } from "../../constants/images";

export default function DrawingsHero() {
  return (
    <header className="relative h-[700px] md:h-[600px] -mt-20 sm:-mt-0">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${"/images/drawings-hero.svg"})`,
        }}
      >
        {/* Static Text */}
        <div className="w-full h-full text-white">
          <div className="container mx-auto px-4 md:px-0 w-full h-full">
            <div className="flex flex-col justify-evenly w-full h-full">
              <div className="flex flex-col md:flex-row items-center w-full lg:w-1/2 justify-between">
                <div className="w-full mt-20">
                  <motion.div
                    variants={fadeIn("right", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.5 }}
                    className="flex items-center gap-2 max-w-[270px] w-full h-[30px] border border-red rounded-full px-2 bg-red/10"
                  >
                    <DrawingsSpanIcon />
                    <span className="text-white text-xs font-normal">
                      Professional Structural Drawings
                    </span>
                  </motion.div>

                  <motion.h2
                    variants={fadeIn("right", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.5 }}
                    className="text-5xl text-white font-impact capitalize mt-3 md:mt-8"
                  >
                    <span className="text-red text-[64px] font-impact">
                      Build
                    </span>{" "}
                    with Confidence using{" "}
                    <span className="text-red text-[64px] font-impact">
                      Certified Designs
                    </span>
                  </motion.h2>
                  <motion.p
                    variants={fadeIn("right", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.5 }}
                    className="text-base text-white font-nunito mt-8 mb-5"
                  >
                    Access a library of professionally engineered structural
                    design drawings. Preview layouts for free, and securely
                    purchase full high-resolution plans Instantly.
                  </motion.p>

                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 h-fit md:h-11 w-full md:w-fit">
                    <motion.button
                      variants={fadeIn("right", 0.4)}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: false, amount: 0.5 }}
                      className="bg-red hover:bg-red/80 text-white font-nunito text-sm w-full md:w-[189px] h-11 md:h-full px-6 rounded-[6px] transition duration-300"
                    >
                      Browse Designs
                    </motion.button>
                    <motion.button
                      variants={fadeIn("right", 0.4)}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: false, amount: 0.5 }}
                      className="bg-transparent border border-white hover:bg-red/10 text-white font-nunito text-sm w-full md:w-[189px] h-11 md:h-full px-6 rounded-[6px] transition duration-300 flex items-center justify-center gap-2"
                    >
                      How It Works <RightArrowIcon/>
                    </motion.button>
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
