"use client";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import ArticlePageHero from "../../components/hero/ArticlePageHero";
import { activityList } from "../../constants/constants";
import ActivityCard from "../../components/card/Activities";

const ArticlePage = () => {
  return (
    <main>
      <ArticlePageHero />
      <section
        className="w-full bg-cover bg-center py-20 px-3 md:px-0 mt-20 md:my-40 "
        style={{
          backgroundImage: `url(${"/images/contact-us-bg.png"})`,
        }}
      >
        <div className="container mx-auto">
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
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.5 }}
              className="text-grey max-w-3xl mx-auto"
            >
              At the heart of our organization, our activities are driven by a
              commitment to creating meaningful impact and fostering positive
              change. We engage in a wide range of initiatives that span across
              various sectors, from community development and educational
              outreach to research, innovation, and capacity building.
            </motion.p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
            {activityList.map((activity, index) => (
              <div
                className="bg-white rounded-lg shadow p-3 md:p-6"
                key={index}
              >
                <ActivityCard
                  image={activity.image}
                  title={activity.title}
                  description={activity.description}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArticlePage;
