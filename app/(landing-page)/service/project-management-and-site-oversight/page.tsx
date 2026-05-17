import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import React from "react";

const ProjectManagementPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Project Management & Site Oversight"
        backgroundImage="/images/project-management.svg"
        description="When you are managing a capital project, the distance between the boardroom and the job site can lead to a dangerous loss of control. You know that a lack of supervision results in misinterpreted plans and compromised quality."
      />
      <div className="container mx-auto px-4 pt-[100px] pb-[80px] ">
        <ShowcaseSection
          mainHeading="Your On-Site Authority, Every Step of the Way."
          mainDescription="When you are managing a capital project, the distance between the boardroom and the job site can lead to a dangerous loss of control. You know that a lack of supervision results in misinterpreted plans and compromised quality."
          columnHeading="The Standard of Oversight Excellence"
          columnDescriptions={[
            "A perfect set of architectural drawings is only a dream until it is enforced on the construction site. At Crystal Genius International, we bridge the gap between high-level project planning and the daily reality of the build. We have seen how professionalism fades when the 'management' stays in the office, leading to structural deviations that are buried behind paint and plaster.",
            "To counter this, our oversight team maintains a relentless technical presence on-site, ensuring that the project's 'actuals' match its 'blueprints' to the letter.",
          ]}
          columnImage="/images/pm-1.svg"
          reverse={false}
          imageAlt="Project management design illustration"
        />
        <BottomShowcaseSection
          heading="Active Command Over Passive Observation"
          descriptions={[
            "In a sector where 'unprofessionalism' often looks like absentee management and unchecked contractor errors, we provide a standard of active site command. We understand that a project’s success is not just planned; it is fought for through daily supervision and the enforcement of technical standards. Our approach replaces the risk of 'site-level drift' with exhaustive quality audits and progress tracking, protecting your capital from the expensive rework and safety violations that occur when oversight is treated as a formality.",
            "We specialize in comprehensive management and oversight solutions for residential, commercial, and industrial developments. From managing the intricate remodeling of a premium duplex to overseeing site-wide infrastructure, we ensure excellence through presence.",
          ]}
          image="/images/pm-2.svg"
          imageAlt="Project management design illustration"
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

export default ProjectManagementPage;
