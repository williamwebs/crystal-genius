"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ApproveIcon,
  MailboxIcon,
  RejectIcon,
} from "../../../constants/images";
import { Order, koboToNaira } from "../../../types/database";
import toast from "react-hot-toast";

type StatusType = "All Orders" | "Pending" | "Approved" | "Rejected";
type OrderWithDrawingPreview = Order & {
  drawing?: {
    preview_images: string[] | null;
  } | null;
};

const OrdersManagement = () => {
  const [status, setStatus] = useState<StatusType>("All Orders");
  const [orders, setOrders] = useState<OrderWithDrawingPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/orders", {
        method: "GET",
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch orders");
      }

      setOrders((result.orders ?? []) as OrderWithDrawingPreview[]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (s: StatusType) => {
    if (s === status) return;
    setStatus(s);
  };

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "declined") => {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Failed to ${newStatus} order`);
      }

      toast.success(`Order ${newStatus} successfully`);
      setOrders((current) =>
        current.map((order) =>
          order.id === id
            ? ({ ...(order as OrderWithDrawingPreview), ...(result.order as OrderWithDrawingPreview) } as OrderWithDrawingPreview)
            : order
        )
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${newStatus} order`
      );
    }
  };

  const filteredOrders = orders.filter(o => {
    if (status === "All Orders") return true;
    if (status === "Pending") return o.status === "pending";
    if (status === "Approved") return o.status === "approved";
    if (status === "Rejected") return o.status === "declined";
    return true;
  });

  const pendingCount = orders.filter(o => o.status === "pending").length;
  const approvedCount = orders.filter(o => o.status === "approved").length;
  const rejectedCount = orders.filter(o => o.status === "declined").length;

  return (
    <div className="space-y-8">
      <div className="font-nunito font-medium">
        {/* tabs */}
        <div className="max-w-[500px] w-full h-[59px] grid grid-cols-4 gap-10 mb-[30px] overflow-auto hide-scrollbar ">
          <div
            onClick={() => handleStatusChange("All Orders")}
            className={`border-b ${status === "All Orders" ? "border-F59E0B" : "border-transparent"} flex items-center justify-center gap-3 h-full min-w-[100px] cursor-pointer`}
          >
            <p
              className={`text-[11px] ${status === "All Orders" ? "text-F59E0B" : "text-FCFAFA"}`}
            >
              All Orders
            </p>
            <span className="min-w-[27px] h-[19px] rounded-full flex items-center justify-center bg-[#FEF3C7] text-F59E0B text-[11px]">
              {orders.length}
            </span>
          </div>
          <div
            onClick={() => handleStatusChange("Pending")}
            className={`border-b ${status === "Pending" ? "border-F59E0B" : "border-transparent"} flex items-center justify-center gap-3 h-full min-w-[100px] cursor-pointer`}
          >
            <p
              className={`text-[11px] ${status === "Pending" ? "text-F59E0B" : "text-FCFAFA"}`}
            >
              Pending
            </p>
            <span className="min-w-[27px] h-[19px] rounded-full flex items-center justify-center bg-FCFAFA text-red text-[11px]">
              {pendingCount}
            </span>
          </div>
          <div
            onClick={() => handleStatusChange("Approved")}
            className={`border-b ${status === "Approved" ? "border-F59E0B" : "border-transparent"} flex items-center justify-center gap-3 h-full min-w-[100px] cursor-pointer`}
          >
            <p
              className={`text-[11px] ${status === "Approved" ? "text-F59E0B" : "text-FCFAFA"}`}
            >
              Approved
            </p>
            <span className="min-w-[27px] h-[19px] rounded-full flex items-center justify-center bg-FCFAFA text-red text-[11px]">
              {approvedCount}
            </span>
          </div>
          <div
            onClick={() => handleStatusChange("Rejected")}
            className={`border-b ${status === "Rejected" ? "border-F59E0B" : "border-transparent"} flex items-center justify-center gap-3 h-full min-w-[100px] cursor-pointer`}
          >
            <p
              className={`text-[11px] ${status === "Rejected" ? "text-F59E0B" : "text-FCFAFA"}`}
            >
              Rejected
            </p>
            <span className="min-w-[27px] h-[19px] rounded-full flex items-center justify-center bg-FCFAFA text-red text-[11px]">
              {rejectedCount}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto hide-scrollbar">
          {/* Table Header Wrapper */}
          <div className="grid grid-cols-12 gap-4 px-4 py-4 bg-dark border-b border-white/50 text-[13px] font-nunito font-medium text-D6D6D6 tracking-wider min-w-[900px]">
            <div className="col-span-4">Recent Activity</div>
            <div className="col-span-3">Buyers</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Action</div>
          </div>

          {/* List Body */}
          <div className="min-w-[900px]">
            {loading ? (
              <div className="text-center text-sm text-D6D6D6 py-20 font-nunito bg-[#555555] mt-3 rounded-[4px]">
                Loading orders...
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-12 gap-4 items-center min-h-[81px] bg-[#555555] px-4 py-4 hover:bg-dark border-b border-white/50 rounded-[4px] font-nunito font-medium mt-3 transition-colors"
                >
                  <div className="col-span-4 text-sm text-FCFAFA flex items-center gap-4">
                    <div className="w-12 h-12 rounded object-cover bg-red shrink-0 overflow-hidden flex items-center justify-center text-xs font-bold">
                      {order.drawing?.preview_images?.[0] ? (
                        <div className="relative h-full w-full">
                          <Image
                            src={order.drawing.preview_images[0]}
                            alt={order.drawing_title || "Ordered drawing"}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <>
                          {order.drawing_title
                            ? order.drawing_title.substring(0, 2).toUpperCase()
                            : "DR"}
                        </>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm text-FCFAFA line-clamp-1">
                        {order.drawing_title || "Drawing Download"}
                      </h3>
                      <p className="text-[11px] text-D6D6D6">
                        Ref:{" "}
                        {order.paystack_reference || order.id.substring(0, 8)}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-3 space-y-2">
                    <p className="text-sm text-FCFAFA line-clamp-1">
                      {order.buyer_name}
                    </p>
                    <p className="text-[11px] text-D6D6D6 truncate">
                      {order.buyer_email}
                    </p>
                  </div>

                  <div className="col-span-2 font-bold">
                    <p className="text-sm text-FCFAFA line-clamp-1">
                      {koboToNaira(order.amount)}
                    </p>
                  </div>

                  <div className="col-span-2 text-[13px] text-D6D6D6 flex items-center gap-2">
                    <span
                      className={`w-[67px] h-[27px] inline-flex items-center justify-center rounded-full text-[11px] font-medium capitalize ${
                        order.status === "approved"
                          ? "bg-[#DCFCE7] text-[#166534]"
                          : order.status === "pending"
                            ? "bg-[#FEF3C7] text-[#92400E]"
                            : "bg-[#FEE2E2] text-red"
                      }`}
                    >
                      {order.status}
                    </span>
                    {order.asset_status === "sent" && (
                      <div className="flex items-center gap-1">
                        <MailboxIcon />
                        <span className="font-nunito font-medium text-[11px] text-D6D6D6">
                          Sent
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="col-span-1">
                    {order.status !== "pending" ? (
                      <span className="font-nunito font-medium text-[#BBBBBB] text-xs">
                        Processed
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(order.id, "approved")
                          }
                          className="cursor-pointer bg-transparent hover:opacity-80"
                          title="Approve"
                        >
                          <ApproveIcon />
                        </button>

                        <button
                          onClick={() =>
                            handleUpdateStatus(order.id, "declined")
                          }
                          className="cursor-pointer bg-transparent hover:opacity-80"
                          title="Decline"
                        >
                          <RejectIcon />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {!loading && filteredOrders.length === 0 && (
            <div className="text-center text-sm text-D6D6D6 py-20 font-nunito bg-[#555555] mt-3 rounded-[4px]">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;
