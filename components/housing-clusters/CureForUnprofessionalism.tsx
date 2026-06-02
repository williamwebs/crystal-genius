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
    <section className="bg-[#0A1628] py-24 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[900px] mx-auto px-4 relative z-10">
        <div className="text-center mx-auto mb-10">
          <span className="text-D6D6D6 font-bold text-sm uppercase block mb-2">
            Why Crystal Genius?
          </span>
          <h2 className="text-4xl md:text-5xl text-white font-impact font-normal leading-tight">
            The Cure for Common Unprofessionalism.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
        </div>
      </div>
    </section>
  );
}
