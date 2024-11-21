"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { building } from "../../constants/constants";
import { ThumbSlider } from "../../components/ThumbSlider";

const PortfolioPage = () => {
  return (
    <main>
      <div className="container mx-auto py-28 px-4 md:px-0">
        <motion.p
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="text-paragraphGrey text-base"
        >
          Portfolio
        </motion.p>
        <motion.h3
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="text-dark font-normal font-impact text-5xl my-0 md:my-2"
        >
          <span className="text-yellow italic font-nunito text-5xl font-bold">
            Our
          </span>{" "}
          Properties
        </motion.h3>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mt-8 md:mt-10">
          <TabsList className="bg-background">
            <TabsTrigger
              value="all"
              className="w-fit border-none shadow-none outline-none text-left"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="land"
              className="w-fit border-none shadow-none outline-none text-left"
            >
              Land
            </TabsTrigger>
            <TabsTrigger
              value="building"
              className="w-fit border-none shadow-none outline-none text-left"
            >
              Building
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
              {building.map((b, index) => (
                <motion.div
                  variants={fadeIn("right", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  className="rounded-lg overflow-hidden p-2 md:p-4 h-fit bg-white shadow"
                  key={index}
                >
                  <ThumbSlider
                    images={b.images}
                    title={b.name}
                    description={b.description}
                    location={b.location}
                    type="Building"
                    isCompleted={b.isCompleted}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="land" className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 py-10">
              <div className="order-2 sm:order-1">
                <Image
                  src={"/images/no-property.png"}
                  width={392}
                  height={214}
                  alt="image of an house"
                />
              </div>
              <div className="font-nunito text-center order-1 md:order-2">
                <h5 className="font-semibold text-dark text-2xl mb-2">
                  No Property
                </h5>
                <p className="text-paragraphGrey mx-0 md:mx-14">
                  No property available under this category. Please check back
                  later
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="building" className="mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {building.map((b, index) => (
                <div
                  className="rounded-lg overflow-hidden p-4 h-fit bg-white shadow"
                  key={index}
                >
                  <ThumbSlider
                    images={b.images}
                    title={b.name}
                    description={b.description}
                    location={b.location}
                    type="Building"
                    isCompleted={b.isCompleted}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default PortfolioPage;
