"use client";

import AboutHero from "../../components/hero/AboutHero";
import AboutUs from "../../components/about-us/AboutUs";
import { activityList } from "../../constants/constants";
import ActivityCard from "../../components/card/Activities";
import Teams from "../../components/card/Teams";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import { Card, CardContent } from "../../@/components/ui/card";

const AboutUsPage = () => {
  return (
    <main>
      <AboutHero />
      <AboutUs />

      {/* about us expertise */}
      <section className="container mx-auto py-0 md:py-20 px-4 md:px-0 flex flex-col md:flex-row items-start justify-between gap-5 md:gap-20">
        <div className="w-full md:w-1/2 md:py-10">
          <motion.span
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="capitalize"
          >
            expertise
          </motion.span>

          <motion.h2
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="text-5xl text-dark font-impact max-w-md font-normal my-5"
          >
            We Build everything you can need
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="hidden md:block my-2 text-grey max-w-xl md:pr-10"
          >
            We specialize in delivering comprehensive construction services,
            crafting innovative solutions that cater to residential, commercial,
            and industrial needs. From designing modern homes to executing
            large-scale projects, we ensure excellence in every detail. Our team
            combines expertise and advanced methods to bring your vision to life
            efficiently and reliably.
          </motion.p>

          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Link
              href="/"
              className="hidden bg-red rounded h-10 w-fit px-16 md:flex items-center justify-center mt-10 shadow text-lightGrey text-sm font-nunito font-normal"
            >
              More About Us
            </Link>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2">
          {/* desktop screen */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src={"/images/about-us-expertise.png"}
              width={770}
              height={640}
              alt="model of a building"
              className="select-none pointer-events-none hidden md:block"
              style={{ userSelect: "none" }}
            />
          </motion.div>

          {/* mobile screen */}
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src={"/images/about-us-exp-1.png"}
              width={770}
              height={640}
              alt="model of a building"
              className="select-none pointer-events-none md:hidden"
              style={{ userSelect: "none" }}
            />
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src={"/images/about-us-exp-2.png"}
              width={770}
              height={640}
              alt="model of a building"
              className="select-none pointer-events-none md:hidden my-4"
              style={{ userSelect: "none" }}
            />
          </motion.div>

          <motion.p
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="md:hidden block my-2 text-grey"
          >
            We specialize in delivering comprehensive construction services,
            crafting innovative solutions that cater to residential, commercial,
            and industrial needs. From designing modern homes to executing
            large-scale projects, we ensure excellence in every detail. Our team
            combines expertise and advanced methods to bring your vision to life
            efficiently and reliably.
          </motion.p>

          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Link
              href="/"
              className="sm:hidden bg-red rounded h-10 w-fit mx-auto px-16 flex items-center justify-center mt-5 shadow text-lightGrey text-sm font-nunito font-normal"
            >
              More About Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* misson and vision */}
      <section className="container mx-auto px-4 md:px-0 mb-5 mt-10 md:mt-2 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
        >
          <Card className="rounded-lg text-center bg-white px-5 shadow-red-glow border-red">
            <CardContent>
              <div className="flex flex-col gap-2 font-nunito">
                <Image
                  src={"/eye-icon.svg"}
                  width={90}
                  height={90}
                  alt="eye icon"
                  className="mx-auto"
                />

                <h5 className="font-extrabold text-3xl text-red">Vision</h5>
                <p>
                  Increased access to digital opportunities for improved
                  livelihood.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
        >
          <Card className="rounded-lg text-center bg-white px-5 shadow-blue-glow border-accentBlue">
            <CardContent>
              <div className="flex flex-col gap-2 font-nunito">
                <Image
                  src={"/mission-icon.svg"}
                  width={90}
                  height={90}
                  alt="mission icon"
                  className="mx-auto"
                />

                <h5 className="font-extrabold text-3xl text-accentBlue">
                  Mission
                </h5>
                <p>
                  Helping people leverage technology for improved livelihood.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeIn("down", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
        >
          <Card className="rounded-lg text-center bg-white px-5 shadow-yellow-glow border-yellow">
            <CardContent>
              <div className="flex flex-col gap-2 font-nunito">
                <Image
                  src={"/value-icon.svg"}
                  width={90}
                  height={90}
                  alt="value icon"
                  className="mx-auto"
                />

                <h5 className="font-extrabold text-3xl text-yellow">Values</h5>
                <p>People - Productivity - Teamwork - Innovation- Quality</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* activities section */}
      <section className="container mx-auto py-10 px-4 md:px-0">
        <div className="text-center">
          <motion.span
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
          >
            Activities
          </motion.span>

          <motion.h2
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="text-4xl md:text-5xl text-dark font-impact font-normal my-3"
          >
            Our Activities
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="text-grey max-w-3xl mx-auto"
          >
            At the heart of our organization, our activities are driven by a
            commitment to creating meaningful impact and fostering positive
            change. We engage in a wide range of initiatives that span across
            various sectors, from community development and educational outreach
            to research, innovation, and capacity building.
          </motion.p>
        </div>

        {/* activity carousel */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            // Responsive settings
            768: { slidesPerView: 2.3 }, // Show 3 slides on desktop
          }}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          speed={5000} // Smooth continuous scrolling speed
          loop={true}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          allowTouchMove={true}
          className="mt-10"
        >
          {activityList.map((activity, index) => (
            <SwiperSlide key={index} className="bg-white rounded-lg shadow p-6">
              <ActivityCard
                image={activity.image}
                title={activity.title}
                description={activity.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* team section */}
      <section className="container mx-auto py-20 px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-start gap-8 justify-between">
          <div className="w-full md:w-1/5">
            <motion.span
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="capitalize"
            >
              Our Team
            </motion.span>

            <motion.h2
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="text-5xl text-dark font-impact font-normal my-5"
            >
              Meet The Team, That Makes The Dream
            </motion.h2>
            <motion.p
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="my-2 text-grey pr-5"
            >
              Get to know the passionate experts behind our success. Our
              dedicated team brings vision, innovation, and expertise to every
              project, making your dreams a reality
            </motion.p>
          </div>
          <div className="w-full md:w-4/5 flex flex-col md:flex-row gap-5 justify-evenly">
            <Teams
              image="/images/vincent-2.png"
              name="Engr Vincent Satowaku"
              qualification="M.NSE., M.COREN., M.NICE"
              role=" President/CEO"
            />
            <Teams
              image="/images/anthony.png"
              name="Mrs Anthony Moyosoreoluwa"
              qualification="B.sc"
              role="Chief Operating Officer (COO)"
            />
            <Teams
              image="/images/lateef.png"
              name="Oyebiyi Lateef Abefe"
              qualification="B.sc"
              role="Artisan Coordinator"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
