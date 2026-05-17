"use client";

import Image from "next/image";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { ArrowRightSlant, NoPropertyImage } from "../../constants/images";
import { Button } from "../ui/button";
import ProjectLightbox from "./ProjectLightbox";

const FALLBACK_PROJECT_IMAGE = "/images/no-property.png";

export type ProjectWithCategory = {
  id: string;
  title: string;
  location: string | null;
  area: string | null;
  completion_year: number | null;
  category: string | null;
  type: "building" | "land";
  description: string | null;
  images: string[] | null;
  created_at: string;
  project_categories: { name: string } | null;
};

type CategoryGroup = {
  categoryId: string | null;
  categoryName: string;
  projects: ProjectWithCategory[];
};

type ProjectsTabContentProps = {
  projects: ProjectWithCategory[];
  filterType?: "building" | "land" | null;
};

function groupByCategory(projects: ProjectWithCategory[]): CategoryGroup[] {
  const map = new Map<string, CategoryGroup>();
  const uncategorized: ProjectWithCategory[] = [];

  for (const project of projects) {
    const catId = project.category;
    const catName = project.project_categories?.name ?? null;

    if (!catId || !catName) {
      uncategorized.push(project);
      continue;
    }

    let group = map.get(catId);
    if (!group) {
      group = { categoryId: catId, categoryName: catName, projects: [] };
      map.set(catId, group);
    }
    group.projects.push(project);
  }

  const groups = Array.from(map.values());

  if (uncategorized.length > 0) {
    groups.push({
      categoryId: null,
      categoryName: "Other Projects",
      projects: uncategorized,
    });
  }

  return groups;
}

/* ─── Project Image Card ─── */
function ProjectImageCard({
  project,
  image,
  height,
  onOpen,
  isMainImage,
  isDuringConstruction,
  isAfterConstruction,
}: {
  project: ProjectWithCategory;
  image: string;
  height: string;
  onOpen: () => void;
  isMainImage?: boolean;
  isDuringConstruction?: boolean;
  isAfterConstruction?: boolean;
}) {
  return (
    <div className={`${height} rounded-[4px] overflow-hidden relative group`}>
      <Image
        src={image}
        fill
        alt={project.title}
        className="object-cover cursor-not-allowed pointer-events-none select-none"
        quality={100}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute bottom-3 left-2.5 right-2.5 min-h-[100px] backdrop-blur-[2px] px-2 py-1 flex items-end justify-between gap-[10px]">
        <div className="space-y-[3px] max-w-[450px] w-full">
          <h3 className="font-nunito font-bold text-white text-lg">
            {isMainImage
              ? project.title
              : isDuringConstruction
                ? "During Construction"
                : isAfterConstruction
                  ? "After Construction"
                  : ""}
          </h3>
          {isMainImage && project.description && (
            <p className="font-nunito font-normal text-white text-base line-clamp-2">
              {project.description}
            </p>
          )}
          <p className="font-nunito font-semibold text-white text-sm line-clamp-1">
            {project.location ?? ""}
            {project.completion_year ? ` • ${project.completion_year}` : ""}
          </p>
        </div>

        <Button
          onClick={onOpen}
          className="w-[60px] h-[60px] min-w-[60px] bg-red rounded-full flex items-center justify-center hover:bg-red/80 transition-colors"
        >
          <ArrowRightSlant />
        </Button>
      </div>
    </div>
  );
}

