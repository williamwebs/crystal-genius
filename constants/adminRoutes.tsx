import React from "react";
import { CartIcon, ContactMessagesIcon, DashboardOverviewIcon, DrawingsManagemntIcon, PortfolioManagementIcon, SettingsIcon } from "./images";

type AdminRoutes = {
  name: string;
  url: string;
  icon: () => React.JSX.Element;
  activeIcon?: () => React.JSX.Element;
};

export const adminRoutes: AdminRoutes[] = [
  {
    name: "Dashboard Overview",
    url: "/cg-admin",
    icon: DashboardOverviewIcon,
  },
  {
    name: "Drawings Management",
    url: "/drawings-management",
    icon: DrawingsManagemntIcon,
  },
  {
    name: "Purchases / Orders",
    url: "/orders",
    icon: CartIcon,
  },
  {
    name: "Portfolio Projects",
    url: "/projects-management",
    icon: PortfolioManagementIcon,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
];
