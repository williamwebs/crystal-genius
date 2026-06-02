"use client";

import {motion } from 'framer-motion'
import { fadeIn } from '../../variants/variant'
import { HouseImage } from '@/constants/images';
import Link from 'next/link';

interface InnerServicesHeroProps {
  routeText?: string;
  title: string;
  description: string;
  backgroundImage: string;
  showButton?: boolean;
  buttonText?: string;
  buttonHref?: string;
  isServicePage?: boolean;
}

export default function InnerServicesHero({
  routeText = "Service",
  title,
  description,
  backgroundImage = "/images/service-hero.png",
  showButton = true,
  buttonText = "Get in touch",
  buttonHref = "/",
  isServicePage=false
}: InnerServicesHeroProps) {
  return (
    <header className="relative h-[700px] md:h-[650px] -mt-20 sm:-mt-20">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 35, 61, 1), rgba(112, 199, 218, 0.24)), url(${backgroundImage})`,
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
                    {routeText}
                  </span>
                  <h2
                    // variants={fadeIn("right", 0.3)}
                    // initial="hidden"
                    // whileInView={"show"}
                    // viewport={{ once: true, amount: 0.5 }}
                    className="text-5xl text-white font-impact capitalize mt-5"
                  >
                    {title}
                  </h2>
                  <p
                    // variants={fadeIn("right", 0.2)}
                    // initial="hidden"
                    // whileInView={"show"}
                    // viewport={{ once: true, amount: 0.5 }}
                    className="text-base text-[#EFEFEF] font-nunito font-medium my-5 max-w-[650px]"
                  >
                    {description}
                  </p>

                  {
                    showButton &&
                    <Link
                      href={buttonHref}
                      // variants={fadeIn("right", 0.2)}
                      // initial="hidden"
                      // whileInView={"show"}
                      // viewport={{ once: true, amount: 0.5 }}
                      className="bg-red text-white text-sm hover:bg-red/85 font-nunito font-medium min-w-[130px] md:max-w-[250px] w-full h-10 rounded-[4px] inline-flex items-center justify-center gap-2 mt-5"
                      >
                        {
                          isServicePage &&
                          <HouseImage />}
                      {buttonText}
                    </Link>}
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
