import React from "react";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "../../../../lib/server-supabase";
import { koboToNaira } from "../../../../types/database";
import {
  AreaIcon,
  FloorIcon,
  LockImage,
  TypeIcon,
} from "../../../../constants/images";
import CheckoutForm from "../../../../components/checkout/CheckoutForm";
import DrawingDetailGallery from "../../../../components/drawings/DrawingDetailGallery";
import Image from "next/image";

interface DrawingDetailPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60; // revalidate every 60 seconds

export default async function DrawingDetailPage({
  params,
}: DrawingDetailPageProps) {
  const supabase = await createServerSupabaseClient();
  const { id } = await params;

  const { data: drawing, error } = await supabase
    .from("drawings")
    .select("*")
    .eq("id", id)
    .eq("status", "active")
    .single();

  if (error || !drawing) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen py-10 mt-[40px]">
      <div className="container mx-auto px-4 md:px-0 max-w-[1000px] ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Images */}
          <div className="w-full min-h-[400px] h-full bg-[#EFEFEF] p-6 rounded-t-[500px] relative overflow-hidden ">
            <Image
              src={drawing.preview_images?.[0] ?? ""}
              alt={drawing.title}
              fill
              className="object-cover object-top cursor-not-allowed select-none pointer-events-none"
            />
          </div>

          {/* Right Column: Details & Checkout */}
          <div className="flex flex-col gap-[30px] ">
            <div className="flex flex-col gap-[30px] ">
              <div className="flex flex-col gap-[10px] max-w-[400px] ">
                <LockImage />
                <h4 className="font-nunito font-bold text-[#333333] text-[28px] uppercase line-clamp-2 ">
                  Purchase {drawing.title}
                </h4>
              </div>

              <div className="flex flex-col gap-[20px] max-w-[400px] ">
                <div className="flex flex-col gap-[2px] font-nunito ">
                  <h5 className="font-bold text-[18px] text-[#777777] ">
                    Unlock Full Images
                  </h5>
                  <p className="font-normal text-[#777777] text-[15px]">
                    You are purchasing the full structural Renderings for{" "}
                    <span className="font-bold capitalize text-[#777777]">
                      {drawing.title}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-[5px] font-nunito ">
                  <div className="min-w-[340px] ">
                    <p className="font-bold text-dark text-[20px]">
                      NGN
                      <span className="text-red text-[40px]">
                        {koboToNaira(drawing.price, false)}.00
                      </span>
                      <span className="font-medium text-[#777777] text-sm">
                        /One Time Purchase
                      </span>
                    </p>
                  </div>
                  <p className="font-bold text-dark text-xs ">
                    Upon the completion of your payment you'll receive this
                    drawing Doc via provided email below
                  </p>
                </div>
              </div>

              <CheckoutForm drawingId={drawing.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
