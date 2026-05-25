import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import { turnkeyProjectConversationStarters } from "@/constants/constants";
import React from "react";

const TrunkeyPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Turnkey Project Management"
        backgroundImage="/images/turnkey.svg"
        description="Providing a seamless ground-to-key experience by managing the entire construction lifecycle, allowing clients to handover a plot and receive a fully polished, ready-to-use property."
      buttonText="Become a Landlord Today"
        isServicePage={true}
      />
      <div className="container mx-auto px-4 pt-[100px] pb-[80px] ">
        <ShowcaseSection
          mainHeading="A Seamless Journey from Concept to Key"
          mainDescription="You need a partner who can shoulder that entire burden with absolute competence. Crystal Genius International acts as your single point of accountability, ensuring that your project moves from an empty plot to a finished asset with total professional alignment."
          columnHeading="Eliminating Mediocrity. Engineering Project Certainty"
          columnDescriptions={[
            "We specialize in delivering comprehensive construction services, crafting innovative solutions that cater to residential, commercial, and industrial needs. From designing modern homes to executing large-scale projects, we ensure excellence in every detail. Our team combines expertise and advanced methods to bring your vision to life efficiently and reliably.",
          ]}
          columnImage="/images/turnkey-1.svg"
          reverse={false}
          imageAlt="Turnkey management design illustration"
        />
        <BottomShowcaseSection
          heading="The Blueprint for Total Delivery & Consolidating the Lifecycle"
          descriptions={[
            " We eliminate this friction by providing a unified turnkey framework. Our approach replaces the stress of self-management with an integrated delivery model, protecting your investment from the costly overlaps and finger-pointing that often plague multi-vendor projects.",
            "Our team combines high-level project leadership with advanced resource modeling to bring your vision to life with a sharp focus on speed-to-market, safety, and financial efficiency. By prioritizing a 'Ground-to-Key' philosophy, we provide a polished, GTM-ready product that is ready for immediate operation.",
          ]}
          image="/images/turnkey-2.svg"
          imageAlt="Turnkey management design illustration"
        />
      </div>
      <LetsTalk />
      <LetsStarAConversation
        conversationStarters={turnkeyProjectConversationStarters}
      />
      <OurPeople
        role="Practicing Jnr. Engineer"
        name="Engr. Ogunjimi Olamide Felix"
        image="/images/felix.svg"
        title="Consulting Engineer, MNSE."
        text={[
          "Operating directly on the front lines of site oversight, our focus is the rigorous monitoring of material ratios, structural reinforcement placements, and technical blueprint compliance.",
          "By maintaining a continuous, data-backed feedback loop with senior project managers, we guarantee that field data from soil tests and load-bearing structures is fully integrated into daily operations.",
        ]}
      />
    </main>
  );
};

export default TrunkeyPage;
