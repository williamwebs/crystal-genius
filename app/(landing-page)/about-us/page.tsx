import AboutHero from "../../../components/hero/AboutHero";
import { teams } from "../../../constants/constants";

import Teams from "../../../components/card/Teams";
import Image from "next/image";

import Link from "next/link";
import { Card, CardContent } from "../../../@/components/ui/card";
import Testimonial from "@/components/testimonial/Testimonial";
import Contact from "@/components/form/Contact";

import { client } from "@/sanity/client";
import AboutusBlog, {
  type AboutusBlogItem,
} from "../../../components/about-us/AboutusBlog";

const BLOGS_QUERY = `*[
  _type == "blog"
  && defined(slug.current)
]|order(publishedAt desc)[0...5]{_id, title, slug, publishedAt, image, "excerpt": pt::text(body)}`;

const options = { next: { revalidate: 300 } };

const AboutUsPage = async () => {
  let blogs: AboutusBlogItem[] = [];
  let error = null;

  try {
    blogs = await client.fetch<AboutusBlogItem[]>(BLOGS_QUERY, {}, options);
  } catch (err) {
    console.error("Error fetching from Sanity:", err);
    error = "Failed to load activities. Please try again later.";
  }

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
                <p className="text-[#777777] text-base font-nunito font-medium">
                  To Set the Absolute Standard for Consultancy & Construction
                  Excellence.
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
                <p className="text-[#777777] text-base font-nunito font-medium">
                  Engineering Structural certainty through absolute Professional
                  Accountability.
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
                <p className="text-[#777777] text-base font-nunito font-medium">
                  Eliminating mediocrity through rigorous, Data-driven
                  Execution.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* about us expertise */}
      <section className="container mx-auto py-0 md:pb-20 px-4 md:px-0 flex flex-col md:flex-row items-start justify-between gap-5 md:gap-10">
        <div className="w-full md:max-w-[500px] md:py-10">
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
            className="text-4xl md:text-5xl tracking-wide text-dark font-impact max-w-lg font-normal my-5"
          >
            We Engineer every Structural Solution your Vision requires
          </h2>
          <p
            // variants={fadeIn("right", 0.3)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.5 }}
            className="hidden md:block my-2 text-grey max-w-xl md:pr-10"
          >
            We specialize in high-precision. Architectural, structural,
            Geo-technical and infrastructural delivery, engineering innovative
            solutions across the residential, commercial, and industrial
            sectors. From the architectural skeletons of modern estates to the
            execution of complex civil works, we ensure unshakeable integrity in
            every detail. Our team integrates advanced load-simulation methods
            with professional oversight to bring your vision to life with
            absolute reliability.
          </p>

          <div
          // variants={fadeIn("right", 0.3)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          >
            <Link
              href="/service"
              className="hidden bg-red rounded h-10 w-fit px-16 md:flex items-center justify-center mt-10 shadow text-lightGrey text-sm font-nunito font-normal capitalize"
            >
              Learn aboout our services
            </Link>
          </div>
        </div>
        <div className="w-full md:flex-1 rounded overflow-hidden">
          {/* desktop screen */}
          <div
          // variants={fadeIn("left", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src={"/images/about-us-expertise.svg"}
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
              src={"/images/about-us-expertise.svg"}
              width={770}
              height={640}
              alt="model of a building"
              quality={100}
              className="select-none pointer-events-none md:hidden"
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
            We specialize in high-precision. Architectural, structural,
            Geo-technical and infrastructural delivery, engineering innovative
            solutions across the residential, commercial, and industrial
            sectors. From the architectural skeletons of modern estates to the
            execution of complex civil works, we ensure unshakeable integrity in
            every detail. Our team integrates advanced load-simulation methods
            with professional oversight to bring your vision to life with
            absolute reliability.
          </p>

          <div
          // variants={fadeIn("left", 0.3)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.5 }}
          >
            <Link
              href="/service"
              className="sm:hidden bg-red rounded h-10 w-fit mx-auto px-16 flex items-center justify-center mt-5 shadow text-lightGrey text-sm font-nunito font-normal capitalize"
            >
              Learn aboout our services
            </Link>
          </div>
        </div>
      </section>

      {/* activities section */}
      <AboutusBlog blogs={blogs} error={error} />

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
