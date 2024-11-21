"use client";

import Image from "next/image";
import List from "../list/List";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

const AboutUs = () => {
  return (
    <section className="container mx-auto py-20 px-4 md:px-0">
      {/* desktop view */}
      <div className="hidden md:flex flex-col md:flex-row items-end justify-between gap-10">
        <div className="w-full md:w-3/5">
          <motion.span
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            About us
          </motion.span>

          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="text-5xl text-dark font-impact max-w-lg font-normal my-5"
          >
            We Build everything you can need
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="my-2 text-grey max-w-2xl md:pr-10"
          >
            Our comprehensive suite of services spans various sectors, including
            infrastructure, urban development, energy, research and development,
            and project management.
          </motion.p>
          <div className="my-8">
            <List description="Quality construction tailored to your vision and lifestyle." />
            <List description="Sustainable designs that prioritize energy savings and environmental impact." />
            <List description="Seamless coordination from concept to completion for on-time delivery." />
          </div>

          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="flex items-start justify-between gap-5 max-w-lg"
          >
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-5">
                <Image src={"/call-frame.svg"} width={44} height={44} alt="" />
                <div className="flex flex-col items-start justify-between gap-1">
                  <p className="text-dark text-base font-bold">
                    +234 806 945 2707
                  </p>
                  <p className="text-paragraphGrey text-xs">Contact Us</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-5">
                <Image src={"/vincent.svg"} width={44} height={44} alt="" />
                <div className="flex flex-col items-start justify-between gap-1">
                  <p className="text-dark text-base font-bold">Engr Vincent</p>
                  <p className="text-paragraphGrey text-xs">Respondent</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* image / video */}
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="w-full mt-10"
          >
            <Image
              src={"/images/video-playback.png"}
              width={734}
              height={429}
              alt="video playback"
              className="select-none pointer-events-none"
              style={{ userSelect: "none" }}
            />
          </motion.div>
        </div>
        <div className="w-full md:w-2/5">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            <Image
              src={"/images/engineer.png"}
              width={510}
              height={624}
              alt="engineer holding a tablet"
              className="select-none pointer-events-none rounded-tr-[100px]"
              style={{ userSelect: "none" }}
            />
          </motion.div>

          <motion.p
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="my-10 text-grey max-w-lg pr-24"
          >
            Our services cover all aspects of construction, from residential and
            urban development to energy solutions, research, and full project
            management.
          </motion.p>

          <motion.a
            href="#testimonial"
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="bg-red rounded h-10 px-16 flex items-center justify-center mt-7 shadow text-lightGrey text-sm font-nunito font-normal"
          >
            Hear From Clients
          </motion.a>
        </div>
      </div>

      {/* mobile view */}
      <div className="md:hidden flex flex-col items-end justify-between gap-10">
        <div className="w-full">
          <motion.span
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            About us
          </motion.span>

          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="text-5xl text-dark font-impact max-w-lg font-normal my-5"
          >
            We Build everything you can need
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="my-2 text-grey max-w-2xl md:pr-10"
          >
            Our comprehensive suite of services spans various sectors, including
            infrastructure, urban development, energy, research and development,
            and project management.
          </motion.p>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full h-[450px] rounded-tr-[100px] mt-8"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${"/images/engineer.png"})`,
            }}
          >
            <div className="w-full h-full flex items-end px-3">
              <div className="mb-10">
                <motion.p
                  variants={fadeIn("right", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                  className="my-5 text-white text-base"
                >
                  Our services cover all aspects of construction, from
                  residential and urban development to energy solutions,
                  research, and full project management.
                </motion.p>
                <motion.a
                  href="#testimonial"
                  variants={fadeIn("right", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                  className="bg-red rounded h-10 px-16 flex items-center justify-center mt-2 shadow text-lightGrey text-sm font-nunito font-normal"
                >
                  Hear From Clients
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* image / video */}
          <div className="w-full mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div>
                <List description="Quality construction tailored to your vision and lifestyle." />
                <List description="Sustainable designs that prioritize energy savings and environmental impact." />
                <List description="Seamless coordination from concept to completion for on-time delivery." />
              </div>

              <div className="">
                <motion.div
                  variants={fadeIn("right", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.5 }}
                  className="flex items-center gap-5 my-3 shadow rounded p-1"
                >
                  <Image
                    src={"/call-frame.svg"}
                    width={44}
                    height={44}
                    alt=""
                  />
                  <div className="flex flex-col items-start justify-between gap-1">
                    <p className="text-dark text-base font-bold">
                      +234 806 945 2707
                    </p>
                    <p className="text-paragraphGrey text-sm">Contact Us</p>
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeIn("right", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.5 }}
                  className="flex items-center gap-5 my-3 shadow rounded p-1"
                >
                  <Image src={"/vincent.svg"} width={44} height={44} alt="" />
                  <div className="flex flex-col items-start justify-between gap-1">
                    <p className="text-dark text-base font-bold">
                      Engr Vincent
                    </p>
                    <p className="text-paragraphGrey text-sm">Respondent</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
            >
              <Image
                src={"/images/video-playback.png"}
                width={734}
                height={429}
                alt="video playback"
                className="select-none pointer-events-none"
                style={{ userSelect: "none" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
