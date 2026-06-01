"use client";

import Image from "next/image";

export default function EngineeredSteps() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-red font-bold text-sm uppercase tracking-widest block mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl text-dark font-impact font-normal leading-tight">
            Four Engineered steps from investor <br className="hidden md:block" />
            to Homeowner.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-[#FCFAFA] shadow-md border border-[#E5E5E5] flex items-center justify-center mb-6">
              <span className="font-impact text-dark text-2xl">1</span>
            </div>
            <h4 className="font-impact text-dark text-xl mb-3">Join a cluster</h4>
            <p className="text-grey font-nunito text-sm leading-relaxed">
              Join a verified group of 4-6 members seeking property in your target location and budget range.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-[#FCFAFA] shadow-md border border-[#E5E5E5] flex items-center justify-center mb-6">
              <span className="font-impact text-dark text-2xl">2</span>
            </div>
            <h4 className="font-impact text-dark text-xl mb-3">Pool funds securely</h4>
            <p className="text-grey font-nunito text-sm leading-relaxed">
              Contribute your agreed share into a transparent, legally protected escrow account managed by experts.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-[#FCFAFA] shadow-md border border-[#E5E5E5] flex items-center justify-center mb-6 relative">
              <span className="font-impact text-dark text-2xl">3</span>
              <div className="absolute -top-2 -right-2 bg-yellow text-dark text-[10px] font-bold px-2 py-0.5 rounded-sm">
                CG builds
              </div>
            </div>
            <h4 className="font-impact text-dark text-xl mb-3">Crystal Genius builds</h4>
            <p className="text-grey font-nunito text-sm leading-relaxed">
              We handle land acquisition, approvals, and construction with zero developer markup.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-[#FCFAFA] shadow-md border border-[#E5E5E5] flex items-center justify-center mb-6">
              <span className="font-impact text-dark text-2xl">4</span>
            </div>
            <h4 className="font-impact text-dark text-xl mb-3">Move in or earn returns</h4>
            <p className="text-grey font-nunito text-sm leading-relaxed">
              Receive the keys to your apartment or sell your share for profit in the open market.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
