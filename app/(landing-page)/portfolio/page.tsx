import { ThumbSlider } from "../../../components/ThumbSlider";
import PaginationLinks from "../../../components/PaginationLinks";
import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../lib/admin-supabase";
import { createServerSupabaseClient } from "../../../lib/server-supabase";
import { Project } from "../../../types/database";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 10;
const FALLBACK_PROJECT_IMAGE = "/images/no-property.png";

type PortfolioPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function parsePage(value?: string) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
}

function formatCategory(category: Project["category"]) {
  if (!category) {
    return "Project";
  }

  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const PortfolioPage = async ({ searchParams }: PortfolioPageProps) => {
  noStore();

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(resolvedSearchParams?.page);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE - 1;
  const supabase = hasAdminSupabaseAccess()
    ? createAdminSupabaseClient()
    : await createServerSupabaseClient();
  const { data: projects, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .range(startIndex, endIndex);
  const totalItems = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  return (
    <main>
      <div className="container mx-auto px-4 py-28 md:px-0">
        <p className="text-base text-paragraphGrey">Portfolio</p>
        <h3 className="my-2 font-impact text-5xl font-normal text-dark">
          <span className="font-nunito text-5xl font-bold italic text-yellow">
            Our
          </span>{" "}
          Properties
        </h3>
        <p className="mt-4 max-w-[720px] font-nunito text-base text-paragraphGrey">
          Explore our completed and active design projects across residential,
          commercial, industrial, and mixed-use spaces.
        </p>

        {error ? (
          <div className="mt-14 rounded-[20px] border border-[#E5E7EB] bg-white px-6 py-20 text-center font-nunito text-[#555555] shadow-sm">
            Failed to load portfolio projects right now. Please try again
            shortly.
          </div>
        ) : !projects || projects.length === 0 ? (
          <div className="mt-14 rounded-[20px] border border-[#E5E7EB] bg-white px-6 py-20 text-center font-nunito text-[#555555] shadow-sm">
            No portfolio projects are available yet.
          </div>
        ) : (
          <>
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-10">
              {projects.map((project, index) => (
                <div
                  className="h-fit overflow-hidden rounded-lg bg-white p-2 shadow md:p-4"
                  key={project.id}
                >
                  <ThumbSlider
                    images={
                      project.images?.length
                        ? project.images
                        : [FALLBACK_PROJECT_IMAGE]
                    }
                    title={project.title}
                    description={project.description ?? ""}
                    location={project.location ?? "Location unavailable"}
                    type={formatCategory(project.category)}
                    isCompleted={Boolean(project.completion_year)}
                    id={startIndex + index}
                  />
                </div>
              ))}
            </div>

            <PaginationLinks
              basePath="/portfolio"
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default PortfolioPage;
