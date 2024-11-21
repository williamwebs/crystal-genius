"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

const NeedOurService = () => {
  return (
    <motion.section
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="py-10 mb-40 bg-[#393939]"
    >
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-betweem flex-col-reverse md:flex-row gap-10">
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="w-full md:w-1/3"
          >
            <Image
              src={"/images/need-our-service.png"}
              width={534}
              height={609}
              alt="house illustration"
              className=" select-none pointer-events-none -ml-10 -mb-10"
              style={{ userSelect: "none" }}
            />
          </motion.div>
          <div className="w-full md:w-2/3">
            <motion.span
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="text-[#D6D6D6]"
            >
              Need any of our services?
            </motion.span>

            <motion.h3
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="text-5xl text-white font-impact font-normal max-w-2xl my-5"
            >
              Starting is incredibly simple,take the first step toward your
              goals today.
            </motion.h3>
            {/* button */}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default NeedOurService;
