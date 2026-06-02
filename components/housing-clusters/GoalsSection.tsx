"use client";

import { LandlordCardIcon, YellowCheckmark } from "@/constants/images";
import Link from "next/link";

export default function GoalsSection() {
  return (
    <section className="bg-[#F59E0B] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-dark font-bold text-sm text-left md:text-center uppercase block mb-4">
            Choose Your Housing Package
          </span>
          <h2 className="text-4xl md:text-[46px] text-dark text-left md:text-center font-impact font-normal capitalize mb-1.5 leading-tight">
            Engineered for your specific goals.
          </h2>
          <p className="text-[#555555] font-nunito text-sm text-left md:text-md max-w-2xl mx-auto">
            We break down the barriers to premium real estate by pooling
            resources. Stop waiting years to save for a single plot. Start
            building immediately with a verified cluster.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-5xl mx-auto">
          {/* Landlord Card */}
          <div className="w-full lg:w-1/2 bg-[#0F172A] rounded-[20px] border border-[#334155] p-4 md:p-6 flex flex-col space-y-5 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <LandlordCardIcon />
              <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] px-4 py-0.5 text-[#999999] text-xs font-nunito font-normal capitalize ">
                for rental income
              </div>
            </div>

            <div className="max-w-[328px] space-y-3 ">
              <h3 className="text-white font-nunito text-md md:text-lg font-medium uppercase">
                Package A: Block of Flats
              </h3>

              <div className="max-w-[161px] ">
                <h4 className="font-bold font-nunito text-[#F59E0B] text-[28px]">
                  ₦30M-₦50M
                </h4>
                <p className="font-nunito font-normal text-[13px] text-[#94A3B8]">
                  Per unit investment
                </p>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow relative z-10">
              {[
                "Strategic high-demand rental locations",
                "2-3 bedroom apartment units",
                "High rental yield potential",
                "Lower entry point for investors",
                "Faster ROI through immediate tenancy",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <YellowCheckmark />
                  <span className="text-D6D6D6 font-nunito font-normal text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border border-dark p-4 rounded-[8px]">
              <span className="font-nunito font-normal text-D6D6D6 text-[11px] ">
                Best For
              </span>
              <p className="text-[#F59E0B] text-xs font-nunito font-semibold uppercase">
                Investors, young professionals, rental income seekers.
              </p>
            </div>

            <Link
              href="/contact-us"
              className="bg-transparent border border-[#0077CC] w-full rounded-[4px] h-11 flex items-center justify-center text-white text-sm font-nunito font-normal"
            >
              Reserve a Slot
            </Link>
          </div>

          {/* Developer Card */}
          <div className="w-full lg:w-1/2 bg-[#0F172A] rounded-[20px] border-t-4 border-red p-4 md:p-6 flex flex-col space-y-5 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <LandlordCardIcon />
              <div className="space-y-0.5">
                <span className="bg-[#F59E0B] rounded-[4px] text-white text-[10px] px-2 py-1 font-nunito block w-fit ml-auto">
                  Most Popular
                </span>
                <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] px-4 py-0.5 text-[#999999] text-xs font-nunito font-normal capitalize ">
                  for rental income
                </div>
              </div>
            </div>

            <div className="max-w-[328px] space-y-3 ">
              <h3 className="text-white font-nunito text-md md:text-lg font-medium uppercase">
                Package B: Terrace / Duplex
              </h3>

              <div className="max-w-[161px] ">
                <h4 className="font-bold font-nunito text-[#F59E0B] text-[28px]">
                  ₦50M-₦60M
                </h4>
                <p className="font-nunito font-normal text-[13px] text-[#94A3B8]">
                  Per unit investment
                </p>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow relative z-10">
              {[
                "Premium, family-friendly neighborhoods",
                "Spacious 3-4 bedroom layouts",
                "Attached BQ (Boys Quarters) options",
                "Modern finishing and smart home ready",
                "Private parking and dedicated spaces",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <YellowCheckmark />
                  <span className="text-D6D6D6 font-nunito font-normal text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border border-dark p-4 rounded-[8px]">
              <span className="font-nunito font-normal text-D6D6D6 text-[11px] ">
                Best For
              </span>
              <p className="text-[#F59E0B] text-xs font-nunito font-semibold uppercase">
                Families, comfort-focused buyers, long-term residents.
              </p>
            </div>

            <Link
              href="/contact-us"
              className="bg-red border border-red w-full rounded-[4px] h-11 flex items-center justify-center text-white text-sm font-nunito font-normal"
            >
              Reserve a Slot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
