"use client";

import ServiceCard from "../card/Services";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

interface Props {
  row?: string;
}
const Services = ({ row }: Props) => {
  return (
    <section className="container mx-auto py-0 md:py-20 px-4 md:px-0">
      <div className="text-left md:text-center">
        <motion.span
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
        >
          What we do
        </motion.span>

        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="text-4xl md:text-5xl text-dark font-impact font-normal my-3"
        >
          Explore our service offerings
        </motion.h2>
        <motion.p
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="text-grey max-w-xl mx-auto px-0 md:px-4"
        >
          Discover how our specialized services bring quality, innovation, and
          reliability to every stage of your project.
        </motion.p>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${row} gap-6 my-10 w-full`}
        style={{ gridAutoFlow: "dense" }}
      >
        <ServiceCard
          image="/images/geographical.png"
          heading="Geotechnical Design/Topographical Survey"
          paragraph="Offering precise geotechnical analysis and topographical surveys that ensure safe, stable construction, considering soil, groundwater, and environmental conditions for a solid foundation."
          lists={[
            "Evaluations of soil, rock, and water conditions for fou...",
            "Surveying for informed, effective site planning.",
            "Identifying and mitigating potential geotechnical cha..",
          ]}
        />
        <ServiceCard
          image="/images/mechanical.png"
          heading="Mechanical/Electrical/Clean Energy Solutions"
          paragraph="Integrating energy-efficient, clean, and modern solutions across mechanical and electrical systems, enhancing sustainability, reducing costs, and supporting a greener future."
          lists={[
            "Incorporating solar, and other clean energy sources.",
            "Mechanical and electrical systems for optimal energy...",
            "Implementing smart controls to improve building fun...",
          ]}
        />
        <ServiceCard
          image="/images/consulting.png"
          heading="Consulting and Constructing"
          paragraph="Providing expert consultation and construction services to bring visions to life, ensuring projects are handled with precision, professionalism, and a commitment to quality."
          lists={[
            "Detailed consulting to align construction with project",
            "Experienced professionals ensuring quality and efficie...",
            "Consulting solutions that maximize value while adher...",
          ]}
        />
        <ServiceCard
          image="/images/development.png"
          heading="Development and General Contracting"
          paragraph="Managing the entire development process with exceptional contracting services, focusing on quality, timeline adherence, budget control, and complete client satisfaction."
          lists={[
            "Handling all project phases, from development throu...",
            "Rigorous standards to ensure every project meets hi...",
            "Transparent communication and dedication to excee...",
          ]}
        />
        <ServiceCard
          image="/images/structural.png"
          heading="Structural/Infrastructural design"
          paragraph="Integrating energy-efficient, clean, and modern solutions across mechanical and electrical systems, enhancing sustainability, reducing costs, and supporting a greener future."
          lists={[
            "Designs, durability and safety for enduring value.",
            "Methods to maximize efficiency and minimize waste.",
            "Strategic layouts to accessibility and serviceability",
          ]}
        />
        <ServiceCard
          image="/images/architectural.png"
          heading="Architectural Designs"
          paragraph="Providing innovative and functional architectural designs that prioritize beauty, sustainability, and user experience, ensuring each space is perfectly aligned with client needs"
          lists={[
            "Reflect your personal style and project goals.",
            "Blend aesthetics with environmental responsibility.",
            "Functionality and comfort in every project.",
          ]}
        />
      </div>
    </section>
  );
};

export default Services;
