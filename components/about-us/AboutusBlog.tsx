"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { type SanityDocument } from "next-sanity";
import ActivityCard from "../card/Activities";
import { client } from "@/sanity/client";

export type AboutusBlogItem = SanityDocument & {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt?: string;
  image?: SanityImageSource;
  excerpt?: string;
};

type AboutusBlogProps = {
  blogs: AboutusBlogItem[];
  error?: string | null;
};

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const AboutusBlog = ({ blogs, error }: AboutusBlogProps) => {
  return (
    <section className="container mx-auto py-10 px-4 md:px-0 mt-10">
      <div className="text-left md:text-center">
        <span>Activities</span>

        <h2 className="text-4xl md:text-5xl text-dark font-impact font-normal my-3">
          Our Activities
        </h2>
        <p className="text-grey max-w-3xl mx-auto">
          At the heart of our organization, our activities are driven by a
          commitment to creating meaningful impact and fostering positive
          change. We engage in a wide range of initiatives that span across
          various sectors, from community development and educational outreach
          to research, innovation, and capacity building.
        </p>
      </div>

      {/* activity carousel */}
      {error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-grey mt-10">No activities posted yet.</p>
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2.3 },
          }}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          speed={5000}
          loop={blogs.length > 1}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          allowTouchMove={true}
          className="mt-10"
        >
          {blogs.map((activity) => (
            <SwiperSlide
              key={activity._id}
              className="bg-white rounded-lg shadow p-6"
            >
              <ActivityCard
                image={
                  activity.image
                    ? urlFor(activity.image)?.url() ||
                      "/images/placeholder.png"
                    : "/images/placeholder.png"
                }
                title={activity.title}
                description={activity.excerpt || "Read more..."}
                slug={activity.slug.current}
                date={activity.publishedAt}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default AboutusBlog;
