"use client";

import { BulkConstruction, SharedCost, VerifiedPooling } from "@/constants/images";

export default function InfoCardsSection() {
  return (
    <section
      className="py-16 bg-[#F59E0B]"
      // style={{
      //   backgroundImage: `linear-gradient(to right, rgba(217,154,41, 0.7), rgba(217,154,41,0.7)), url(${"/images/housing-info-cards.svg"})`,
      // }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-[#0F172A] rounded-[4px] px-5 pt-5 pb-10 flex flex-col gap-2">
            <BulkConstruction />
            <h3 className="text-yellow font-impact font-medium uppercase text-[18px] ">
              Bulk Construction
            </h3>
            <p className="text-[#FCFAFA] font-nunito text-[15px]">
              Building 8 Units at once lowers the per-unit Cost of Materials and
              Labour by up to 30% compared to Building a Single House.
            </p>
          </div>

          <div className="bg-[#0F172A] rounded-[4px] px-5 pt-5 pb-10 flex flex-col gap-2">
            <SharedCost />
            <h3 className="text-yellow font-impact font-medium uppercase text-[18px] ">
              Shared Costs
            </h3>
            <p className="text-[#FCFAFA] font-nunito text-[15px]">
              Legal Fees, Site Security, Architectural Designs, and Project
              Management Costs are divided among the Cluster, Saving you
              Millions.
            </p>
          </div>

          <div className="bg-[#0F172A] rounded-[4px] px-5 pt-5 pb-10 flex flex-col gap-2">
            <VerifiedPooling />
            <h3 className="text-yellow font-impact font-medium uppercase text-[18px] ">
              Verified Pooling
            </h3>
            <p className="text-[#FCFAFA] font-nunito text-[15px]">
              All Contributions are tracked through Secure Escrow Accounts.
              Funds are only released as Construction Milestones are met.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
