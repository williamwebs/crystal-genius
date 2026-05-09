import React from "react";
import StatCard from "../../../components/admin/StatCard";
import RecentActivity from "../../../components/admin/RecentActivity";
import {
  CartIcon,
  DrawingsManagemntIcon,
  PendingOrderIcon,
  RightArrowIcon2,
  TotalDrawingsIcon,
  TotalRevenueIcon,
  UnreadMessagesIcon,
} from "../../../constants/images";
import Link from "next/link";
import {
  createAdminSupabaseClient,
  hasAdminSupabaseAccess,
} from "../../../lib/admin-supabase";
import { getServerSupabaseContext } from "../../../lib/server-supabase";
import { koboToNaira, Order } from "../../../types/database";

const DashboardOverview = async () => {
  const { user, supabase: scopedSupabase } = await getServerSupabaseContext();

  if (!user) {
    return null;
  }

  const supabase = hasAdminSupabaseAccess()
    ? createAdminSupabaseClient()
    : scopedSupabase;

  // Fetch stats concurrently
  const [
    { count: totalDrawings },
    { data: revenueData },
    { count: totalOrders },
    { count: totalProjects },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from("drawings").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("amount").eq("status", "approved"),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("id, buyer_name, buyer_email, amount, status, asset_status, drawing_id, drawing_title, paystack_reference, download_token, download_expires_at, order_ref, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalRevenueKobo = revenueData?.reduce((acc, order) => acc + order.amount, 0) || 0;
  const recentActivityOrders = (recentOrders ?? []) as Order[];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Total Drawings"
          value={totalDrawings?.toString() || "0"}
          iconBgColor="#F59E0B"
          icon={<TotalDrawingsIcon />}
        />
        <StatCard
          title="Total Revenue"
          value={koboToNaira(totalRevenueKobo)}
          iconBgColor="#22C55E"
          icon={<TotalRevenueIcon />}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders?.toString() || "0"}
          iconBgColor="#FF0000"
          icon={<PendingOrderIcon />}
        />
        <StatCard
          title="Total Projects"
          value={totalProjects?.toString() || "0"}
          iconBgColor="#0077CC"
          icon={<UnreadMessagesIcon />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="">
          <RecentActivity orders={recentActivityOrders} />
        </div>

        {/* Quick Actions */}
        <div className="">
          <div className="bg-[#555555] rounded-[8px]">
            <div className="border-b border-D6D6D6/50 p-4">
              <h2 className="text-base font-nunito font-medium text-white">
                Quick Actions
              </h2>
            </div>
            <div className="space-y-3 p-4">
              <Link
                href={"/drawings-management/add-new-drawing"}
                className="w-full flex items-center justify-between bg-dark hover:bg-dark/50 text-white px-4 py-[10px] rounded-[6px] transition-colors border border-D6D6D6/50"
              >
                <div className="flex items-center gap-3">
                  <DrawingsManagemntIcon />
                  <span className="font-nunito font-medium text-[13px] text-FCFAFA">
                    Add New Drawing
                  </span>
                </div>
                <RightArrowIcon2 />
              </Link>

              <Link
                href={"/orders"}
                className="w-full flex items-center justify-between bg-dark hover:bg-dark/50 text-white px-4 py-[10px] rounded-[6px] transition-colors border border-D6D6D6/50"
              >
                <div className="flex items-center gap-3">
                  <CartIcon />
                  <span className="font-nunito font-medium text-[13px] text-FCFAFA">
                    View Orders
                  </span>
                  {totalOrders && totalOrders > 0 ? (
                    <div className="bg-[#FEE2E2] px-2 h-4 text-[#991B1B] text-[10px] font-nunito font-medium flex items-center justify-center rounded-full">
                      {totalOrders}
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <RightArrowIcon2 />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
