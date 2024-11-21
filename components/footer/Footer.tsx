import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="overflow-hidden font-nunito">
      <div className="bg-yellow pt-10 h-full px-3 md:px-0">
        <div className="container mx-auto">
          <aside className="flex flex-col-reverse md:flex-row items-start justify-between gap-10 md:gap-20">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <Link href={"/"}>
                <Image
                  src={"/images/crystal-logo.png"}
                  width={120}
                  height={93}
                  alt="crystal genius logo"
                  className="select-none pointer-events-none mx-auto md:mx-0"
                  style={{ userSelect: "none" }}
                />
              </Link>
              <p className="text-dark max-w-xl my-2 md:pr-10">
                Crystal Genius International Limited leads the way in
                transformative building solutions, setting benchmarks in
                quality, innovation, and reliability across all construction
                projects.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src={"/images/footer-text.png"}
                width={550}
                height={100}
                alt="crystal genius logo"
                className="select-none pointer-events-none"
                style={{ userSelect: "none" }}
              />
            </div>
          </aside>
          <aside className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 pb-10 mt-8 md:mt-0">
            <div className="w-full md:w-1/3 flex flex-col text-center gap-5">
              <div>
                <h6 className="uppercase text-sm text-accentBlue font-bold">
                  call
                </h6>
                <a
                  href="tel:+2348069452707"
                  className="text-base text-dark italic font-bold"
                >
                  +234 806 945 2707
                </a>
                <span className="text-sm text-grey italic font-medium block">
                  Get instant response 24/7
                </span>
              </div>
              <div>
                <h6 className="uppercase text-sm text-accentBlue font-bold">
                  VISIT Office
                </h6>
                <p className="text-base text-dark italic font-bold">
                  Suit 6, First Floor, left wing, NUJ LIGHTHOUSE, 3/5 Adeyemo
                  Alakija,street, Victoria Island, Lagos
                </p>
                <span className="text-sm text-grey italic font-medium block">
                  8AM-5PM (MON-FRI)
                </span>
              </div>
              <div>
                <h6 className="uppercase text-sm text-accentBlue font-bold">
                  Email
                </h6>
                <a
                  href="mail-to:vincentsatowaku@gmail.com"
                  className="text-base text-dark italic font-bold"
                >
                  vincentsatowaku@gmail.com
                </a>
                <span className="text-sm text-grey italic font-medium block">
                  Get response within 24 hours
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <h6 className="capitalize text-sm text-accentBlue font-bold">
                Follow us
              </h6>
              {/* socials */}
            </div>
            <div className="w-full md:w-1/3 -mr-10 -mb-10 md:-mb-16">
              <Image
                src={"/images/footer-house.png"}
                width={556}
                height={390}
                alt=""
                className="select-none pointer-events-none"
                style={{ userSelect: "none" }}
              />
            </div>
          </aside>
        </div>
      </div>
      <div className="bg-dark py-3 md:py-2 text-center">
        <p className="text-xs md:text-sm text-white">
          All rights reserved. Copyright 2024 | Crystal Genius International
          Ltd.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
