"use client";

import React from "react";
import ProjectsTabContent, {
  type ProjectWithCategory,
} from "./ProjectsTabContent";

type ProjectsPageTabsProps = {
  projects: ProjectWithCategory[];
};

const ProjectsPageTabs = ({ projects }: ProjectsPageTabsProps) => {
  return (
    <div className="w-full flex flex-col relative">
      <div className="container mx-auto relative mt-8 px-4">
        <ProjectsTabContent projects={projects} />
      </div>
    </div>
  );
};

export default ProjectsPageTabs;