/* ─── Category Section ─── */
function CategorySection({
  group,
  onOpenLightbox,
}: {
  group: CategoryGroup;
  onOpenLightbox: (project: ProjectWithCategory, startIndex: number) => void;
}) {
  return (
    <div className="mb-[20px]">
      {group.projects.map((project) => {
        const images =
          project.images && project.images.length > 0
            ? project.images
            : [FALLBACK_PROJECT_IMAGE];

        const mainImage = images[0];
        const sideImages = images.slice(1);

        return (
          <div
            key={project.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-[20px] relative mb-[10px]"
          >
            {/* Main image — sticky */}
            <div className="sticky top-[70px] self-start h-[500px]">
              <ProjectImageCard
                project={project}
                image={mainImage}
                height="h-full"
                onOpen={() => onOpenLightbox(project, 0)}
                isMainImage={true}
              />
            </div>

            {/* Side images */}
            <div className="grid grid-cols-1 gap-[20px]">
              {sideImages.length > 0 ? (
                sideImages.map((img, i) => (
                  <ProjectImageCard
                    key={`${project.id}-side-${i}`}
                    project={project}
                    image={img}
                    height="h-[350px]"
                    onOpen={() => onOpenLightbox(project, i + 1)}
                    isDuringConstruction={sideImages[0] === img ? true : false}
                    isAfterConstruction={sideImages[1] === img ? true : false}
                  />
                ))
              ) : (
                /* If only 1 image, show it as the side too */
                <ProjectImageCard
                  project={project}
                  image={mainImage}
                  height="h-[350px]"
                  onOpen={() => onOpenLightbox(project, 0)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Tab Content Component ─── */
const ProjectsTabContent = ({
  projects,
  filterType = null,
}: ProjectsTabContentProps) => {
  const filtered = useMemo(() => {
    if (!filterType) return projects;
    return projects.filter((p) => p.type === filterType);
  }, [projects, filterType]);

  const groups = useMemo(() => groupByCategory(filtered), [filtered]);

  // Active category tracking via intersection observer
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    groups[0]?.categoryId ?? null,
  );
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (groups.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-category-id");
            if (id !== null) {
              setActiveCategoryId(id === "null" ? null : id);
            }
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [groups]);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProject, setLightboxProject] =
    useState<ProjectWithCategory | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleOpenLightbox = (
    project: ProjectWithCategory,
    startIndex: number,
  ) => {
    setLightboxProject(project);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };

  const scrollToCategory = (categoryId: string | null) => {
    const key = String(categoryId);
    const el = sectionRefs.current.get(key);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (filtered.length === 0) {
    return (
      <div className="bg-white px-6 py-20 text-center font-nunito text-[#555555] shadow-sm my-10 max-h-[400px] h-full flex flex-col md:flex-row items-center justify-center gap-[20px] ">
        <NoPropertyImage />
        <div className="max-w-[300px] w-full space-y-[8px] ">
          <h3 className="font-nunito font-bold text-[#333333] text-[20px] ">
            No Property
          </h3>
          <p className="font-nunito font-medium text-[#999999] text-[15px]">
            No property available under this category. Please check back later
          </p>
        </div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#E5E7EB] bg-white px-6 py-20 text-center font-nunito text-[#555555] shadow-sm my-10">
        No categorized projects available.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-[10px] pb-[60px]">
        {/* Sticky category list */}
        <div className="sticky top-20 z-30 py-2">
          <div className="h-[40px] flex items-center gap-[20px] overflow-x-auto hide-scrollbar">
            {groups.map((group) => {
              const isActive =
                activeCategoryId === group.categoryId ||
                (activeCategoryId === null && group.categoryId === null);

              return (
                <button
                  key={String(group.categoryId)}
                  onClick={() => scrollToCategory(group.categoryId)}
                  className={`flex items-center justify-center min-w-[150px] h-full rounded-[4px] text-[13px] capitalize font-nunito font-medium px-4 transition-all ${
                    isActive
                      ? "bg-red text-white"
                      : "bg-[#F5F5F5] text-[#555555] hover:bg-[#E8E8E8]"
                  }`}
                >
                  {group.categoryName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category sections */}
        {groups.map((group) => (
          <div
            key={String(group.categoryId)}
            ref={(el) => {
              if (el) {
                sectionRefs.current.set(String(group.categoryId), el);
              }
            }}
            data-category-id={String(group.categoryId)}
          >
            <CategorySection
              group={group}
              onOpenLightbox={handleOpenLightbox}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxProject && (
        <ProjectLightbox
          title={lightboxProject.title}
          description={lightboxProject.description ?? ""}
          location={lightboxProject.location ?? "Location unavailable"}
          images={
            lightboxProject.images && lightboxProject.images.length > 0
              ? lightboxProject.images
              : [FALLBACK_PROJECT_IMAGE]
          }
          open={lightboxOpen}
          startIndex={lightboxIndex}
          onOpenChange={setLightboxOpen}
        />
      )}
    </>
  );
};

export default ProjectsTabContent;
