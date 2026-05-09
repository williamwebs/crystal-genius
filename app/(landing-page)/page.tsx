"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import Hero from "../../components/hero/Hero";
import AboutUs from "../../components/about-us/AboutUs";
import Services from "../../components/services/Services";
import List from "../../components/list/List";
import Steps from "../../components/card/Steps";
import Expertise from "../../components/expertise/Expertise";
import Testimonial from "../../components/testimonial/Testimonial";
import HeaderPageCard from "../../components/card/HeaderPageCard";
import { projectExecutionStats } from "@/constants/constants";
import Contact from "@/components/form/Contact";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <HeaderPageCard />

      <AboutUs />

      {/* why choose us */}
      <section
        // variants={fadeIn("down", 0.2)}
        // initial="hidden"
        // whileInView={"show"}
        // viewport={{ once: false, amount: 0.4 }}
        className="w-full bg-cover bg-center py-0 md:py-32"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85)), url(${"/images/crystal-bg-3.jpg"})`,
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-start">
          <div
            // variants={fadeIn("right", 0.5)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="w-full md:w-1/2"
          >
            <Image
              src={"/images/concrete-mixer.png"}
              width={518}
              height={189}
              alt="concrete mixer"
              className="select-none pointer-events-none w-full h-full object-cover rounded hidden md:block"
              style={{ userSelect: "none" }}
            />
          </div>
          <div className="w-full md:w-1/2 bg-white px-4 md:px-12 py-10 md:-mt-14 md:-ml-14 rounded flex flex-col gap-4">
            <h2
              // variants={fadeIn("left", 0.3)}
              // initial="hidden"
              // whileInView={"show"}
              // viewport={{ once: false, amount: 0.5 }}
              className="text-5xl text-dark font-impact font-normal"
            >
              Why Choose Us
            </h2>
            <p
              // variants={fadeIn("left", 0.3)}
              // initial="hidden"
              // whileInView={"show"}
              // viewport={{ once: false, amount: 0.5 }}
              className="text-grey max-w-xl mx-auto"
            >
              At Crystal Genius International Limited, we stand out for our
              commitment to excellence, innovation, and client satisfaction.
              With a proven track record of delivering high-quality, sustainable
              building solutions, we combine expertise, advanced technology, and
              attention to detail to bring your vision to life.
            </p>

            {/* mobile screen image */}
            <Image
              src={"/images/concrete-mixer.png"}
              width={518}
              height={189}
              alt="concrete mixer"
              className="select-none pointer-events-none w-full h-full object-cover rounded md:hidden"
              style={{ userSelect: "none" }}
            />

            <p className="text-grey">Here is why:</p>

            <div>
              <List description="Cutting-Edge Technology" />
              <List description="Smart Home Automation" />
              <List description="Innovation and Visionary Design" />
              <List description="Expert Team" />
            </div>

            <Link
              href={"/"}
              className="bg-red rounded h-10 w-28 flex items-center justify-center mt-7 shadow text-lightGrey text-sm font-nunito font-normal ml-auto"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* our usique processes */}
      <section className="container mx-auto py-20 px-4 md:px-0">
        <div className="text-left md:text-center">
          <span
          // variants={fadeIn("down", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.7 }}
          >
            Steps by Steps
          </span>

          <h2
            // variants={fadeIn("up", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="text-5xl text-dark font-impact font-normal my-3 max-w-[550px] mx-auto"
          >
            Discover Our Unique Process and Approach
          </h2>
          <p
            // variants={fadeIn("up", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.7 }}
            className="text-grey max-w-2xl mx-auto"
          >
            Our comprehensive suite of services spans various sectors, including
            infrastructure, urban development, energy, research and development,
            and project management.
          </p>
        </div>

        <Steps />
      </section>

      {/* project execution */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 flex flex-col space-y-10">
          <div className="flex flex-col gap-7">
            <h2 className="text-5xl text-dark text-center font-impact font-normal max-w-[800px] mx-auto uppercase">
              Strategic AND Transparency in Project Execution
            </h2>
            <p className="text-grey text-center max-w-2xl mx-auto">
              Our comprehensive suite of services spans various sectors,
              including infrastructure, urban development, energy, research and
              development, and project management.
            </p>
          </div>

          <div className="max-w-[1000px] w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {projectExecutionStats.map((item, index) => (
              <div
                key={index}
                className={`h-[300px] rounded-[8px] border-t-[15px] ${item.borderColor} bg-[#FCFAFA] px-[10px] py-[40px] flex flex-col items-center justify-center gap-2`}
              >
                <span className="text-[#999999] text-[70px] font-impact font-normal">
                  {item.percentage}
                </span>

                <h4 className="font-nunito font-extrabold text-[22px] text-[#777777] uppercase">
                  {item.title}
                </h4>

                <p className="font-nunito font-medium text-[16px] text-[#777777] text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full h-[400px] md:h-[700px] overflow-hidden relative">
        <Image
          src={"/images/strategic-transparency.svg"}
          fill
          alt="crystal bg"
          quality={100}
          className="object-cover object-top select-none pointer-events-none"
        />
      </section>

      <Contact />
    </main>
  );
}
