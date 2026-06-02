import InnerServicesHero from "@/components/hero/InnerServices";
import BottomShowcaseSection from "@/components/services/BottomShowcaseSection";
import LetsStarAConversation from "@/components/services/LetsStarAConversation";
import LetsTalk from "@/components/services/LetsTalk";
import OurPeople from "@/components/services/OurPeople";
import ShowcaseSection from "@/components/services/ShowcaseSection";
import { professionalSoilAnalysisConversationStarters } from "@/constants/constants";
import React from "react";

const ProfessionalSoilAnalysisDesignsPage = () => {
  return (
    <main>
      <InnerServicesHero
        title="Professional Soil Analysis & Geotechnical Testing"
        backgroundImage="/images/soil-analysis.svg"
        description="Offering precise geotechnical analysis and topographical surveys that ensure safe, stable construction, considering soil, groundwater, and environmental conditions for a solid foundation."
        buttonText="Become a Landlord Today"
        buttonHref="/housing-clusters"
        isServicePage={true}
      />
      <div className="container mx-auto px-4 pt-[100px] pb-[80px] ">
        <ShowcaseSection
          mainHeading="Your partner and guide, every step of the way."
          mainDescription="You want to deliver with absolute competence, and that begins beneath the surface. The best geotechnical partner ensures your foundation is unshakeable. Crystal Genius International provides the scientific certainty required to build with confidence."
          columnHeading="The Standard of Geotechnical Execution"
          columnDescriptions={[
            "The most accurate soil report is useless if it isn't translated correctly into the engineering phase. At Crystal Genius International, we bridge the gap between complex geotechnical data and on-site foundation work. We understand that unprofessionalism often occurs when soil recommendations are ignored during excavation, leading to structural instability. Our team provides the technical roadmap and ongoing oversight required to ensure that every foundation pile and footing is executed according to the specific demands of the soil.",
          ]}
          columnImage="/images/soil-1.svg"
          reverse={false}
          imageAlt="Pofessional design illustration"
        />
        <BottomShowcaseSection
          heading="The Blueprint for Stability & Eliminating Foundation Uncertainty"
          descriptions={[
            "Our approach replaces the risk of shifting foundations with exhaustive subsurface analysis and topographical surveys. We ensure that every environmental variable is accounted for, protecting your investment from the catastrophic structural failures and costly rework that plague projects built on unverified ground.",
            "We specialize in delivering comprehensive geotechnical and soil analysis services, crafting data-driven solutions for residential, commercial, and industrial developments. From precision testing for luxury duplexes to expansive topographical mapping for infrastructure, we ensure excellence in every data point. Our team combines technical expertise with advanced laboratory methods to bring your project to life with a focus on efficiency, safety, and reliability. By prioritizing accurate groundwater and soil composition reports, we provide a solid, compliant foundation that stands the test of time.",
          ]}
          image="/images/soil-2.svg"
          imageAlt="Professional design illustration"
        />
      </div>
      <LetsTalk />
      <LetsStarAConversation
        conversationStarters={professionalSoilAnalysisConversationStarters}
      />
      <OurPeople
        role="Senior Geologist"
        name="Olukoju John Ayomide"
        image="/images/olukoju.svg"
        title="Geotechnical Specialist COMEG., NMGS., NAEGE."
        text={[
          "We don't just provide data; we oversee the technical lifecycle to ensure that your building’s foundation is fundamentally sound and safe for generations",
          "Beyond the laboratory report, our leadership is committed to a culture of technical integrity. By providing rigorous oversight of field testing and peer-reviewing every soil profile, we ensure that Crystal Genius International's standards for quality control and safety are met before the first foundation is poured.",
        ]}
      />
    </main>
  );
};

export default ProfessionalSoilAnalysisDesignsPage;
