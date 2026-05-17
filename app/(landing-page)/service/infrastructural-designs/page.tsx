import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import React from "react";

const InfrastructureDesignsPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Structural/Infrastructural design"
        backgroundImage="/images/infrastructural-design.svg"
        description="Engineering the core integrity of your projects through advanced structural calculations and load-bearing analysis to guarantee maximum safety, durability, and compliance with global standards."
      />
      <div className="container mx-auto px-4 pt-[100px] pb-[80px] ">
        <ShowcaseSection
          mainHeading="Your partner and guide, every step of the way."
          mainDescription="When you are entrusted with the structural framework of a capital project, you carry the weight of public safety and long-term durability. You know that an engineering failure can impact an organization for decades. You need a partner who views structural integrity with absolute gravity. Crystal Genius International ensures that your project’s infrastructure is engineered with the competence and precision required for total peace of mind."
          columnHeading="From Calculation to Completion We Ensure Technical Precision"
          columnDescriptions={[
            "We provide more than just drawings; we provide a framework for technical success. By integrating our engineering solutions with on-site reality, we ensure that material specifications are met and structural designs are followed to the letter. This commitment to precision eliminates the risk of costly rework and guarantees that the finished infrastructure meets the rigorous safety benchmarks our brand is known for. Whether it is a high-rise skeleton or essential estate infrastructure, we ensure your project is built to the exact standard of the blueprint.",
          ]}
          columnImage="/images/structural-1.svg"
          reverse={false}
          imageAlt="Infrastructural design illustration"
        />
        <BottomShowcaseSection
          heading="Engineering the Standard Required Structural Integrity Without Compromise"
          descriptions={[
            "Common unprofessionalism in construction often manifests as cutting corners on structural calculations or using 'template' designs that ignore site-specific stresses. At Crystal Genius International, we replace this risk with advanced load-bearing analysis and exhaustive technical documentation. We ensure that every structural element is designed to withstand both time and environmental pressures, protecting your capital from the structural failures.",
            "We specialize in comprehensive structural and infrastructural solutions for residential, commercial, and industrial sectors. From the internal skeletons of luxury duplexes to the complex engineering of large-scale civil infrastructure, we ensure excellence in every calculation. Our team combines technical mastery with modern load-simulation methods to bring your vision to life with a focus on safety, resource optimization, and reliability. By prioritizing strict code compliance, we deliver a stable, high-performance product built to endure.",
          ]}
          image="/images/structural-2.svg"
          imageAlt="Infrastructural design illustration"
        />
      </div>
      <LetsTalk />
      <LetsStarAConversation />
      <OurPeople
        role="Senior Engineer"
        name="Engr Vincent Satowaku"
        image="/images/vincent.png"
        title="Executive Vice President, 
CEO"
      />
    </main>
  );
};

export default InfrastructureDesignsPage;
