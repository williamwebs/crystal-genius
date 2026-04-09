import React from "react";
import DrawingsHero from "../../../components/hero/DrawingsHero";
import DrawingsCard from "../../../components/card/DrawingsCard";
import {
  InstantDeliveryIcon,
  PreviewIcon,
  SecurePaymentIcon,
} from "../../../constants/images";

const HOW_IT_WORKS = [
  {
    title: "Preview Design",
    description:
      "Browse our collection and view free preview images to understand the structural layout and specifications.",
    icons: <PreviewIcon />,
  },
  {
    title: "Secure Payment",
    description:
      "Pay securely using Paystack to unlock the full, high-resolution structural drawings and documentation.",
    icons: <SecurePaymentIcon />,
  },
  {
    title: "Instant Delivery",
    description:
      "Receive your complete design package via email immediately after payment confirmation.",
    icons: <InstantDeliveryIcon />,
  },
];

const DrawingsPage = () => {
  return (
    <main>
      <DrawingsHero />

      <div className="bg-white py-14">
        <div className="container mx-auto px-4 md:px-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <h3 className="font-nunito font-bold text-2xl text-[#111827]">
                Featured Structural Designs
              </h3>
              <p className="text-base text-[#999999] font-nunito font-medium max-w-[610px]">
                Browse our curated collection of certified structural drawings.
                Each project includes complete foundation plans, framing
                details, and material specifications.
              </p>
            </div>
            <div className="w-full md:w-1/2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-11">
            <DrawingsCard />
          </div>

          <div className="max-w-[1108px] w-full mx-auto py-40 text-center">
            <h3 className="font-nunito font-bold text-2xl text-[#111827]">
              How It Works
            </h3>
            <p className="text-base text-[#999999] font-nunito font-medium mt-4">
              Get your professional structural drawings in three simple steps.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {HOW_IT_WORKS.map((item, index) => (
                <div
                  key={index}
                  className="shadow h-[270px] py-7 px-5 flex flex-col gap-3 items-center rounded-[20px]"
                >
                  <div className="w-[80px] h-[80px] flex items-center justify-center rounded-3xl bg-dark border-b-4 border-red">
                    {item.icons}
                  </div>
                  <h4 className="font-nunito font-extrabold text-lg text-dark">
                    {item.title}
                  </h4>
                  <p className="font-nunito font-medium text-sm text-paragraphGrey">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DrawingsPage;
