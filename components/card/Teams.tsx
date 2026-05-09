"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

interface Props {
  image: string;
  name: string;
  qualification: string;
  role: string;
}

const Teams = ({ image, name, qualification, role }: Props) => {
  return (
    <div
      // variants={fadeIn("down", 0.2)}
      // initial="hidden"
      // whileInView={"show"}
      // viewport={{ once: false, amount: 0.5 }}
      className="bg-white border border-lightGrey rounded-lg p-3"
    >
      <div className="bg-[#D4D4D4] rounded-lg overflow-hidden w-full h-[340px] relative">
        <Image
          src={image}
          alt={name}
          fill
          quality={100}
          className="object-cover select-none pointer-events-none"
          style={{ userSelect: "none" }}
        />
      </div>
      <div className="mt-2 font-nunito text-dark text-center">
        <h5
          // variants={fadeIn("right", 0.3)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          className="font-bold text-xl"
        >
          {name}
        </h5>
        <p
          // variants={fadeIn("right", 0.4)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          className="font-medium text-dark"
        >
          {qualification}
        </p>

        <span
          // variants={fadeIn("right", 0.5)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          className="font-normal italic text-paragraphGrey text-xs mt-2 block"
        >
          {role}
        </span>
      </div>
    </div>
  );
};

export default Teams;
