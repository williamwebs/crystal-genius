import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import { projectManagementConversationStarters } from "@/constants/constants";
import React from "react";

const ProjectManagementPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Project Management & Site Oversight"
        backgroundImage="/images/project-management.svg"
        description="Ensuring rigorous quality control and timeline adherence through dedicated on-site supervision, bridging the gap between design intent and physical execution for error-free results."
        buttonText="Become a Landlord Today"
        buttonHref="/housing-clusters"
        isServicePage={true}
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
      <LetsStarAConversation
        conversationStarters={projectManagementConversationStarters}
      />
      <OurPeople
        role="Senior Project Manager"
        name="Ayodele Agbaje"
        image="/images/ayodele-1.svg"
        title="Project Manager, (APM)UK"
        text={[
          "From coordinating geotechnical subsurface analysis to commanding daily site workflows, we ensure that every engineering specification is executed with absolute structural precision. Our framework focuses on maintaining strict timeline control, material quality assurance, and zero-compromise safety protocols across the entire build lifecycle.",
          "Every milestone is governed by rigorous data-driven oversight, translating complex construction phases into a transparent, predictable roadmap of project delivery.",
        ]}
      />
    </main>
  );
};

export default ProjectManagementPage;
