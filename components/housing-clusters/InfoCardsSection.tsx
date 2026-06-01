"use client";

export default function InfoCardsSection() {
  return (
    <section className="bg-[#D99A29] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          <div className="bg-[#00233D] rounded-[8px] p-8 flex flex-col gap-4 shadow-xl">
             <h4 className="text-white font-nunito uppercase tracking-widest text-xs font-bold opacity-80">
                What Is a Cluster?
             </h4>
             <h3 className="text-yellow font-impact text-3xl">
                4 to 6 People
             </h3>
             <p className="text-gray-300 font-nunito text-sm leading-relaxed mt-2">
                Verified members pool capital. We build and hand over the keys. You share the cost, not the space.
             </p>
          </div>

          <div className="bg-[#00233D] rounded-[8px] p-8 flex flex-col gap-4 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
             <h4 className="text-white font-nunito uppercase tracking-widest text-xs font-bold opacity-80 relative z-10">
                Co-Ownership, Secured
             </h4>
             <h3 className="text-yellow font-impact text-3xl relative z-10">
                ₦10M - ₦50M
             </h3>
             <p className="text-gray-300 font-nunito text-sm leading-relaxed mt-2 relative z-10">
                Typical contribution range depending on the project scope and location. Your funds are escrowed and secured.
             </p>
          </div>

          <div className="bg-[#00233D] rounded-[8px] p-8 flex flex-col gap-4 shadow-xl">
             <h4 className="text-white font-nunito uppercase tracking-widest text-xs font-bold opacity-80">
                A Proven Model
             </h4>
             <h3 className="text-yellow font-impact text-3xl">
                Zero Markups
             </h3>
             <p className="text-gray-300 font-nunito text-sm leading-relaxed mt-2">
                By removing the developer markup, you secure premium property at actual construction cost.
             </p>
          </div>

        </div>
      </div>
    </section>
  );
}
