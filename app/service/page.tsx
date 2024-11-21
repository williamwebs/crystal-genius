import ServicePageHero from "../../components/hero/ServicePageHero";
import NeedOurService from "../../components/need-our-service/NeedOurService";
import Services from "../../components/services/Services";

const page = () => {
  return (
    <main>
      <ServicePageHero />
      <div className="container mx-auto py-10">
        <Services row="lg:grid-cols-2" />
      </div>
      <NeedOurService />
    </main>
  );
};

export default page;
