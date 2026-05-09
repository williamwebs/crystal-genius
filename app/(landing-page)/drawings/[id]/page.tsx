import React from "react";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "../../../../lib/server-supabase";
import { koboToNaira } from "../../../../types/database";
import { AreaIcon, FloorIcon, TypeIcon } from "../../../../constants/images";
import CheckoutForm from "../../../../components/checkout/CheckoutForm";
import DrawingDetailGallery from "../../../../components/drawings/DrawingDetailGallery";

interface DrawingDetailPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60; // revalidate every 60 seconds

export default async function DrawingDetailPage({ params }: DrawingDetailPageProps) {
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
    <main className="bg-white min-h-screen py-20 mt-[80px]">
      <div className="container mx-auto px-4 md:px-0 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Images */}
          <DrawingDetailGallery
            title={drawing.title}
            images={drawing.preview_images ?? []}
          />

          {/* Right Column: Details & Checkout */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold font-nunito text-gray-900 mb-2">
              {drawing.title}
            </h1>
            <p className="text-red font-extrabold font-nunito text-2xl mb-6">
              {koboToNaira(drawing.price)}
            </p>

            <div className="prose prose-sm max-w-none text-gray-600 mb-8 font-nunito">
              <p className="whitespace-pre-wrap">{drawing.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex flex-col items-center justify-center text-center">
                <AreaIcon />
                <span className="text-gray-500 text-xs font-nunito font-bold mt-2 uppercase tracking-wider">Area</span>
                <span className="text-gray-900 text-sm font-nunito font-extrabold mt-1">{drawing.area || 'N/A'}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <FloorIcon />
                <span className="text-gray-500 text-xs font-nunito font-bold mt-2 uppercase tracking-wider">Floors</span>
                <span className="text-gray-900 text-sm font-nunito font-extrabold mt-1">
                  {drawing.number_of_floors ? `${drawing.number_of_floors} Stories` : 'N/A'}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <TypeIcon />
                <span className="text-gray-500 text-xs font-nunito font-bold mt-2 uppercase tracking-wider">Type</span>
                <span className="text-gray-900 text-sm font-nunito font-extrabold mt-1 capitalize">{drawing.type}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="mb-4 text-sm text-gray-600 font-nunito">
                <span className="font-bold block mb-1">What&apos;s included:</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full Architectural Floor Plans</li>
                  <li>Structural Details & Reinforcement Plans</li>
                  <li>Elevations & Sections</li>
                  <li>High-resolution PDF Format</li>
                </ul>
              </div>

              <CheckoutForm drawingId={drawing.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
