"use client";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

import Image from "next/image";

const Steps = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-14">
      {/* 01 */}
      <div className="relative">
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="flex flex-col gap-3 mx-2"
        >
          <Image src={"/step-1.svg"} width={80} height={80} alt="" />
          <h5 className="text-grey font-normal font-impact text-2xl">
            Consultation & Planning
          </h5>
          <p className="my-2 text-grey">
            We start by understanding your vision, requirements, and project
            goals. Our consultation process focuses on aligning our expertise
            with your needs, ensuring a clear path forward.
          </p>
          <h6 className="font-impact font-normal text-[90px] text-yellow text-clip -mt-12 number_">
            01
          </h6>
        </motion.div>
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="hidden md:block absolute top-[20%] -right-6"
        >
          <Image src={"/arrow-1.svg"} width={80} height={80} alt="" />
        </motion.div>
      </div>

      {/* 02 */}
      <div className="relative">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="flex flex-col gap-3 mx-2 mt-40"
        >
          <Image src={"/step-2.svg"} width={80} height={80} alt="" />
          <h5 className="text-grey font-normal font-impact text-2xl">
            Innovative Design & Technology
          </h5>
          <p className="my-2 text-grey">
            Using advanced tools like photogrammetry, we transform your vision
            into detailed and efficient designs. Our technology-driven approach
            enhances accuracy and adaptability from the start.
          </p>
          <h6 className="font-impact font-normal text-[90px] text-yellow text-clip -mt-12 number_">
            02
          </h6>
        </motion.div>
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="hidden md:block absolute top-[25%] right-0"
        >
          <Image src={"/arrow-2.svg"} width={80} height={80} alt="" />
        </motion.div>
      </div>

      {/* 03 */}
      <div className="relative">
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="flex flex-col gap-3 mx-2 -mt-52 md:mt-0"
        >
          <Image src={"/step-3.svg"} width={80} height={80} alt="" />
          <h5 className="text-grey font-normal font-impact text-2xl">
            Precision Mapping & Surveying
          </h5>
          <p className="my-2 text-grey">
            Through drone mapping, aerial and topographical surveys, we offer
            precise, data-rich insights essential for informed decision-making
            and project planning.
          </p>
          <h6 className="font-impact font-normal text-[90px] text-yellow text-clip -mt-12 number_">
            03
          </h6>
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="hidden md:block absolute top-[15%] -right-10"
        >
          <Image src={"/arrow-3.svg"} width={80} height={80} alt="" />
        </motion.div>
      </div>

      {/* 04 */}
      <div className="relative">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="flex flex-col gap-3 mx-2 md:mt-40"
        >
          <Image src={"/step-4.svg"} width={80} height={80} alt="" />
          <h5 className="text-grey font-normal font-impact text-2xl">
            Sustainable Construction & Quality Assurance
          </h5>
          <p className="my-2 text-grey">
            We prioritize sustainable practices and rigorous quality control at
            every stage, ensuring lasting value and compliance with
            environmental and safety standards.
          </p>
          <h6 className="font-impact font-normal text-[90px] text-yellow text-clip -mt-12 number_">
            04
          </h6>
        </motion.div>

        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="hidden md:block absolute top-[25%] right-0"
        >
          <Image src={"/arrow-4.svg"} width={80} height={80} alt="" />
        </motion.div>
      </div>

      {/* 05 */}
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="flex flex-col gap-3 mx-2 -mt-52 md:mt-0"
      >
        <Image src={"/step-5.svg"} width={80} height={80} alt="" />
        <h5 className="text-grey font-normal font-impact text-2xl">
          Training & Capacity Development
        </h5>
        <p className="my-2 text-grey">
          Our Training & Capacity Development program is designed to empower
          individuals and organizations by equipping them with the essential
          skills, knowledge, and competencies needed to thrive in today’s
          dynamic environment.
        </p>
        <h6 className="font-impact font-normal text-[90px] text-yellow text-clip -mt-12 number_">
          05
        </h6>
      </motion.div>
    </div>
  );
};

export default Steps;
