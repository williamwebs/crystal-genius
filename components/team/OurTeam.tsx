"use client";

import Image from "next/image";
import Teams from "../card/Teams";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

const OurTeam = () => {
  return (
    <section className="container mx-auto pb-20 px-4 md:px-0 ">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10">
        <div className="w-full md:w-1/2">
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
            className="text-5xl text-dark font-impact max-w-lg font-normal my-5"
          >
            Meet The Team, That Makes The Dream
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="my-2 text-grey max-w-lg pr-10"
          >
            Get to know the passionate experts behind our success. Our dedicated
            team brings vision, innovation, and expertise to every project,
            making your dreams a reality
          </motion.p>
        </div>
        <div className="w-full md:w-1/2">
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-3 md:p-5 max-w-sm mx-auto"
          >
            <div className="bg-[#D4D4D4] rounded-lg overflow-hidden">
              <Image
                src={"/images/vincent.png"}
                width={430}
                height={520}
                alt="vincent satowaku"
                className="select-none pointer-events-none w-full h-full object-cover"
                style={{ userSelect: "none" }}
              />
            </div>
            <div className="mt-3 font-nunito text-dark text-center">
              <h5 className="font-bold text-2xl">Engr Vincent Satowaku</h5>
              <p className="font-medium text-dark">M.NSE., M.COREN., M.NICE</p>

              <span className="font-normal italic text-paragraphGrey text-xs mt-4 block">
                President/CEO
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-7">
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
        <Teams
          image="/images/lateef.png"
          name="Oyebiyi Lateef Abefe"
          qualification="B.sc"
          role="Artisan Coordinator"
        />
        <Teams
          image="/images/lateef.png"
          name="Oyebiyi Lateef Abefe"
          qualification="B.sc"
          role="Artisan Coordinator"
        />
      </div>
    </section>
  );
};

export default OurTeam;
