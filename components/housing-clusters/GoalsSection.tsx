"use client";

export default function GoalsSection() {
  return (
    <section className="bg-[#D99A29] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-dark font-bold text-sm uppercase tracking-widest block mb-4 opacity-80">
            Choose Your Path
          </span>
          <h2 className="text-3xl md:text-5xl text-dark font-impact font-normal leading-tight mb-6">
            Engineered for your specific goals.
          </h2>
          <p className="text-dark font-nunito text-base leading-relaxed max-w-2xl mx-auto opacity-90">
            Whether you want to own your forever home or earn high-yield returns, we have a cluster structure designed to match your financial objectives.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-5xl mx-auto">
          
          {/* Landlord Card */}
          <div className="w-full lg:w-1/2 bg-[#00233D] rounded-xl p-8 md:p-10 flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#FFD554" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="#FFD554" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <div>
                  <h4 className="text-white font-nunito uppercase tracking-widest text-xs font-bold opacity-80">
                     For Homeowners
                  </h4>
                  <h3 className="text-yellow font-impact text-3xl mt-1">
                     The Landlord Cluster
                  </h3>
               </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow relative z-10">
              {[
                "Targeted at individuals who want to live in their apartment or rent it out long-term.",
                "Customizable interior finishing based on your preferences.",
                "You receive direct legal title to your specific unit.",
                "Property management services available upon completion."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                   <div className="w-5 h-5 mt-0.5 shrink-0 bg-yellow/20 rounded-full flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#FFD554" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                   </div>
                   <span className="text-gray-300 font-nunito text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <a href="#contact-us" className="bg-red hover:bg-red/90 transition-colors w-full rounded-[4px] h-12 flex items-center justify-center text-white font-nunito font-bold shadow-lg relative z-10">
              Join Landlord Cluster
            </a>
          </div>

          {/* Developer Card */}
          <div className="w-full lg:w-1/2 bg-[#00233D] rounded-xl p-8 md:p-10 flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
            <div className="flex items-center gap-4 mb-8 relative z-10">
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V22" stroke="#FFD554" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#FFD554" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <div>
                  <h4 className="text-white font-nunito uppercase tracking-widest text-xs font-bold opacity-80">
                     For Investors
                  </h4>
                  <h3 className="text-yellow font-impact text-3xl mt-1">
                     The Developer Cluster
                  </h3>
               </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow relative z-10">
              {[
                "Targeted at investors looking to build and sell for maximum profit.",
                "Standardised, high-demand finishing to ensure quick market off-take.",
                "You share in the profit of the entire building's sale.",
                "We handle the marketing and sales process upon completion."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                   <div className="w-5 h-5 mt-0.5 shrink-0 bg-yellow/20 rounded-full flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#FFD554" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                   </div>
                   <span className="text-gray-300 font-nunito text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <a href="#contact-us" className="bg-red hover:bg-red/90 transition-colors w-full rounded-[4px] h-12 flex items-center justify-center text-white font-nunito font-bold shadow-lg relative z-10">
              Join Developer Cluster
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
