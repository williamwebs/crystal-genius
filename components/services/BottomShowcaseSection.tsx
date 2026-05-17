import Image from "next/image";

interface BottomShowcaseSectionProps {
  heading: string;
  descriptions: string[];
  image: string;
  imageAlt?: string;
  reverse?: boolean;
}

const BottomShowcaseSection = ({
  heading,
  descriptions,
  image,
  imageAlt = "showcase image",
  reverse = false,
}: BottomShowcaseSectionProps) => {
  return (
    <section
      className={`grid grid-cols-1 gap-10 mt-[100px] mb-[20px] ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text Content */}
      <div className="flex flex-col gap-6">
        <h2 className="font-impact font-normal text-[36px] md:text-[48px] text-[#333333] md:pr-[100px] ">
          {heading}
        </h2>

        <div className="flex flex-col gap-5">
          {descriptions.map((description, index) => (
            <p key={index} className="font-nunito font-medium text-[#777777] text-sm ">
              {description}
            </p>
          ))}
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-[4px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          quality={100}
          className="object-cover cursor-not-allowed pointer-events-none select-none"
        />
      </div>
    </section>
  );
};

export default BottomShowcaseSection;
