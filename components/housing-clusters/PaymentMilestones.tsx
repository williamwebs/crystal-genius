"use client";

import Image from "next/image";

export default function PaymentMilestones() {
  const milestones = [
    { percent: "40%", title: "Land Acquisition & Approvals" },
    { percent: "20%", title: "Foundation & Groundwork" },
    { percent: "15%", title: "Structural Framework" },
    { percent: "15%", title: "Finishing & Interiors" },
    { percent: "10%", title: "Handover & Keys" },
  ];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-20 relative">
          <div className="absolute -top-16 right-0 md:right-10 opacity-20 pointer-events-none">
             <Image src="/images/civil-engineering.svg" alt="construction" width={150} height={150} />
          </div>
          <span className="text-red font-bold text-sm uppercase tracking-widest block mb-4 relative z-10">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-5xl text-dark font-impact font-normal leading-tight relative z-10">
            Pay as we build. <br className="md:hidden" /> No hidden fees.
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-[45px] left-0 right-0 h-1 bg-[#E5E5E5] z-0" />

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4 relative z-10">
            {milestones.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center w-full md:w-1/5 relative">
                {/* Vertical Line for Mobile */}
                {index !== milestones.length - 1 && (
                  <div className="md:hidden absolute top-12 bottom-[-40px] left-1/2 w-0.5 bg-[#E5E5E5] -translate-x-1/2 z-0" />
                )}
                
                <div className="w-24 h-24 bg-white rounded-full border-[6px] border-[#FCFAFA] shadow-md flex items-center justify-center mb-6 relative z-10">
                   <span className="font-impact text-yellow text-3xl">{item.percent}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-2 md:hidden">
                    <div className="w-2 h-2 rounded-full bg-red" />
                </div>
                
                <h4 className="font-nunito text-dark font-bold text-sm md:text-base leading-snug px-2">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
