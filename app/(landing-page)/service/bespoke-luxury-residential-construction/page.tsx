import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import React from "react";

const BespokeLuxuryResidentialConstructionPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Bespoke Luxury Residential Construction"
        backgroundImage="/images/bespoke-construction.svg"
        description="Crafting high-end, tailored living spaces from premium duplexes to smart homes where master craftsmanship meets modern technology to deliver move-in-ready excellence."
      />
      <div className="container mx-auto px-4 pt-[100px] pb-[80px] ">
        <ShowcaseSection
          mainHeading="Crafting the Backdrop of Your Legacy."
          mainDescription="Investing in a luxury residence is more than a construction project, it is the physical manifestation of your success and a sanctuary for your family’s future. You understand that every square inch of your home will be lived in for generations, requiring a level of care that transcends standard building practices."
          columnHeading="The Standard of Residential Delivery"
          columnDescriptions={[
            "A visionary design only truly succeeds when the final handover is flawless. At Crystal Genius International, we bridge the gap between architectural blueprints and the moment you turn the key. We have seen how residential professionalism often falters during the 'finishing phase,' where small errors accumulate into significant frustrations. To prevent this, our residential team maintains an obsessive presence on-site, ensuring that the original design intent is preserved through every layer of paint and every structural beam.",
          ]}
          columnImage="/images/bespoke-1.svg"
          reverse={false}
          imageAlt="Bespoke luxury construction design illustration"
        />
        <BottomShowcaseSection
          heading="Redefining Construction Excellence With Where Sophistication Meets Substance"
          descriptions={[
            "Modern luxury is often compromised by 'common unprofessionalism' in the form of hidden defects, subpar material finishes, and a lack of technical coordination. We eliminate these risks by treating every bespoke home as a precision engineering challenge.",
            "We specialize in delivering high-end, move-in-ready residential solutions, ranging from contemporary minimalist villas to expansive smart-integrated duplexes. Every detail from the initial excavation to the final artisanal finish is executed with an unwavering focus on excellence. By combining master craftsmanship with advanced building technologies, our team ensures your home is not only aesthetically breathtaking but also operationally efficient, structurally resilient, and fundamentally safe.",
          ]}
          image="/images/bespoke-2.svg"
          imageAlt="Bespoke luxury construction design illustration"
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

export default BespokeLuxuryResidentialConstructionPage;
