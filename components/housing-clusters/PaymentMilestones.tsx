"use client";

import Image from "next/image";

export default function PaymentMilestones() {
  const milestones = [
    {
      percent: "40-50%",
      title: "Initial deposit",
      description: "To secure your slot in the cluster.",
    },
    {
      percent: "10%",
      title: "Foundation stage",
      description: "At site clearance and foundation laying.",
    },
    {
      percent: "10%",
      title: "Super structural change",
      description: "When building reaches Roofing level.",
    },
    {
      percent: "10%",
      title: "Finishing stage",
      description: "During finishing and Interior works.",
    },
    {
      percent: "10%",
      title: "Final allocation",
      description: "At handover & Title transfer.",
    },
  ];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-20 relative">
          <span className="text-[#BBBBBB] font-bold text-[15px] uppercase block mb-4">
            Transparent Payment Structure
          </span>
          <h2 className="text-4xl md:text-5xl text-dark font-impact font-normal leading-tight">
            Pay as we build. No hidden fees.
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-[45px] left-0 right-0 h-1 bg-[#E5E5E5] z-0" />

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4 relative z-10">
            {milestones.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center w-full md:w-1/5 relative"
              >
                {/* Vertical Line for Mobile */}
                {index !== milestones.length - 1 && (
                  <div className="hidden absolute top-12 bottom-[-40px] left-1/2 w-0.5 bg-[#E5E5E5] -translate-x-1/2 z-0" />
                )}

                <span className="font-impact text-[#F59E0B] text-3xl">
                  {item.percent}
                </span>

                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-2.5 h-2.5 rounded-full border border-[#F59E0B] bg-[#0F172A] " />
                </div>

                <h4 className="font-nunito text-grey font-semibold text-sm md:text-[15px] uppercase mt-1.5">
                  {item.title}
                </h4>
                <p className="font-nunito text-[#999999] text-sm md:text-[14px] max-w-[150px] mx-auto mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
