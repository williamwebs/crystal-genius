"use client";

import { FirstEngineeringProcess, FourthEngineeringProcess, SecondEngineeringProcess, ThirdEngineeringProcess } from "@/constants/images";
import Image from "next/image";

export default function EngineeredSteps() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[700px] mb-16 ">
          <span className="text-red font-bold text-sm uppercase mb-4">
            The Crystal Genius Process
          </span>
          <h2 className="text-4xl md:text-[46px] text-dark font-impact font-normal leading-tight">
            Four Engineered steps from investor{" "}
            <br className="hidden md:block" />
            to Homeowner.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="space-y-1">
            <FirstEngineeringProcess />
            <h4 className="font-nunito font-bold text-dark text-[18px] uppercase">
              Investor Pooling
            </h4>
            <p className="text-grey font-nunito font-normal text-sm ">
              6–10 verified investors join a cluster based on budget and
              location preferences.
            </p>
          </div>

          <div className="space-y-1">
            <SecondEngineeringProcess />
            <h4 className="font-nunito font-bold text-dark text-[18px] uppercase">
              Land Acquisition
            </h4>
            <p className="text-grey font-nunito font-normal text-sm ">
              Strategic Lagos locations with verified titles (C of O, Governor's
              Consent).
            </p>
          </div>

          <div className="space-y-1">
            <ThirdEngineeringProcess />
            <h4 className="font-nunito font-bold text-dark text-[18px] uppercase">
              Professional Development
            </h4>
            <p className="text-grey font-nunito font-normal text-sm ">
              Flats or Terraces built by Certified Contractors under Multi-site
              Supervision.
            </p>
          </div>

          <div className="space-y-1">
            <FourthEngineeringProcess />
            <h4 className="font-nunito font-bold text-dark text-[18px] uppercase">
              Allocation
            </h4>
            <p className="text-grey font-nunito font-normal text-sm ">
              Unit Handover with Legal Title transfer to each Individual
              Investor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
