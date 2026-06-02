import HousingClustersHero from "@/components/housing-clusters/HousingClustersHero";
import StruggleSection from "@/components/housing-clusters/StruggleSection";
import InfoCardsSection from "@/components/housing-clusters/InfoCardsSection";
import EngineeredSteps from "@/components/housing-clusters/EngineeredSteps";
import GoalsSection from "@/components/housing-clusters/GoalsSection";
import PaymentMilestones from "@/components/housing-clusters/PaymentMilestones";
import CureForUnprofessionalism from "@/components/housing-clusters/CureForUnprofessionalism";
import Contact from "@/components/form/Contact";

export const metadata = {
  title: "Housing Clusters | Crystal Genius International Limited",
  description: "Join a verified housing cluster and pool funds to co-own a building block or estate without the heavy financial burden.",
};

export default function HousingClustersPage() {
  return (
    <main className="w-full">
      <HousingClustersHero />
      <StruggleSection />
      <InfoCardsSection />
      <EngineeredSteps />
      <GoalsSection />
      <PaymentMilestones />
      <CureForUnprofessionalism />
      
      <div id="contact-us">
        <Contact />
      </div>
    </main>
  );
}
