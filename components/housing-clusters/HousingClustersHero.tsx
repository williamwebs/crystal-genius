"use client";

import { HouseImage } from "@/constants/images";
import Link from "next/link";

export default function HousingClustersHero() {
  return (
    <header className="relative h-[700px] md:h-[650px] -mt-20 sm:-mt-20">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 35, 61, 0.9), rgba(112, 199, 218, 0.4)), url(${"/images/housing-hero.svg"})`,
        }}
      >
        {/* Static Text */}
        <div className="w-full h-full text-white">
          <div className="container mx-auto px-4 md:px-0 w-full h-full">
            <div className="flex flex-col justify-center w-full h-full pt-20">
              <div className="flex flex-col md:flex-row items-center w-full justify-between">
                <div className="w-full md:w-2/3">
                  <span className="text-white text font-nunito font-medium mb-3 inline-block">
                    Affordable Property Ownership
                  </span>
                  <h2 className="text-4xl md:text-5xl text-white font-impact font-normal capitalize mt-2 max-w-2xl leading-tight">
                    Own A Home In{" "}
                    <span className="text-yellow text-4xl md:text-5xl font-impact font-normal">
                      Lagos
                    </span>{" "}
                    <br />
                    Together, Not Alone.
                  </h2>
                  <p className="text-base text-white font-nunito font-medium mt-5 mb-6 max-w-xl leading-relaxed">
                    Turning ₦25M into Homeownership through strategic investor
                    pooling and expert development. The cure for common
                    unprofessionalism.
                  </p>

                  {/* button */}
                  <Link
                    href="#housing-clusters"
                    className="bg-red text-white text-sm hover:bg-red/85 font-nunito font-medium min-w-[130px] md:max-w-[250px] w-full h-10 rounded-[4px] inline-flex items-center justify-center gap-2 mt-5"
                  >
                    <HouseImage /> Become a Homeowner Today
                  </Link>
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
