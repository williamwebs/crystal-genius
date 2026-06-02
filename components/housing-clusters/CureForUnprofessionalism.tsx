"use client";

export default function CureForUnprofessionalism() {
  const guarantees = [
    {
      icon: "/images/multi-site-icon.svg",
      title: "Multi-Site Supervision System",
      description:
        "Dedicated site managers + central command oversight on every project ensuring quality and speed.",
    },
    {
      icon: "/images/15-years-background-icon.svg",
      title: "15+ Years Experience",
      description:
        "A proven track record in real estate development across Nigeria's most competitive markets.",
    },
    {
      icon: "/images/envisioned-icon.svg",
      title: "120+ Envisioned Units",
      description:
        "We don't just sell plans, we deliver homes. Over 120 families envisioned to enjoy this developments.",
    },
    {
      icon: "/images/end-to-end-icon.svg",
      title: "End-to-End Legal Docs",
      description:
        "In-house legal team handles all documentation from Deed of Assignment to final title transfer.",
    },
    {
      icon: "/images/transparet-icon.svg",
      title: "Transparent Reporting",
      description:
        "Monthly investor updates with photos, videos, and financial breakdowns of construction progress.",
    },
    {
      icon: "/images/strict-quality-icon.svg",
      title: "Strict Quality Control",
      description:
        "Only certified materials and vetted contractors are used. No cutting corners on structural integrity.",
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
        <div className="text-left md:text-center mx-auto mb-10">
          <span className="text-D6D6D6 font-bold text-sm uppercase block mb-2">
            Why Crystal Genius?
          </span>
          <h2 className="text-4xl md:text-5xl text-white font-impact font-normal leading-tight">
            The Cure for Common Unprofessionalism.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="flex items-start gap-3">
              <img src={guarantee.icon} alt={guarantee.title} />
              <div className="space-y-1">
                <h3 className="text-base font-nunito font-bold text-white uppercase">
                  {guarantee.title}
                </h3>
                <p className="text-[#999999] text-[13px] font-nunito font-normal ">{guarantee.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
