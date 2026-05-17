"use client";

import { useEffect, useState } from "react";
import AboutHero from "../../../components/hero/AboutHero";
import AboutUs from "../../../components/about-us/AboutUs";
import { activityList, teams } from "../../../constants/constants";
import ActivityCard from "../../../components/card/Activities";
import Teams from "../../../components/card/Teams";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants/variant";
import { Card, CardContent } from "../../../@/components/ui/card";
import Testimonial from "@/components/testimonial/Testimonial";
import Contact from "@/components/form/Contact";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const BLOGS_QUERY = `*[
  _type == "blog"
  && defined(slug.current)
]|order(publishedAt desc)[0...10]{_id, title, slug, publishedAt, image, "excerpt": pt::text(body)}`;

const AboutUsPage = () => {
  const [blogs, setBlogs] = useState<SanityDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await client.fetch<SanityDocument[]>(BLOGS_QUERY);
        setBlogs(fetchedBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <main>
      <AboutHero />
      {/* <AboutUs /> */}

      {/* misson and vision */}
      <section className="container mx-auto px-4 md:px-0 mb-5 mt-0 py-[50px] md:py-[150px] md:mt-2 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
        <div
        // variants={fadeIn("down", 0.2)}
        // initial="hidden"
        // whileInView={"show"}
        // viewport={{ once: false, amount: 0.5 }}
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
        </div>

        <div
        // variants={fadeIn("down", 0.3)}
        // initial="hidden"
        // whileInView={"show"}
        // viewport={{ once: false, amount: 0.5 }}
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
        </div>

        <div
        // variants={fadeIn("down", 0.4)}
        // initial="hidden"
        // whileInView={"show"}
        // viewport={{ once: false, amount: 0.5 }}
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
        </div>
      </section>

      {/* about us expertise */}
      <section className="container mx-auto py-0 md:pb-20 px-4 md:px-0 flex flex-col md:flex-row items-start justify-between gap-5 md:gap-20">
        <div className="w-full md:w-1/2 md:py-10">
          <span
            // variants={fadeIn("right", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.5 }}
            className="capitalize"
          >
            expertise
          </span>

          <h2
            // variants={fadeIn("right", 0.3)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.5 }}
            className="text-4xl md:text-5xl text-dark font-impact max-w-md font-normal my-5"
          >
            We Build everything you can need
          </h2>
          <p
            // variants={fadeIn("right", 0.3)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.5 }}
            className="hidden md:block my-2 text-grey max-w-xl md:pr-10"
          >
            We specialize in delivering comprehensive construction services,
            crafting innovative solutions that cater to residential, commercial,
            and industrial needs. From designing modern homes to executing
            large-scale projects, we ensure excellence in every detail. Our team
            combines expertise and advanced methods to bring your vision to life
            efficiently and reliably.
          </p>

          <div
          // variants={fadeIn("right", 0.3)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          >
            <Link
              href="/"
              className="hidden bg-red rounded h-10 w-fit px-16 md:flex items-center justify-center mt-10 shadow text-lightGrey text-sm font-nunito font-normal"
            >
              More About Us
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {/* desktop screen */}
          <div
          // variants={fadeIn("left", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src={"/images/about-us-expertise.png"}
              width={770}
              height={640}
              alt="model of a building"
              className="select-none pointer-events-none hidden md:block"
              style={{ userSelect: "none" }}
            />
          </div>

          {/* mobile screen */}
          <div
          // variants={fadeIn("left", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src={"/images/about-us-exp-1.png"}
              width={770}
              height={640}
              alt="model of a building"
              className="select-none pointer-events-none md:hidden"
              style={{ userSelect: "none" }}
            />
          </div>

          <div
          // variants={fadeIn("left", 0.3)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src={"/images/about-us-exp-2.png"}
              width={770}
              height={640}
              alt="model of a building"
              className="select-none pointer-events-none md:hidden my-4"
              style={{ userSelect: "none" }}
            />
          </div>

          <p
            // variants={fadeIn("right", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.5 }}
            className="md:hidden block my-2 text-grey"
          >
            We specialize in delivering comprehensive construction services,
            crafting innovative solutions that cater to residential, commercial,
            and industrial needs. From designing modern homes to executing
            large-scale projects, we ensure excellence in every detail. Our team
            combines expertise and advanced methods to bring your vision to life
            efficiently and reliably.
          </p>

          <div
          // variants={fadeIn("left", 0.3)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          >
            <Link
              href="/about-us"
              className="sm:hidden bg-red rounded h-10 w-fit mx-auto px-16 flex items-center justify-center mt-5 shadow text-lightGrey text-sm font-nunito font-normal"
            >
              More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* activities section */}
      <section className="container mx-auto py-10 px-4 md:px-0 mt-10">
        <div className="text-left md:text-center">
          <span
          // variants={fadeIn("down", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          >
            Activities
          </span>

          <h2
            // variants={fadeIn("right", 0.3)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.5 }}
            className="text-4xl md:text-5xl text-dark font-impact font-normal my-3"
          >
            Our Activities
          </h2>
          <p
            // variants={fadeIn("right", 0.3)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.5 }}
            className="text-grey max-w-3xl mx-auto"
          >
            At the heart of our organization, our activities are driven by a
            commitment to creating meaningful impact and fostering positive
            change. We engage in a wide range of initiatives that span across
            various sectors, from community development and educational outreach
            to research, innovation, and capacity building.
          </p>
        </div>

        {/* activity carousel */}
        {isLoading ? (
          <p className="text-center text-grey mt-10">Loading activities...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-grey mt-10">No activities posted yet.</p>
        ) : (
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
            {blogs.map((activity: any) => (
              <SwiperSlide key={activity._id} className="bg-white rounded-lg shadow p-6">
                <ActivityCard
                  image={activity.image ? urlFor(activity.image)?.url() || "" : ""}
                  title={activity.title}
                  description={activity.excerpt || "Read more..."}
                  slug={activity.slug.current}
                  date={activity.publishedAt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* team section */}
      <section className="container mx-auto py-20 px-4 md:px-0">
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col max-w-[700px] mx-auto ">
            <h2 className="text-4xl md:text-5xl text-dark text-left md:text-center font-impact font-normal my-5">
              Meet Our Team
            </h2>
            <p className="text-grey text-left md:text-center pr-5">
              Get to know the passionate experts behind our success. Our
              dedicated team brings vision, innovation, and expertise to every
              project, making your dreams a reality
            </p>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-evenly">
            {teams.map((team) => (
              <Teams
                key={team.name}
                image={team.image}
                name={team.name}
                qualification={team.qualification}
                role={team.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* testimonial */}
      <section
        id="testimonial"
        className="container mx-auto py-10 md:py-20 px-4 md:px-0 mt-0 md:mt-20"
      >
        <div className="text-left md:text-center">
          <span className="capitalize">testimonial</span>

          <h2 className="text-4xl md:text-5xl text-dark font-impact font-normal my-3 max-w-[200px] md:max-w-2xl md:mx-auto">
            What People Say About Us
          </h2>
        </div>
        {/* carousel */}
        <Testimonial />
      </section>
      <Contact />
    </main>
  );
};

export default AboutUsPage;
