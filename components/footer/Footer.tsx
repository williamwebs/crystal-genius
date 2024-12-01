"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

const Footer = () => {
  return (
    <footer className="overflow-hidden font-nunito">
      <div className="bg-yellow pt-10 h-full px-3 md:px-0">
        <div className="container mx-auto">
          <aside className="flex flex-col-reverse md:flex-row items-start justify-between gap-10 md:gap-20">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <motion.div
                variants={fadeIn("right", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
              >
                <Link href={"/"}>
                  <Image
                    src={"/images/crystal-logo.png"}
                    width={120}
                    height={93}
                    alt="crystal genius logo"
                    className="select-none pointer-events-none mx-auto md:mx-0"
                    style={{ userSelect: "none" }}
                  />
                </Link>
              </motion.div>
              <motion.p
                variants={fadeIn("right", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="text-dark max-w-xl my-2 md:pr-10"
              >
                Crystal Genius International Limited leads the way in
                transformative building solutions, setting benchmarks in
                quality, innovation, and reliability across all construction
                projects.
              </motion.p>
            </div>
            <motion.div
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="w-full md:w-1/2"
            >
              <Image
                src={"/images/footer-text.png"}
                width={550}
                height={100}
                alt="crystal genius logo"
                className="select-none pointer-events-none"
                style={{ userSelect: "none" }}
              />
            </motion.div>
          </aside>
          <aside className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 pb-10 mt-8 md:mt-0">
            <div className="w-full md:w-1/3 flex flex-col text-center gap-5">
              <div>
                <motion.h6
                  variants={fadeIn("right", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="uppercase text-sm text-accentBlue font-bold"
                >
                  call
                </motion.h6>
                <motion.a
                  variants={fadeIn("right", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  href="tel:+2348069452707"
                  className="text-base text-dark italic font-bold"
                >
                  +234 806 945 2707
                </motion.a>
                <motion.span
                  variants={fadeIn("right", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="text-sm text-grey italic font-medium block"
                >
                  Get instant response 24/7
                </motion.span>
              </div>
              <div>
                <motion.h6
                  variants={fadeIn("right", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="uppercase text-sm text-accentBlue font-bold"
                >
                  VISIT Office
                </motion.h6>
                <motion.p
                  variants={fadeIn("right", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="text-base text-dark italic font-bold"
                >
                  25, Malada Cresent, Ejigbo
                </motion.p>
                <motion.span
                  variants={fadeIn("right", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="text-sm text-grey italic font-medium block"
                >
                  8AM-5PM (MON-FRI)
                </motion.span>
              </div>
              <div>
                <motion.h6
                  variants={fadeIn("right", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="uppercase text-sm text-accentBlue font-bold"
                >
                  Email
                </motion.h6>
                <motion.a
                  variants={fadeIn("right", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  href="mailto:vincentsatowaku@gmail.com"
                  className="text-base text-dark italic font-bold"
                >
                  vincentsatowaku@gmail.com
                </motion.a>
                <motion.span
                  variants={fadeIn("right", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="text-sm text-grey italic font-medium block"
                >
                  Get response within 24 hours
                </motion.span>
              </div>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <motion.h6
                variants={fadeIn("down", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="capitalize text-sm text-accentBlue font-bold"
              >
                Follow us
              </motion.h6>
              {/* socials */}
              <div className="mt-2 max-w-32 mx-auto">
                <div className="flex items-center-gap-10 justify-between">
                  <motion.a
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.2 }}
                    href=""
                  >
                    <Image
                      src={"/facebook-icon.svg"}
                      width={40}
                      height={40}
                      alt="facebook"
                    />
                  </motion.a>
                  <motion.a
                    variants={fadeIn("down", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.2 }}
                    href=""
                  >
                    <Image
                      src={"/instagram-icon.svg"}
                      width={40}
                      height={40}
                      alt="facebook"
                    />
                  </motion.a>
                  <motion.a
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.2 }}
                    href=""
                  >
                    <Image
                      src={"/linkedin-icon.svg"}
                      width={40}
                      height={40}
                      alt="facebook"
                    />
                  </motion.a>
                </div>
              </div>
            </div>
            <motion.div
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="w-full md:w-1/3 -mr-10 -mb-10 md:-mb-16"
            >
              <Image
                src={"/images/footer-house.png"}
                width={556}
                height={390}
                alt=""
                className="select-none pointer-events-none"
                style={{ userSelect: "none" }}
              />
            </motion.div>
          </aside>
        </div>
      </div>
      <div className="bg-dark py-3 md:py-2 text-center">
        <motion.p
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="text-xs md:text-sm text-white"
        >
          All rights reserved. Copyright 2024 | Crystal Genius International
          Ltd.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
