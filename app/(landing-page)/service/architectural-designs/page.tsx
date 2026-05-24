import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import { architecturalDesignsConversationStarters } from "@/constants/constants";
import React from "react";

const ArchitecturalDesignsPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Architectural Designs"
        description="Delivering visionary 2D blueprints and 3D visualisations that blend aesthetic elegance with technical precision. Meticulously engineered to exceed safety codes and national guidelines."
        backgroundImage="/images/architectural-design.svg"
      />
      <div className="container mx-auto px-4 pt-[100px] pb-[80px] ">
        <ShowcaseSection
          mainHeading="Your partner and guide, every step of the way."
          mainDescription="When you are trusted to manage a capital project, you carry the full weight of that responsibility, knowing your design will impact the future of your organization for decades to come. You want an architectural partner who delivers with absolute competence. The best design partner ensures your vision is both visionary and buildable. Crystal Genius International is that partner."
          columnHeading="The Cure For Common Unprofessionalism in Construction"
          columnDescriptions={[
            "We bridge the gap between creative vision and regulatory reality. By delivering visionary 2D blueprints and high-fidelity 3D visualizations that exceed national safety codes, we ensure your project receives seamless government approval and moves from concept to ground-breaking without delay.",
          ]}
          columnImage="/images/architectural-1.svg"
          reverse={false}
          imageAlt="Architectural design illustration"
        />
        <BottomShowcaseSection
          heading="We Set Blueprint’s for Precision While Eliminating Uncertainty in Architectural Design"
          descriptions={[
            "In an industry often marred by vague mockups and substandard documentation, Crystal Genius International delivers technically exhaustive blueprints that bridge the gap between imagination and reality. We ensure every line drawn is buildable, protecting your investment from costly revisions and the 'common unprofessionalism' that plagues less disciplined firms.",
            "We specialize in comprehensive architectural solutions for high-end residential, commercial, and industrial needs. From sophisticated duplexes to large-scale infrastructure, our team combines deep expertise with advanced 3D modeling to deliver efficient, safe, and reliable results. By prioritizing regulatory compliance and structural integrity, we provide a polished, GTM-ready product designed to stand the test of time.",
          ]}
          image="/images/architectural-2.svg"
          imageAlt="Architectural design illustration"
        />
      </div>
      <LetsTalk />
      <LetsStarAConversation
        conversationStarters={architecturalDesignsConversationStarters}
      />
      <OurPeople
        role="Senior Engineer"
        name="Engr Vincent Satowaku"
        image="/images/vincent.png"
        title="Executive Vice President, CEO"
        
      />
    </main>
  );
};

export default ArchitecturalDesignsPage;
