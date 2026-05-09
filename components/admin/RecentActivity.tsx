import React from "react";
import { PurchaseActivityIcon } from "../../constants/images";
import { Order, koboToNaira } from "../../types/database";

type RecentActivityProps = {
  orders: Order[];
};

function formatOrderDate(createdAt: string) {
  return new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(createdAt));
}

function getStatusStyles(status: Order["status"]) {
  if (status === "approved") {
    return "bg-[#DCFCE7] text-[#166534]";
  }

  if (status === "pending") {
    return "bg-[#FEF3C7] text-[#F59E0B]";
  }

  return "bg-[#E5E7EB] text-[#6B7280]";
}

function getStatusLabel(status: Order["status"]) {
  return status === "declined" ? "Declined" : status.charAt(0).toUpperCase() + status.slice(1);
}

const RecentActivity = ({ orders }: RecentActivityProps) => {
  if (orders.length === 0) {
    return (
      <div className="rounded overflow-hidden ">
        <div className="px-6 py-3 bg-[#555555] border-b border-D6D6D6/50">
          <h2 className="text-base font-nunito font-medium text-FCFAFA">
            Recent Activity
          </h2>
        </div>
        <div className="mt-3 bg-[#555555] rounded-[4px] px-6 py-10 text-center text-sm text-D6D6D6 font-nunito">
          No recent orders yet.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded overflow-hidden ">
      <div className="px-6 py-3 bg-[#555555] border-b border-D6D6D6/50">
        <h2 className="text-base font-nunito font-medium text-FCFAFA">
          Recent Activity
        </h2>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="py-3 px-4 hover:bg-dark bg-[#555555] border-b border-D6D6D6/50 transition-colors flex items-center gap-3"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center`}
            >
              <PurchaseActivityIcon />
            </div>
            <div className="flex-1 flex flex-col gap-1 font-nunito font-medium">
              <h3 className="text-sm text-white">
                {order.drawing_title
                  ? `New order for ${order.drawing_title}`
                  : "New drawing order"}
              </h3>
              <p className="text-[11px] text-D6D6D6">
                By {order.buyer_name} - {koboToNaira(order.amount)}
              </p>
            </div>
            <div className="text-right flex flex-col gap-1 font-nunito font-medium">
              <p className="text-[11px] text-D6D6D6">
                {formatOrderDate(order.created_at)}
              </p>
              <span
                className={`inline-block px-2 py-1 text-[11px] rounded ${getStatusStyles(order.status)}`}
              >
                {getStatusLabel(order.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
