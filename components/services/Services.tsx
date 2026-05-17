"use client";

import ServiceCard from "../card/Services";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import { services } from "@/constants/constants";

interface Props {
  row?: string;
}
const Services = ({ row }: Props) => {
  return (
    <section className="container mx-auto py-0 md:py-20 px-4 md:px-0">
      <div className="text-left md:text-center">
        <span
          // variants={fadeIn("down", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: true, amount: 0.5 }}
        >
          What we do
        </span>

        <h2
          // variants={fadeIn("up", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl text-dark font-impact font-normal my-3"
        >
          Explore our service offerings
        </h2>
        <p
          // variants={fadeIn("up", 0.2)}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: true, amount: 0.5 }}
          className="text-grey max-w-xl mx-auto px-0 md:px-4"
        >
          Discover how our specialized services bring quality, innovation, and
          reliability to every stage of your project.
        </p>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${row} gap-6 my-10 w-full`}
        style={{ gridAutoFlow: "dense" }}
      >
        {services.map((service) => (
          <ServiceCard
            key={service.heading}
            image={service.image}
            heading={service.heading}
            paragraph={service.paragraph}
            lists={service.lists}
            href={service.href}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
