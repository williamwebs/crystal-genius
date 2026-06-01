"use client";

import { investmentOptions } from "@/constants/constants";
import { ClusterBuyerIcon, SoloBuyerIcon, TrendingDownIcon, TrendingUpIcon } from "@/constants/images";
import Image from "next/image";

export default function StruggleSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-red font-bold uppercase block mb-4">
            The Co-Ownership Concept
          </span>
          <h2 className="text-3xl md:text-5xl text-dark font-impact font-normal leading-tight mb-6 max-w-[645px] mx-auto px-2.5 ">
            ₦200M is a struggle for one. For a group, it builds blocks of flats.
          </h2>
          <p className="text-grey font-nunito text-[15px] leading-relaxed max-w-2xl mx-auto">
            We break down the barriers to premium real estate by pooling
            resources. Stop waiting years to save for a single plot. Start
            building immediately with a verified cluster.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-5 max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <p className="text-grey font-nunito font-medium text-base leading-relaxed">
              At Crystal Genius International, we’ve created a flexible payment
              plan designed for Nigerians at home and abroad. Whether you are
              looking to acquire property in Lagos or across Nigeria, our swift
              payment structures provide a seamless path to becoming a landlord.
            </p>
            <div className="flex flex-col md:flex-row gap-2">
              {investmentOptions.map((option) => (
                <div
                  key={option.title}
                  className={`relative rounded-[12px] w-full md:w-1/2 px-4 py-5 transition-all ${
                    option.highlighted
                      ? "border-red border-t-2 bg-[#0F172A] text-white"
                      : "border border-black/25 bg-white text-dark"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex gap-2">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                          option.highlighted
                            ? "border-yellow-500"
                            : "border-yellow-500"
                        }`}
                      >
                        {option.highlighted ? (
                          <ClusterBuyerIcon />
                        ) : (
                          <SoloBuyerIcon />
                        )}
                        {/* <Users className="h-6 w-6 text-yellow-500" /> */}
                      </div>

                      <div>
                        <h3
                          className={`text-[20px] font-nunito font-medim ${
                            option.highlighted ? "text-white" : "text-dark"
                          }`}
                        >
                          {option.title}
                        </h3>

                        {option.subtitle && (
                          <p
                            className={`text-sm font-nunito ${
                              option.highlighted
                                ? "text-D6D6D6"
                                : ""
                            }`}
                          >
                            {option.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <h4 className="mb-3 text-[30px] font-normal text-yellow">
                    {option.price}
                  </h4>

                  <ul className="space-y-[16px]">
                    {option.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        {option.highlighted ? (
                          <TrendingUpIcon />
                        ) : (
                          <TrendingDownIcon />
                        )}

                        <span
                          className={`text-[15px] font-nunito font-medium ${
                            option.highlighted ? "text-white" : "text-[#999999]"
                          }`}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[350px] md:h-[450px] rounded-[10px] overflow-hidden">
              <Image
                src="/images/housing-2.svg"
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
