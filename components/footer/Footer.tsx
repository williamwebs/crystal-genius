"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import {
  FacebookIcon,
  FooterHouseImage,
  FooterTextImage,
  InstagramIcon,
  LinkedInIcon,
  WhiteLogo,
} from "../../constants/images";

const SOCIAL_MEDIA = [
  {
    name: "Facebook",
    icon: <FacebookIcon />,
    link: "https://www.facebook.com/share/1E6YL2m3F9/?mibextid=wwXIfr",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/_crystalgen",
  },
  {
    name: "LinkedIn",
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/company/crystal-gen",
  },
];

const RenderSocialMedia = () => {
  return (
    <div className="mt-2 max-w-32 mx-auto">
      <div className="flex items-center gap-2 justify-between">
        {SOCIAL_MEDIA.map((social, index) => (
          <a
            key={index}
            // variants={fadeIn("down", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: false, amount: 0.2 }}
            href={social.link}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="overflow-hidden font-nunito">
      <div className="bg-red pt-10 h-full px-3 md:px-0">
        <div className="container mx-auto">
          <aside className="flex flex-col-reverse md:flex-row items-start justify-between gap-10 md:gap-20">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div
              // variants={fadeIn("right", 0.2)}
              // initial="hidden"
              // whileInView={"show"}
              // viewport={{ once: false, amount: 0.2 }}
              >
                <Link href={"/"}>
                  <WhiteLogo />
                </Link>
              </div>
              <p
                // variants={fadeIn("right", 0.3)}
                // initial="hidden"
                // whileInView={"show"}
                // viewport={{ once: false, amount: 0.2 }}
                className="text-white text-[15px] font-medium max-w-xl my-2 md:pr-10 mt-2 sm:mt-5 capitalize"
              >
                Crystal Genius International Limited leads the way in
                transformative building solutions, setting benchmarks in
                quality, innovation, and reliability across all construction
                projects.
              </p>
            </div>
            <div
              // variants={fadeIn("left", 0.2)}
              // initial="hidden"
              // whileInView={"show"}
              // viewport={{ once: false, amount: 0.2 }}
              className="w-full md:w-1/2"
            >
              <FooterTextImage />
            </div>
          </aside>
          <aside className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 pb-10 mt-8 md:mt-0">
            <div className="w-full md:max-w-[320px] flex flex-col text-center gap-5">
              <div>
                <h6
                  // variants={fadeIn("right", 0.2)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.2 }}
                  className="uppercase text-sm text-yellow font-bold"
                >
                  call
                </h6>
                <div className="flex items-center justify-center gap-x-2 flex-wrap">
                  <a
                    // variants={fadeIn("right", 0.3)}
                    // initial="hidden"
                    // whileInView={"show"}
                    // viewport={{ once: false, amount: 0.2 }}
                    href="tel:+2348088951100"
                    className="text-base text-white italic font-bold"
                  >
                    +234 808 895 1100
                  </a>
                  <a
                    href="tel:+2348142702816"
                    className="text-base text-white italic font-bold"
                  >
                    +234 8142702816
                  </a>
                  <a
                    href="tel:+2348069452707"
                    className="text-base text-white italic font-bold"
                  >
                    +234 806 945 2707
                  </a>
                </div>
                <span
                  // variants={fadeIn("right", 0.4)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.2 }}
                  className="text-sm text-[#BBBBBB] italic font-normal block"
                >
                  Get instant response 24/7
                </span>
              </div>
              <div>
                <h6
                  // variants={fadeIn("right", 0.2)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.2 }}
                  className="uppercase text-sm text-yellow font-bold"
                >
                  VISIT Office
                </h6>
                <p
                  // variants={fadeIn("right", 0.3)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.2 }}
                  className="text-[15px] text-white italic font-bold"
                >
                  152, Akowonjo-Egbeda Road, by Sobo Bus-stop, Akowonjo-ikeja, Lagos
                </p>
                <span
                  // variants={fadeIn("right", 0.4)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.2 }}
                  className="text-sm text-[#BBBBBB] italic font-medium block"
                >
                  8AM-5PM (MON-FRI)
                </span>
              </div>
              <div>
                <h6
                  // variants={fadeIn("right", 0.2)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.2 }}
                  className="uppercase text-sm text-yellow font-bold"
                >
                  Email
                </h6>
                <a
                  // variants={fadeIn("right", 0.3)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.2 }}
                  href="mailto:crystalgeniusinternational@gmail.com"
                  className="text-base text-white italic font-bold"
                >
                  crystalgeniusinternational@gmail.com
                </a>
                <span
                  // variants={fadeIn("right", 0.4)}
                  // initial="hidden"
                  // whileInView={"show"}
                  // viewport={{ once: false, amount: 0.2 }}
                  className="text-sm text-[#BBBBBB] italic font-medium block"
                >
                  Get response within 24 hours
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <h6
                // variants={fadeIn("down", 0.2)}
                // initial="hidden"
                // whileInView={"show"}
                // viewport={{ once: false, amount: 0.2 }}
                className="capitalize text-sm text-yellow font-bold"
              >
                Follow us
              </h6>
              {/* socials */}
              <div className="mt-2 max-w-32 mx-auto">
                <div className="flex items-center-gap-10 justify-between">
                  <RenderSocialMedia />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <h6 className="uppercase text-sm text-yellow font-bold">
                  Admin
                </h6>
                <Link
                  href="/cg-login"
                  className="text-sm text-white font-bold capitalize hover:text-yellow/90 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
            <div
              // variants={fadeIn("left", 0.2)}
              // initial="hidden"
              // whileInView={"show"}
              // viewport={{ once: false, amount: 0.2 }}
              className="w-full md:w-1/3 -mr-10 -mb-10 md:-mb-10"
            >
              <FooterHouseImage />
            </div>
          </aside>
        </div>
      </div>
      <div className="bg-dark py-3 md:py-2 text-center">
        <p
          // variants={fadeIn("right", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.2 }}
          className="text-[10px] md:text-xs text-white"
        >
          All rights reserved. Copyright 2024 | Crystal Genius International
          Ltd.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
