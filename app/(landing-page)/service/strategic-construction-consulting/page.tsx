import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import { strategicConstructionConversationStarters } from "@/constants/constants";
import React from "react";

const StrategicConstructionDesignsPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Strategic Construction Consulting"
        backgroundImage="/images/strategic-consulting.svg"
        description="Providing expert technical advisory and feasibility studies that streamline project workflows, optimize resource allocation, and mitigate financial and engineering risks before ground is broken."
      />
      <div className="container mx-auto px-4 pt-[100px] pb-[80px] ">
        <ShowcaseSection
          mainHeading="A Trusted Roadmap for Every Milestone."
          mainDescription="Entrusting a capital project to a consulting partner means placing your organization’s future and financial health in their hands. You recognize that the decisions made in the boardroom today will echo through your infrastructure for decades. At Crystal Genius International, we move beyond basic advice to act as a core extension of your leadership, ensuring that every strategic move is backed by competence and a drive for excellence."
          columnHeading="Bridging Theory and Ground Reality"
          columnDescriptions={[
            "The most brilliant strategy is irrelevant if it cannot survive the chaos of a construction site. Our team bridges the gap between high-level advisory and the day-to-day realities of building construction. We have seen how professionalism fades when consultants remain in the office while the project faces site-level complications. To counter this, our consultants maintain a technical presence throughout the construction phase, ensuring that the strategic roadmap is followed to the letter.",
          ]}
          columnImage="/images/construction-1.svg"
          reverse={false}
          imageAlt="Strategic construction design illustration"
        />
        <BottomShowcaseSection
          heading="Elevating the Process, Where Strategy Meets Execution"
          descriptions={[
            "Construction success is rarely an accident; it is the result of rigorous foresight and the elimination of technical ambiguity. While common unprofessionalism in this sector often leads to 'reactive' problem-solving and budget creep, our consulting framework is rooted in proactive risk mitigation.",
            "Our expertise spans the entire project lifecycle, offering bespoke consulting solutions for residential, commercial, and industrial ventures. From the initial site selection for a premium duplex to the complex resource planning required for large-scale civil works, we ensure every detail is optimized.By merging technical mastery with modern project-modeling methods, our team brings your vision to life with a sharp focus on ROI, safety, and operational reliability.",
          ]}
          image="/images/construction-2.svg"
          imageAlt="Strategic construction design illustration"
        />
      </div>
      <LetsTalk />
      <LetsStarAConversation
        conversationStarters={strategicConstructionConversationStarters}
      />
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

export default StrategicConstructionDesignsPage;
