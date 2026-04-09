import Image from "next/image";
import React from "react";
import {
  AreaIcon,
  FloorIcon,
  LockIcon,
  TypeIcon,
} from "../../constants/images";

const DrawingsCard = () => {
  return (
    <div className="flex flex-col h-[640px] rounded-[12px] overflow-hidden shadow">
      <div className="h-[281px] w-full relative flex gap-1">
        {/* absolute text */}
        <div className="absolute top-3 left-3 bg-red dark-shadow w-[80px] h-[24px] rounded flex items-center justify-center text-white text-[11px] uppercase">
          Featured
        </div>
        {/* main image */}
        <div className="w-1/2 md:w-[280px] h-[280px] relative">
          <Image
            src={"/images/building-2.png"}
            fill
            alt="architectural design"
            className="object-cover"
          />
        </div>
        {/* other images in col */}
        <div className="flex-1 h-full">
          <div className="grid grid-cols-1 gap-1 h-full">
            <div className="w-full h-full relative">
              <Image
                src={"/images/building-1.png"}
                fill
                alt="architectural design"
                className="object-cover"
              />
            </div>
            <div className="w-full h-full relative">
              <Image
                src={"/images/building-3.png"}
                fill
                alt="architectural design"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[#333333] text-[17px] md:text-[19px] font-nunito font-extrabold">
            Modern Residential Villa
          </h3>
          <span className="bg-[#FFE5E5] h-10 min-w-[66px] flex items-center justify-center rounded px-2 font-extrabold font-nunito text-red text-[18px] md:text-[19px]">
            $150
          </span>
        </div>

        <p className="text-dark text-sm font-nunito font-bold my-3 h-[70px]">
          A contemporary 4-bedroom villa design featuring open-plan living
          areas, reinforced concrete frame structure, and cantilevered
          balconies. Includes full foundation details and roof framing plans.
        </p>

        <div className="my-10 h-[64px] grid grid-cols-3">
          <div className="h-full flex flex-col items-center">
            <AreaIcon />
            <span className="text-paragraphGrey text-[11px] font-nunito font-bold">
              Area
            </span>
            <span className="text-dark text-sm font-nunito font-extrabold">
              3,200 sq.ft
            </span>
          </div>
          <div className="h-full flex flex-col items-center">
            <FloorIcon />
            <span className="text-paragraphGrey text-[11px] font-nunito font-bold">
              Floors
            </span>
            <span className="text-dark text-sm font-nunito font-extrabold">
              2 Stories
            </span>
          </div>
          <div className="h-full flex flex-col items-center">
            <TypeIcon />
            <span className="text-paragraphGrey text-[11px] font-nunito font-bold">
              Type
            </span>
            <span className="text-dark text-sm font-nunito font-extrabold">
              Residential
            </span>
          </div>
        </div>

        <button className="bg-red hover:bg-red/80 rounded h-10 flex items-center justify-center gap-2 w-full transition-colors duration-150">
          <LockIcon />
          <span className="text-white text-sm font-nunito font-normal">
            Unlock Full Design
          </span>
        </button>
      </div>
    </div>
  );
};

export default DrawingsCard;
