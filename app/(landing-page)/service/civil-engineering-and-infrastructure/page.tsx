import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import { civilEngineeringConversationStarters } from "@/constants/constants";
import React from "react";

const CivilEngineeringPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Civil Engineering & Infrastructure"
        backgroundImage="/images/civil-engineering.svg"
        description="Developing the vital framework of modern environments, including road management, advanced drainage systems, and structural fortifications that enhance site accessibility and security."
        buttonText="Become a Landlord Today"
        buttonHref="/housing-clusters"
        isServicePage={true}
      />
      <div className="container mx-auto px-4 pt-[100px] pb-[80px] ">
        <ShowcaseSection
          mainHeading="Building the Framework for Progress."
          mainDescription="When you are tasked with developing a site’s infrastructure, you are creating the lifelines that will support every person and structure within that perimeter. You recognize that the quality of your civil works determines the long-term safety and accessibility of the entire development."
          columnHeading="Setting the Standard for Professional Accountability in Construction."
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
      <LetsStarAConversation
        conversationStarters={civilEngineeringConversationStarters}
      />

      <OurPeople
        role="Lead/Principal Engineer"
        name="Engr Vincent Satowaku"
        image="/images/vincent-2.svg"
        title="Executive Vice President, CEO"
        text={[
          "Civil engineering is the backbone of national development, yet the local industry often suffers from erratic project execution and a lack of data-driven planning. Across Nigeria, we routinely see public and private infrastructure projects fail or stall due to poor materials, weak oversight, and a failure to anticipate environmental stress.",
          "Our blueprint for infrastructure relies on rigorous multi-site supervision and advanced material science to eliminate structural vulnerabilities. From drainage networks and access roads to large-scale site preparation, we ensure that our civil engineering projects are flawlessly integrated with their surrounding urban ecosystems. ",

          "We are redefining project execution by proving that with the right technical mastery and unyielding professional standards, infrastructure in Nigeria can be built to global benchmarks.",
        ]}
      />
    </main>
  );
};

export default CivilEngineeringPage;
