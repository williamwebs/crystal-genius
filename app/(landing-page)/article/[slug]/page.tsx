import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "@/sanity/client";

// Update the query to fetch both blogs and articles that match the slug
const POST_QUERY = `*[_type in ["blog", "article"] && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

const SingleArticlePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  let post: SanityDocument | null = null;
  let error = null;

  try {
    post = await client.fetch<SanityDocument>(
      POST_QUERY,
      { slug },
      options
    );
  } catch (err) {
    console.error("Error fetching individual post:", err);
    error = "Failed to load the article. Please try again later.";
  }

  if (error) {
    return (
      <main className="bg-[#F3F6F8] py-20 min-h-[50vh] flex items-center justify-center">
        <div className="container mx-auto text-center px-4">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/article" className="text-blue-600 hover:underline">
            ← Back to Articles
          </Link>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="bg-[#F3F6F8] py-20 min-h-[50vh] flex items-center justify-center">
        <div className="container mx-auto text-center px-4">
          <p className="text-[#2B2B2B] text-xl mb-4">Article not found.</p>
          <Link href="/article" className="text-blue-600 hover:underline font-nunito">
            ← Back to Articles
          </Link>
        </div>
      </main>
    );
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.url()
    : null;

  return (
    <main className="bg-[#F3F6F8] py-10 md:py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="mb-8">
          <Link href="/article" className="text-[#2B2B2B] text-sm hover:underline font-nunito inline-flex items-center gap-2">
            <span>←</span> Back to Articles
          </Link>
        </div>
        
        <header className="flex flex-col gap-[10px]">
          <h2 className="text-3xl md:text-[40px] text-[#2B2B2B] font-nunito font-bold leading-tight">
            {post.title}
          </h2>
          <span className="font-normal font-nunito text-[#666666] text-sm">
            {new Date(post.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </header>

        {/* article / blog body */}
        <div className="max-w-[1000px] mx-auto py-8 md:py-[50px] flex flex-col gap-[30px] md:gap-[50px]">
          {/* image */}
          {postImageUrl && (
            <div className="h-[300px] md:h-[500px] relative overflow-hidden rounded-[4px] bg-gray-200">
              <Image
                src={postImageUrl}
                alt={post.title}
                fill
                quality={100}
                className="object-cover"
              />
            </div>
          )}
          {/* content */}
          <div className="prose prose-lg max-w-none font-nunito prose-headings:text-[#2B2B2B] prose-p:text-[#2B2B2B] prose-strong:text-[#2B2B2B] prose-li:text-[#2B2B2B] prose-a:text-blue-600 text-[#2B2B2B]">
            {Array.isArray(post.body) ? (
              <PortableText value={post.body} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleArticlePage;
