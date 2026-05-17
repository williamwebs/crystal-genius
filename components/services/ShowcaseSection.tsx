import Image from "next/image";

interface ShowcaseSectionProps {
  mainHeading: string;
  mainDescription: string;
  columnHeading: string;
  columnDescriptions: string[];
  columnImage: string;
  imageAlt?: string;
  reverse?: boolean;
}

const ShowcaseSection = ({
  mainHeading,
  mainDescription,
  columnHeading,
  columnDescriptions,
  columnImage,
  imageAlt = "showcase image",
  reverse = false,
}: ShowcaseSectionProps) => {
  return (
    <section className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-16">
        {/* Top Content */}
        <div className="max-w-[750px] mx-auto text-left md:text-center flex flex-col gap-6">
          <h2 className="text-[40px] md:text-[48px] text-[#333333] font-normal font-impact">
            {mainHeading}
          </h2>

          <p className="text-sm text-[#777777] font-nunito font-medium">
            {mainDescription}
          </p>
        </div>

        {/* Bottom Grid */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Text */}
          <div className="flex flex-col gap-6">
            <h3 className="font-impact font-normal text-[#333333] text-[36px] md:text-[48px] ">
              {columnHeading}
            </h3>

            <div className="flex flex-col gap-5">
              {columnDescriptions.map((description, index) => (
                <p
                  key={index}
                  className="font-nunito font-medium text-sm text-[#777777] md:pr-10"
                >
                  {description}
                </p>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full md:w-[550px] h-[400px] overflow-hidden">
            <Image
              src={columnImage}
              alt={imageAlt}
              fill
              quality={100}
              className="object-cover cursor-not-allowed pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
