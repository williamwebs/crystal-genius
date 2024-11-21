"use client";

import Image from "next/image";
import List from "../list/List";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

interface Props {
  image: string;
  heading: string;
  paragraph: string;
  lists: string[];
}

const ServiceCard = ({ image, heading, paragraph, lists }: Props) => {
  return (
    <motion.div
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="bg-white h-fit p-3 md:p-4 rounded-md shadow"
    >
      {/* image */}
      <div className="w-full h-full rounded max-h-52">
        <Image
          src={image}
          width={380}
          height={206}
          alt={heading}
          className="select-none pointer-events-none w-full md:h-52 object-cover rounded"
          style={{ userSelect: "none" }}
        />
      </div>

      <div className="w-[97%] mx-auto h-full flex flex-col gap-4 -mt-4 font-nunito">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="py-2 bg-accentBlue rounded-tr-3xl rounded-bl-3xl text-md text-white text-center font-medium"
        >
          {heading}
        </motion.div>
        <motion.p
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="text-grey"
        >
          {paragraph}
        </motion.p>
        <div className="">
          {lists.map((list, index) => (
            <List key={index} description={list} />
          ))}
        </div>

        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <Link
            href={"/service"}
            className="bg-lightGrey rounded h-10 w-full md:w-2/3 mx-auto flex items-center justify-center mt-5 shadow text-dark text-sm font-nunito font-medium"
          >
            Explore service
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
