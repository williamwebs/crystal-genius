"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../variants/variant";
import Hero from "../components/hero/Hero";
import AboutUs from "../components/about-us/AboutUs";
import Services from "../components/services/Services";
import List from "../components/list/List";
import Steps from "../components/card/Steps";
import Expertise from "../components/expertise/Expertise";
import Testimonial from "../components/testimonial/Testimonial";
import OurTeam from "../components/team/OurTeam";
import HeaderPageCard from "../components/card/HeaderPageCard";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <HeaderPageCard />

      <AboutUs />
      <Services row="lg:grid-cols-3" />

      {/* why choose us */}
      <motion.section
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="w-full bg-cover bg-center py-0 md:py-32"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85)), url(${"/images/crystal-bg-3.jpg"})`,
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-start">
          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
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
          </motion.div>
          <div className="w-full md:w-1/2 bg-white px-4 md:px-12 py-10 md:-mt-14 md:-ml-14 rounded flex flex-col gap-4">
            <motion.h2
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="text-5xl text-dark font-impact font-normal"
            >
              Why Choose Us
            </motion.h2>
            <motion.p
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="text-grey max-w-xl mx-auto"
            >
              At Crystal Genius International Limited, we stand out for our
              commitment to excellence, innovation, and client satisfaction.
              With a proven track record of delivering high-quality, sustainable
              building solutions, we combine expertise, advanced technology, and
              attention to detail to bring your vision to life.
            </motion.p>

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
      </motion.section>

      {/* our usique processes */}
      <section className="container mx-auto py-20 px-4 md:px-0">
        <div className="text-left md:text-center">
          <motion.span
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            Steps by Steps
          </motion.span>

          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="text-5xl text-dark font-impact font-normal my-3 max-w-2xl mx-auto"
          >
            Explore Our Unique Process and Approach
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="text-grey max-w-2xl mx-auto"
          >
            Our comprehensive suite of services spans various sectors, including
            infrastructure, urban development, energy, research and development,
            and project management.
          </motion.p>
        </div>

        <Steps />
      </section>
      <Expertise />

      {/* testimonial */}
      <section
        id="testimonial"
        className="container mx-auto py-20 px-4 md:px-0 mt-20"
      >
        <div className="text-center">
          <motion.span
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="capitalize"
          >
            testimonial
          </motion.span>

          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="text-5xl text-dark font-impact font-normal my-3 max-w-2xl mx-auto"
          >
            What People Say About Us
          </motion.h2>
        </div>
        {/* carousel */}
        <Testimonial />
      </section>
      <OurTeam />
    </main>
  );
}
