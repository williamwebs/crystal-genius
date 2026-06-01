"use client";

import Image from "next/image";

export default function StruggleSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-red font-bold text-sm uppercase tracking-widest block mb-4">
            The Housing Problem & Solution
          </span>
          <h2 className="text-3xl md:text-5xl text-dark font-impact font-normal leading-tight mb-6 uppercase">
            #200M is a struggle for one.<br />
            For a group, it builds blocks of flats.
          </h2>
          <p className="text-grey font-nunito text-base leading-relaxed max-w-2xl mx-auto">
            Owning a home shouldn't be a solo battle against inflation and exorbitant costs. Crystal Genius verified Housing Clusters brings ambitious individuals together to fund, build and co-own properties in prime locations.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
             <p className="text-grey font-nunito text-base leading-relaxed mb-4">
              Traditional real estate often forces you to buy at heavily inflated prices or take on risky solo building projects. We offer a smarter, structured alternative.
            </p>
            <ul className="space-y-4">
              {[
                "Access premium locations usually out of reach for a single buyer.",
                "Zero developer markups – you pay the actual cost of construction.",
                "Strict legal framework ensuring your investment is 100% protected.",
                "End-to-end management by seasoned engineering professionals."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                   <div className="w-6 h-6 mt-0.5 shrink-0 bg-red/10 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                   </div>
                   <span className="text-dark font-nunito font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[350px] md:h-[450px] rounded-[8px] overflow-hidden shadow-2xl">
              <Image
                src="/images/building-2.png"
                alt="Housing Cluster Building"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
