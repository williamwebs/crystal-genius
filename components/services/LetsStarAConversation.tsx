import { conversationStarters } from "@/constants/constants";
import React from "react";

const LetsStarAConversation = () => {
  return (
    <section className="bg-[#F3F6F8] py-[150px]">
      <div className="container mx-auto px-4 flex flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[40px] text-dark font-impact font-normal">
            Let's Start a Conversation
          </h2>
          <p className="text-[#777777] text-left md:text-center font-nunito font-medium max-w-2xl">
            We’d enjoy exploring your design questions or sharing examples of
            how our architectural solutions have helped other clients move from
            rough concepts to approved, GTM (Go-To-Market) products. Reach out
            to our design team to discuss your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {conversationStarters.map((starter) => (
            <div key={starter.title}>
              <h3 className="text-[24px] text-dark font-impact font-normal">
                {starter.title}
              </h3>
              <p className="text-[#777777] font-nunito font-medium">
                {starter.description}
              </p>
              <a
                href={starter.href}
                className="inline-block text-[#0077CC] hover:text-[#0077CC]/50 font-nunito font-medium underline transition-colors duration-300"
              >
                {starter.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LetsStarAConversation;
