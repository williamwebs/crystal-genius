"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { adminRoutes } from "../../constants/adminRoutes";
import { NotificationIcon, SearchIcon } from "../../constants/images";
import { Notification } from "../../types/database";

type NotificationsResponse = {
  notifications: Notification[];
  unreadCount: number;
};

type AdminHeaderProps = {
  onMenuToggle?: () => void;
};

const AdminHeader = ({ onMenuToggle }: AdminHeaderProps) => {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  // Find the current route name from our constants, or default to standard string
  // Use startsWith for non-root routes so sub-pages show the parent route title
  const currentRoute = adminRoutes.find((r) =>
    r.url === "/cg-admin"
      ? pathname === r.url
      : pathname.startsWith(r.url),
  );
  const pageTitle = currentRoute ? currentRoute.name : "Dashboard";

  useEffect(() => {
    let isMounted = true;

    const loadNotifications = async () => {
      try {
        const response = await fetch("/api/admin/notifications", {
          method: "GET",
          cache: "no-store",
        });
        const result = (await response.json()) as NotificationsResponse & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch notifications");
        }

        if (!isMounted) {
          return;
        }

        setNotifications(result.notifications ?? []);
        setUnreadCount(result.unreadCount ?? 0);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };

    void loadNotifications();
    const intervalId = window.setInterval(() => {
      void loadNotifications();
    }, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const handleToggleNotifications = async () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);

    if (!nextIsOpen || unreadCount === 0) {
      return;
    }

    try {
      const response = await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mark_all_read: true }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to update notifications");
      }

      setUnreadCount(0);
      setNotifications((current) =>
        current.map((notification) => ({ ...notification, is_read: true }))
      );
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  return (
    <header className="sticky w-full top-0 border-b border-D6D6D6/50 bg-dark flex items-center justify-between pb-3 px-4 py-3 mb-2 z-20">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white transition-colors hover:bg-[#333333]"
          aria-label="Toggle sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 17H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h1 className="text-xl font-medium font-nunito text-white tracking-wide">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="hidden md:inline-block relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon/>
          </div>
          <input
            type="text"
            className="block w-64 pl-10 pr-3 py-2 border border-[#D1D5DB]/50 rounded-md leading-5 bg-dark text-[#BBBBBB] font-nunito font-medium placeholder-[#BBBBBB] focus:outline-none focus:ring-1 focus:ring-red focus:border-red text-[13px] transition-colors"
            placeholder="Search dashboard..."
          />
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => void handleToggleNotifications()}
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <NotificationIcon />
            {unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 min-w-[18px] h-[18px] rounded-full bg-red px-1 text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            ) : null}
          </button>

          {isOpen ? (
            <div className="absolute right-0 mt-3 w-[360px] rounded-xl border border-white/10 bg-[#333333] shadow-xl z-30 overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <h3 className="text-sm font-medium text-white">Notifications</h3>
                <span className="text-[11px] text-D6D6D6">
                  {unreadCount} unread
                </span>
              </div>
              <div className="dashboard-scrollbar-hidden max-h-[360px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-D6D6D6">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-b border-white/10 px-4 py-3 ${
                        notification.is_read ? "bg-[#333333]" : "bg-dark/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>
                          {notification.description ? (
                            <p className="mt-1 text-[12px] leading-5 text-D6D6D6">
                              {notification.description}
                            </p>
                          ) : null}
                        </div>
                        {!notification.is_read ? (
                          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red" />
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
