"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

const Expertise = () => {
  return (
    <motion.section
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="py-20 bg-[#F3FAFF] relative px-4 md:px-0"
    >
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-start justify-between gap-10">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="w-full md:w-1/2"
        >
          <Image
            src={"/images/home-1.png"}
            width={540}
            height={545}
            alt="engineer holding a tablet"
            className="select-none pointer-events-none w-full h-full object-cover rounded-b-[50px]"
            style={{ userSelect: "none" }}
          />
        </motion.div>
        <div className="w-full md:w-1/2">
          <motion.span
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="capitalize"
          >
            expertise
          </motion.span>

          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="text-5xl text-dark font-impact max-w-lg font-normal my-5"
          >
            We Build everything you can need
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="my-2 text-grey max-w-xl pr-10"
          >
            We specialize in delivering comprehensive construction services,
            crafting innovative solutions that cater to residential, commercial,
            and industrial needs. From designing modern homes to executing
            large-scale projects, we ensure excellence in every detail. Our team
            combines expertise and advanced methods to bring your vision to life
            efficiently and reliably.
          </motion.p>

          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Link
              href={"/"}
              className="bg-transparent border border-red rounded h-10 w-28 flex items-center justify-center mt-7 shadow text-red text-sm font-nunito font-medium"
            >
              Get started
            </Link>
          </motion.div>
        </div>
      </div>

      {/* desktop */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="hidden md:block absolute right-0 -bottom-[40%] -translate-y-[40%]"
      >
        <Image
          src={"/images/absolute-house.png"}
          width={350}
          height={313}
          alt="engineer holding a tablet"
          className="select-none pointer-events-none w-full h-full object-cover"
          style={{ userSelect: "none" }}
        />
      </motion.div>

      {/* mobile */}
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="md:hidden absolute top-0 right-0 md:-bottom-[45%] md:-translate-y-[45%]"
      >
        <Image
          src={"/images/absolute-house.png"}
          width={350}
          height={313}
          alt="engineer holding a tablet"
          className="select-none pointer-events-none w-full h-full object-cover"
          style={{ userSelect: "none" }}
        />
      </motion.div>
    </motion.section>
  );
};

export default Expertise;
