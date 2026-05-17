"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants/variant";

interface Props {
  image: string;
  title: string;
  description: string;
  slug?: string;
  date?: string;
}

const ActivityCard = ({ image, title, description, slug, date }: Props) => {
  return (
    <div
    // variants={fadeIn("down", 0.2)}
    // initial="hidden"
    // whileInView={"show"}
    // viewport={{ once: false, amount: 0.5 }}
    >
      <Link href={slug ? `/article/${slug}` : "/article"} className="">
        <div className="relative w-full max-h-[150px] md:h-[200px] overflow-hidden rounded">
          <Image
            src={image || "/images/placeholder.png"}
            fill
            alt={title}
            className="select-none pointer-events-none object-cover object-center"
            style={{ userSelect: "none" }}
          />
        </div>

        <div className="text-left font-nunito mt-3 flex flex-col gap-1 md:gap-2">
          {date && (
            <span className="font-nunito font-medium text-[#999999] text-[15px] ">
              {new Date(date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
          <h3 className="font-nunito font-normal text-[#555555] text-[24px] line-clamp-1 leading-snug">
            {title}
          </h3>
          <p className="font-nunito font-medium text-[#999999] text-[17px] line-clamp-4 ">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ActivityCard;
