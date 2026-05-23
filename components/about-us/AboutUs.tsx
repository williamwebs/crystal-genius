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
          <span
          // variants={fadeIn("left", 0.3)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.7 }}
          >
            About us
          </span>

          <h2
            // variants={fadeIn("right", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="text-5xl text-dark font-impact max-w-xl font-normal my-5"
          >
            From Visionary Blueprint to Structural Reality.
          </h2>
          <p
            // variants={fadeIn("right", 0.3)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="my-2 text-grey max-w-2xl md:pr-10"
          >
            Our current operations drive project certainty through precision
            Architectural Drawing, heavy Structural/Infrastructural Design, &
            professional Soil Testing & Subsurface Analysis.
          </p>
          <div className="my-8">
            <List description="Quality construction tailored to your vision and lifestyle." />
            <List description="Sustainable designs that prioritize energy savings and environmental impact." />
            <List description="Seamless coordination from concept to completion for on-time delivery." />
          </div>

          <div
            // variants={fadeIn("right", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="flex items-start justify-between gap-3 max-w-[420px]"
          >
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2">
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
              <div className="flex items-center gap-2">
                <Image
                  src={"/vincent-small.svg"}
                  width={44}
                  height={44}
                  alt=""
                />
                <div className="flex flex-col items-start justify-between gap-1">
                  <p className="text-dark text-base font-bold">Engr Vincent</p>
                  <p className="text-paragraphGrey text-xs">Respondent</p>
                </div>
              </div>
            </div>
          </div>

          {/* image / video */}
          <div
            // variants={fadeIn("up", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.5 }}
            className="w-full mt-10"
          >
            <Image
              src={"/images/video-playback.svg"}
              width={734}
              height={429}
              alt="video playback"
              className="select-none pointer-events-none"
              style={{ userSelect: "none" }}
            />
          </div>
        </div>
        <div className="w-full md:w-2/5">
          <div
          // variants={fadeIn("right", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.7 }}
          >
            <Image
              src={"/images/engineer.png"}
              width={510}
              height={624}
              alt="engineer holding a tablet"
              className="select-none pointer-events-none rounded-tr-[100px]"
              style={{ userSelect: "none" }}
            />
          </div>

          <p
            // variants={fadeIn("up", 0.3)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="my-5 text-grey max-w-lg pr-24"
          >
            Our expertise encompasses the full construction lifecycle, spanning
            high-precision Architectural Strategy, Structural and
            Infrastructural Engineering, and data-driven Geotechnical
            Intelligence. all anchored by world-class project management.
          </p>

          <a
            href="/service"
            // variants={fadeIn("up", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="bg-red rounded h-10 flex items-center justify-center mt-4 shadow text-lightGrey text-sm font-nunito font-normal max-w-[200px]"
          >
            Learn About Our Services
          </a>
        </div>
      </div>

      {/* mobile view */}
      <div className="md:hidden flex flex-col items-end justify-between gap-10">
        <div className="w-full">
          <span
          // variants={fadeIn("right", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.7 }}
          >
            About us
          </span>

          <h2
            // variants={fadeIn("right", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="text-5xl text-dark font-impact max-w-lg font-normal my-5"
          >
            From Visionary Blueprint to Structural Reality.
          </h2>
          <p
            // variants={fadeIn("right", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="my-2 text-grey max-w-2xl md:pr-10"
          >
            Our current operations drive project certainty through precision
            Architectural Drawing, heavy Structural/Infrastructural Design, &
            professional Soil Testing & Subsurface Analysis.
          </p>

          <div
            // variants={fadeIn("left", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.3 }}
            className="w-full h-[450px] rounded-tr-[100px] mt-8"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${"/images/engineer.png"})`,
            }}
          >
            <div className="w-full h-full flex items-end px-3">
              <div className="mb-10">
                <p
                  // variants={fadeIn("right", 0.3)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.7 }}
                  className="my-5 text-white text-base"
                >
                  Our expertise encompasses the full construction lifecycle,
                  spanning high-precision Architectural Strategy, Structural and
                  Infrastructural Engineering, and data-driven Geotechnical
                  Intelligence. all anchored by world-class project management.
                </p>
                <a
                  href="#testimonial"
                  // variants={fadeIn("right", 0.2)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.7 }}
                  className="bg-red rounded h-10 flex items-center justify-center mt-2 shadow text-lightGrey text-sm font-nunito font-normal max-w-[200px]"
                >
                  Learn About Our Services
                </a>
              </div>
            </div>
          </div>

          {/* image / video */}
          <div className="w-full mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div>
                <List description="Quality construction tailored to your vision and lifestyle." />
                <List description="Sustainable designs that prioritize energy savings and environmental impact." />
                <List description="Seamless coordination from concept to completion for on-time delivery." />
              </div>

              <div className="">
                <div
                  // variants={fadeIn("right", 0.2)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.5 }}
                  className="flex items-center gap-3 my-3 shadow rounded p-1"
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
                </div>
                <div
                  // variants={fadeIn("right", 0.2)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.5 }}
                  className="flex items-center gap-3 my-3 shadow rounded p-1"
                >
                  <Image src={"/vincent-small.svg"} width={44} height={44} alt="" />
                  <div className="flex flex-col items-start justify-between gap-1">
                    <p className="text-dark text-base font-bold">
                      Engr Vincent
                    </p>
                    <p className="text-paragraphGrey text-sm">Respondent</p>
                  </div>
                </div>
              </div>
            </div>

            <div
            // variants={fadeIn("right", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.5 }}
            >
              <Image
                src={"/images/video-playback.svg"}
                width={734}
                height={429}
                alt="video playback"
                className="select-none pointer-events-none"
                style={{ userSelect: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
