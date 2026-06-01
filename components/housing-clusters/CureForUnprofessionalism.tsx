"use client";

export default function CureForUnprofessionalism() {
  const guarantees = [
    {
      title: "Verified Member Vetting",
      description: "Every member undergoes strict KYC and financial verification to ensure funding commitments are met without default.",
    },
    {
      title: "Strict Legal Protection",
      description: "Robust legal frameworks, escrow accounts, and binding agreements protect your investment and ownership rights.",
    },
    {
      title: "Full Transparency",
      description: "Access real-time project updates, financial reports, and construction milestones through our investor portal.",
    },
    {
      title: "Zero Hidden Costs",
      description: "What you see is what you pay. We eliminate developer margins and provide a clear, itemized bill of quantities.",
    },
    {
      title: "Managed by Experts",
      description: "From land acquisition to final finishing, our seasoned engineers and project managers handle everything.",
    },
    {
      title: "Guaranteed Completion",
      description: "With our structured funding and professional oversight, we guarantee project completion within the agreed timeline.",
    },
  ];

  return (
    <section className="bg-[#00233D] py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-yellow font-bold text-sm uppercase tracking-widest block mb-4">
            Our Guarantee
          </span>
          <h2 className="text-3xl md:text-5xl text-white font-impact font-normal leading-tight">
            The Cure for Common Unprofessionalism.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {guarantees.map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-colors flex flex-col gap-4">
               <div className="w-10 h-10 bg-yellow/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#FFD554" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.5 12L10.5 15L16.5 9" stroke="#FFD554" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
               <div>
                 <h4 className="font-impact text-white text-xl mb-2">{item.title}</h4>
                 <p className="font-nunito text-gray-400 text-sm leading-relaxed">
                   {item.description}
                 </p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
