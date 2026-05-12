"use client";

import React, { useState } from "react";
import ProjectsTabContent, {
  type ProjectWithCategory,
} from "./ProjectsTabContent";

type TabKey = "all" | "building" | "land";

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "building", label: "Building" },
  { key: "land", label: "Land" },
];

type ProjectsPageTabsProps = {
  projects: ProjectWithCategory[];
};

const ProjectsPageTabs = ({ projects }: ProjectsPageTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  return (
    <div className="w-full flex flex-col relative">
      {/* Tab bar */}
      <div className="w-full bg-[#EFEFEF] h-[70px] flex items-center mb-0">
        <div className="container mx-auto flex items-center gap-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative font-nunito font-light text-base px-4 py-2 transition-colors ${
                  isActive
                    ? "text-red font-medium"
                    : "text-[#555555] hover:text-red"
                }`}
              >
                {tab.label}
                {/* Red bottom border for active tab */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="container mx-auto relative mt-8">
        {activeTab === "all" && (
          <ProjectsTabContent projects={projects} />
        )}
        {activeTab === "building" && (
          <ProjectsTabContent projects={projects} filterType="building" />
        )}
        {activeTab === "land" && (
          <ProjectsTabContent projects={projects} filterType="land" />
        )}
      </div>
    </div>
  );
};

export default ProjectsPageTabs;
