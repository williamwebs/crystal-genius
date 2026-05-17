import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../lib/admin-supabase";
import { createServerSupabaseClient } from "../../../lib/server-supabase";
import { unstable_noStore as noStore } from "next/cache";
import InnerServicesHero from "@/components/hero/InnerServices";
import ProjectsTabContent, {
  type ProjectWithCategory,
} from "@/components/projects/ProjectsTabContent";
import ProjectsPageTabs from "@/components/projects/ProjectsPageTabs";
// import ProjectsPageTabs from "@/components/projects/ProjectsPageTabs";

const PortfolioPage = async () => {
  noStore();

  const supabase = hasAdminSupabaseAccess()
    ? createAdminSupabaseClient()
    : await createServerSupabaseClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*, project_categories(name)")
    .order("created_at", { ascending: false });

  const allProjects = (projects ?? []) as ProjectWithCategory[];

  return (
    <main>
      <InnerServicesHero
        routeText="Projects"
        title="Building History"
        description="Explore articles on the latest industry trends, cutting-edge technologies, and expert insights to stay informed and inspired in the world of construction."
        backgroundImage="/images/projects-hero.svg"
        showButton={false}
      />

      <div className="max-w-[1000px] w-full mx-auto pt-[100px] pb-[50px] px-4">
        <h3 className="text-3xl md:text-5xl text-dark text-left md:text-center font-impact font-normal">
          Explore Our Projects
        </h3>

        <div className="space-y-2 mt-[30px] max-w-[720px] mx-auto">
          <p className="text-grey font-nunito font-medium text-left md:text-center">
            Since 1898, Bechtel has helped customers complete more than 25,000
            projects in 160 countries on all seven continents
          </p>
          <p className="text-grey font-nunito font-medium">
            We have worked across a diverse set of markets delivering pragmatic
            solutions to tackle some of the world&apos;s most complex
            challenges. Whether revitalizing chipmaking with advanced
            semiconductor manufacturing facilities, expanding transit systems
            and connecting communities, advancing renewable and nuclear energy,
            or securing critical mineral supply chains, our teams draw on our
            generations of knowledge to design and build resilient, sustainable
            infrastructure.
          </p>
        </div>
      </div>

      <div className="relative pb-20">
        {error ? (
          <div className="rounded-[20px] border border-[#E5E7EB] bg-white px-4 py-20 text-center font-nunito text-[#555555] shadow-sm">
            Failed to load projects. Please try again shortly.
          </div>
        ) : (
          <ProjectsPageTabs projects={allProjects} />
        )}
      </div>
    </main>
  );
};

export default PortfolioPage;
