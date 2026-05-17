"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminRoutes } from "../../constants/adminRoutes";
import Image from "next/image";
import { LogoutIcon } from "../../constants/images";
import { supabase } from "../../lib/supabase";

type SidebarUser = {
  name: string;
  email: string;
};

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

function formatFallbackName(email?: string | null) {
  if (!email) {
    return "Admin User";
  }

  return email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const previousPathnameRef = useRef(pathname);
  const [userInfo, setUserInfo] = useState<SidebarUser>({
    name: "Admin User",
    email: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      setUserInfo({
        name: user.user_metadata?.full_name || formatFallbackName(user.email),
        email: user.email || "",
      });
    };

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      onClose?.();
      previousPathnameRef.current = pathname;
    }
  }, [pathname, onClose]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await fetch("/api/auth/session", {
      method: "DELETE",
    });

    router.replace("/cg-login");
    router.refresh();
  };

  const avatarLetter = (userInfo.name || userInfo.email || "A")
    .trim()
    .charAt(0)
    .toUpperCase();

  const handleNavigate = () => {
    onClose?.();
  };

  const sidebarContent = (
    <>
      <div className="flex items-start justify-between gap-3">
        <Image
          src={"/mobile-logo.svg"}
          width={75}
          height={68}
          alt="Crystal company logo"
          className="block"
        />
        <div className="flex items-center gap-3">
          <div className="font-medium text-[11px] text-[#D6D6D6]">
            Admin Panel
          </div>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden text-white"
            aria-label="Close sidebar"
          >
            <Image
              src={"/ic_baseline-close.svg"}
              width={24}
              height={24}
              alt="Close sidebar"
            />
          </button>
        </div>
      </div>

      <nav className="dashboard-scrollbar-hidden flex-1 space-y-4 mt-10 overflow-y-auto">
        {adminRoutes.map((route) => {
          const isActive =
            route.url === "/cg-admin"
              ? pathname === route.url
              : pathname.startsWith(route.url);
          const RouteIcon =
            isActive && route.activeIcon ? route.activeIcon : route.icon;

          return (
            <Link
              key={route.name}
              href={route.url}
              onClick={handleNavigate}
              className={`flex items-center gap-2 px-4 py-[10px] rounded-lg transition-colors ${
                isActive
                  ? "bg-[#333333] text-yellow-500 border-l-4 border-[#F59E0B] font-medium"
                  : "hover:bg-[#333333] hover:text-white text-D6D6D6"
              }`}
            >
              <div
                className={`${isActive ? "text-yellow-500" : "text-D6D6D6"}`}
              >
                <RouteIcon />
              </div>
              <span
                className={`font-medium font-nunito text-sm ${
                  isActive ? "text-[#F59E0B]" : "text-D6D6D6"
                }`}
              >
                {route.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-5 align-bottom">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center text-white font-bold">
            {avatarLetter}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white font-nunito font-medium text-sm">
              {userInfo.name}
            </span>
            <span className="text-[11px] text-paragraphGrey font-nunito font-medium truncate">
              {userInfo.email || "No email available"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full px-2"
        >
          <LogoutIcon />
          <span className="font-nunito font-medium text-D6D6D6 text-sm">
            Sign Out
          </span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex w-[280px] flex-col bg-[#555555] text-[#D6D6D6] h-full px-4 py-5 font-nunito">
        {sidebarContent}
      </aside>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0 bg-black/55"
          aria-label="Close sidebar overlay"
        />
        <aside
          className={`relative flex h-full w-[280px] flex-col bg-[#555555] px-4 py-5 font-nunito text-[#D6D6D6] shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
