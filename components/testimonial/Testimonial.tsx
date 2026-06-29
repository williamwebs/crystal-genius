"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Mr. Omoraka Oluwafemi",
      text: "I wanted a home that could see the city. Nestled on a subtle hilltop in Abeokuta the chosen Crystal Genius delivered just that unobstructed views of the Governor’s residence,",
    },
    {
      name: "Mr. David Ikhuoshio",
      text: "With a plot of land, I Awarded the project to Crystal genius to pull-off an 8-unit block of 2-bedroom flats for rent and the result was Exceptional",
    },
    {
      name: "Mr. Ifeayi Percy",
      text: "Crystal Gen. presented a 3D Drawing of a 7 units semi-detached duplexes with a BQ which i just loved at first glance and I wanted the outcome result to look exactly as what was in the drawing, which I got",
    },
    {
      name: "Mr and Mrs Adekola",
      text: "At the area were my property is located had a serious drainage issue which needed a smart re-channeling to protect any structure on it from flooding & crystal Genius was my first of choice",
    },
  ];

  return (
    <section className="w-full my-16">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 3 }, // Show 3 slides on desktop
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000} // Smooth continuous scrolling speed
        loop={true}
        modules={[Autoplay, Pagination]}
        pagination={true}
        allowTouchMove={false}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="relative my-3 px-4 md:px-0">
            <div className="p-5 bg-white rounded-lg shadow-md font-medium font-nunito text-center text-sm">
              <p className="text-[#555555] italic my-5">{testimonial.text}</p>

              {/* ratings */}
              <div className="flex items-center justify-center gap-1 -mt-2 mb-1">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Image
                    key={index}
                    src={"/ic_round-star.svg"}
                    width={20}
                    height={20}
                    alt="star rating"
                    className=""
                  />
                ))}
               
              </div>
              <h6 className="text-dark">
                {testimonial.name}{" "}
                <span className="font-normal italic text-paragraphGrey text-xs">
                  Client
                </span>
              </h6>

              <Image
                src={"/icon-park-outline_quote.svg"}
                width={40}
                height={40}
                alt="quote icon"
                className="absolute -top-5 -right-3"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Link
        href={"#contact"}
        className="bg-red rounded h-10 w-28 flex items-center justify-center mt-7 shadow text-lightGrey text-sm font-nunito font-normal mx-auto"
      >
        Get started
      </Link>
    </section>
  );
};

export default Testimonial;
