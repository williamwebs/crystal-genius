"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

interface Props {
  description: string;
}

const List = ({ description }: Props) => {
  return (
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="flex items-center gap-2 my-1"
    >
      {/* icon */}
      <Image src={"/lets-icons_check-fill.svg"} width={24} height={24} alt="" />
      {/* content */}
      <p className="font-semibold text-dark text-sm">{description}</p>
    </motion.div>
  );
};

export default List;
