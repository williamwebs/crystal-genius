"use client";

import React, { useCallback, useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

type AdminShellProps = {
  children: React.ReactNode;
};

const AdminShell = ({ children }: AdminShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((current) => !current);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#242424] text-gray-200 font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
      <main className="dashboard-scrollbar-hidden relative flex-1 min-w-0 h-full overflow-y-auto bg-dark">
        <AdminHeader onMenuToggle={handleToggleSidebar} />
        <div className="px-4 py-3 md:px-5">{children}</div>
      </main>
    </div>
  );
};

export default AdminShell;
