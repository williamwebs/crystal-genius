import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import React from "react";

const CivilEngineeringPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Civil Engineering & Infrastructure"
        backgroundImage="/images/civil-engineering.svg"
        description="Developing the vital framework of modern environments, including road management, advanced drainage systems, and structural fortifications that enhance site accessibility and security."
      />
      <div className="container mx-auto px-4 pt-[100px] pb-[80px] ">
        <ShowcaseSection
          mainHeading="Building the Framework for Progress."
          mainDescription="When you are tasked with developing a site’s infrastructure, you are creating the lifelines that will support every person and structure within that perimeter. You recognize that the quality of your civil works determines the long-term safety and accessibility of the entire development."
          columnHeading="The Cure For Common Unprofessionalism in Construction"
          columnDescriptions={[
            "The most sophisticated site plan is only successful if it can withstand the elements and the test of time. At Crystal Genius International, we bridge the gap between abstract civil blueprints and the heavy machinery on the ground. We have seen how professionalism often dips during 'unseen' works like drainage and foundation grading, leading to surface-level failures later.",
          ]}
          columnImage="/images/civil-1.svg"
          reverse={false}
          imageAlt="Civil engineering and infrastructure design illustration"
        />
        <BottomShowcaseSection
          heading="The Blueprint for Enduring Environments While Mastering the Site"
          descriptions={[
            "Site infrastructure is the most vulnerable point for 'common unprofessionalism,' often resulting in collapsing drainage, prematurely failing roads, and compromised security barriers. We eliminate these risks by applying rigorous civil engineering standards to every meter of development.",
            "We specialize in high-impact civil solutions across residential estates, commercial hubs, and industrial zones. Whether we are engineering structural fortifications in the Kaura District or implementing advanced road management in Gwarinpa, our focus remains on precision. Our team merges heavy-duty engineering with modern traffic and utility modeling to create environments that are not only functional but resilient.",
          ]}
          image="/images/civil-2.svg"
          imageAlt="Civil engineering and infrastructure design illustration"
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

export default CivilEngineeringPage;
