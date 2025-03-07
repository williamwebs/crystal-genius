"use client";

import Image from "next/image";
import {motion } from 'framer-motion'
import {fadeIn} from '../../variants/variant'

export default function ArticlePageHero() {
  return (
    <header className="relative h-[700px] md:h-[600px] -mt-20 sm:-mt-0">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${"/images/article-hero.png"})`,
        }}
      >
        {/* Static Text */}
        <div className="w-full h-full text-white">
          <div className="container mx-auto px-4 md:px-0 w-full h-full">
            <div className="flex flex-col justify-evenly w-full h-full">
              <div className="flex flex-col md:flex-row items-center w-full justify-between">
                <div className="w-full md:w-2/3 mt-20">
                  <motion.span
                    variants={fadeIn("right", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    News Article
                  </motion.span>
                  <motion.h2
                    variants={fadeIn("right", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.5 }}
                    className="text-5xl text-white font-impact capitalize mt-7"
                  >
                    Insights and Innovations in Building and Construction
                  </motion.h2>
                  <motion.p
                    variants={fadeIn("right", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.5 }}
                    className="text-base text-gray-300 font-nunito my-5 max-w-2xl"
                  >
                    Explore articles on the latest industry trends, cutting-edge
                    technologies, and expert insights to stay informed and
                    inspired in the world of construction.
                  </motion.p>

                  {/* button */}
                </div>
                <div className="w-full md:w-1/3"></div>
              </div>

              <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.5 }}
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
