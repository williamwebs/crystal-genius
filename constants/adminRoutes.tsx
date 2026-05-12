import React from "react";
import { CartIcon, CartIconActive, ContactMessagesIcon, DashboardOverviewIcon, DashboardOverviewIconActive, DrawingsManagemntIcon, DrawingsManagemntIconActive, PortfolioManagementIcon, PortfolioManagementIconActive, SettingsIcon, SettingsIconActive } from "./images";

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
    activeIcon: DashboardOverviewIconActive,
  },
  {
    name: "Drawings Management",
    url: "/drawings-management",
    icon: DrawingsManagemntIcon,
    activeIcon: DrawingsManagemntIconActive,
  },
  {
    name: "Purchases / Orders",
    url: "/orders",
    icon: CartIcon,
    activeIcon: CartIconActive,
  },
  {
    name: "Portfolio Projects",
    url: "/projects-management",
    icon: PortfolioManagementIcon,
    activeIcon: PortfolioManagementIconActive,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIconActive,
  },
];
