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
      name: "Mr and Mrs Adekola",
      text: "Crystal Genius International Limited exceeded my expectations. They turned my dream home into a reality with precision and professionalism. The entire attention to detail was outstanding.",
    },
    {
      name: "David Ola Daniel",
      text: "Working with Crystal Genius was a game-changer. Their commitment to sustainable practices and innovative solutions ensured that our commercial project was completed on time and within budget. Highly recommend!",
    },
    {
      name: "Grace T",
      text: "Their expertise in both design and construction is unmatched. From groundbreaking to completion, they were with us every step of the way, delivering excellent results.",
    },
    {
      name: "Mr and Mrs Adekola",
      text: "The team at Crystal Genius built our office with such care and efficiency. They listened to our needs and created a space that perfectly fits our brand and operational requirements.",
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
                <Image
                  src={"/ic_round-star.svg"}
                  width={20}
                  height={20}
                  alt="star rating"
                  className=""
                />
                <Image
                  src={"/ic_round-star.svg"}
                  width={20}
                  height={20}
                  alt="star rating"
                  className=""
                />
                <Image
                  src={"/ic_round-star.svg"}
                  width={20}
                  height={20}
                  alt="star rating"
                  className=""
                />
                <Image
                  src={"/ic_round-star.svg"}
                  width={20}
                  height={20}
                  alt="star rating"
                  className=""
                />
                <Image
                  src={"/ic_round-star.svg"}
                  width={20}
                  height={20}
                  alt="star rating"
                  className=""
                />
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
