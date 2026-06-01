"use client";

import Link from "next/link";

export default function HousingClustersHero() {
  return (
    <header className="relative h-[700px] md:h-[650px] -mt-20 sm:-mt-20">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 35, 61, 0.9), rgba(112, 199, 218, 0.4)), url(${"/images/hero-1.png"})`,
        }}
      >
        {/* Static Text */}
        <div className="w-full h-full text-white">
          <div className="container mx-auto px-4 md:px-0 w-full h-full">
            <div className="flex flex-col justify-center w-full h-full pt-20">
              <div className="flex flex-col md:flex-row items-center w-full justify-between">
                <div className="w-full md:w-2/3">
                  <span className="text-white text-sm font-nunito font-medium mb-2 block uppercase tracking-wider">
                    Crystal Genius International
                  </span>
                  <h2 className="text-5xl md:text-6xl text-white font-impact capitalize mt-2 max-w-2xl leading-tight">
                    Own A Home In <span className="text-yellow">Lagos</span> <br />
                    Together, Not Alone.
                  </h2>
                  <p className="text-base text-gray-300 font-nunito my-6 max-w-xl leading-relaxed">
                    Join a verified housing cluster and pool funds with up to 4 to 6 people to co-own a building block or estate without the heavy financial burden.
                  </p>

                  {/* button */}
                  <a href="#contact-us" className="bg-red hover:bg-red/90 transition-colors rounded-[4px] px-8 w-fit flex items-center justify-center h-12 text-[15px] text-white font-nunito font-bold mt-8 shadow-lg">
                    Become a Homeowner Today
                  </a>
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
