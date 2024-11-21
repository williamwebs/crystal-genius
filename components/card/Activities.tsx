"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

interface Props {
  image: string;
  title: string;
  description: string;
}

const ActivityCard = ({ image, title, description }: Props) => {
  return (
    <motion.div
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.5 }}
    >
      <Link href={"/article"} className="">
        <Image
          src={image}
          width={548}
          height={340}
          alt={title}
          className="select-none pointer-events-none w-full max-h-[150px] md:h-[200px] rounded object-cover object-center"
          style={{ userSelect: "none" }}
        />

        <div className="text-left font-nunito mt-3 flex flex-col gap-1 md:gap-2">
          <motion.h3
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="font-bold text-lg md:text-2xl text-[#555555]"
          >
            {title}
          </motion.h3>
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="text-paragraphGrey"
          >
            {description}
          </motion.p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ActivityCard;
