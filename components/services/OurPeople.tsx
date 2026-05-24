import Image from "next/image";
import React from "react";

type Props = {
  role: string;
  name: string;
  image: string;
  title: string;
  text?: string[]
};

const OurPeople = ({ role, name, image, title, text }: Props) => {
  return (
    <section className="bg-[#F3F6F8] pb-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-start gap-[50px] md:gap-[100px]">
        <div className="flex flex-col gap-5 max-w-[578px]">
          <div className="flex flex-col">
            <span className="p-0 text-[#002E44] text-xs md:text-sm font-bold uppercase ">
              Our People
            </span>
            <h3 className="font-normal font-nunito text-[#002E44] text-[28px] sm:text-[32px] md:text-[48px] -mt-1 ">
              {role}
            </h3>
          </div>
          {text && (
            <div className="space-y-2">
              {text.map((t) => (
                <p key={t} className="font-normal font-nunito text-[#777777] text-sm ">
                  {t}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="w-full max-w-[250px] mx-auto md:mx-0 flex flex-col gap-2 ">
          <div className="h-[310px] w-full relative  overflow-hidden ">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover select-none pointer-events-none"
              draggable={false}
              quality={100}
            />
          </div>

          <div className="flex flex-col text-center md:text-left">
            <h4 className="text-[#2B2B2B] text-lg font-nunito font-medium">
              {name}
            </h4>
            <p className="text-[#777777] text-sm font-normal font-nunito">
              {title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPeople;
