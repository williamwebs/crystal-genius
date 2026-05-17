import ArticlePageHero from "../../../components/hero/ArticlePageHero";
import ActivityCard from "../../../components/card/Activities";
import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const BLOGS_QUERY = `*[
  _type == "blog"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, "excerpt": pt::text(body)}`;

const ARTICLES_QUERY = `*[
  _type == "article"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, "excerpt": pt::text(body)}`;

const options = { next: { revalidate: 30 } };

const ArticlePage = async () => {
  let blogs: SanityDocument[] = [];
  let articles: SanityDocument[] = [];
  let error = null;

  try {
    blogs = await client.fetch<SanityDocument[]>(BLOGS_QUERY, {}, options);
    articles = await client.fetch<SanityDocument[]>(ARTICLES_QUERY, {}, options);
  } catch (err) {
    console.error("Error fetching from Sanity:", err);
    error = "Failed to load content. Please try again later.";
  }

  const mainBlog = blogs.length > 0 ? blogs[0] : null;
  const sideBlogs = blogs.slice(1, 3);
  const otherBlogs = blogs.slice(3);

  return (
    <main>
      <ArticlePageHero />

      {error ? (
        <section className="container mx-auto px-4 py-20 text-center text-red-500">
          <p>{error}</p>
        </section>
      ) : (
        <>
          {/* blog */}
          <section className="container mx-auto px-4 py-20">
            <h2 className="text-3xl md:text-5xl text-dark text-left md:text-center font-impact font-normal">
              Latest Blogs
            </h2>
            <p className="text-grey font-nunito font-medium text-left md:text-center md:text-[17px] mt-5 max-w-[600px] mx-auto">
              Stay informed with our latest blogs on industry trends, cutting-edge
              technologies, and expert insights in the world of construction.
            </p>

            {blogs.length === 0 ? (
              <p className="text-center text-grey mt-10">No blogs found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-[20px] mt-10">
                {/* main blog */}
                {mainBlog && (
                  <Link href={`/article/${mainBlog.slug.current}`} className="col-span-1 md:col-span-3 shadow p-[20px] bg-white rounded-[10px] flex flex-col gap-[20px] hover:shadow-lg transition-shadow">
                    {/* image */}
                    <div className="h-[250px] md:h-[400px] rounded-[4px] relative overflow-hidden bg-gray-100">
                      <Image
                        src={mainBlog.image ? urlFor(mainBlog.image)?.url() || "/images/placeholder.png" : "/images/placeholder.png"}
                        alt={mainBlog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* content */}
                    <div className="flex flex-col gap-[7px]">
                      <span className="font-nunito font-medium text-[#999999] text-[15px]">
                        {new Date(mainBlog.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <h3 className="font-nunito font-normal text-[#555555] text-[24px] md:text-[30px] line-clamp-2 leading-tight">
                        {mainBlog.title}
                      </h3>
                      <p className="font-nunito font-medium text-[#999999] text-[15px] md:text-[17px] line-clamp-4">
                        {mainBlog.excerpt || "Read more about this topic..."}
                      </p>
                    </div>
                  </Link>
                )}

                {/* aside blog sections */}
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 gap-[20px] h-fit">
                  {sideBlogs.map((blog) => (
                    <Link href={`/article/${blog.slug.current}`} key={blog._id} className="shadow p-[20px] md:max-h-[300px] h-full bg-white rounded-[10px] flex flex-col md:flex-row items-start gap-[20px] hover:shadow-lg transition-shadow">
                      <div className="w-full md:w-[250px] h-[200px] md:h-full relative shrink-0 bg-gray-100 rounded-[4px] overflow-hidden">
                        <Image
                          src={blog.image ? urlFor(blog.image)?.url() || "/images/placeholder.png" : "/images/placeholder.png"}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* content */}
                      <div className="flex-1 flex-col space-y-2">
                        <span className="font-nunito font-medium text-[#999999] text-[15px]">
                          {new Date(blog.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <h3 className="font-nunito font-normal text-[#555555] text-[20px] md:text-[24px] line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>
                        <p className="font-nunito font-medium text-[#999999] text-[15px] md:text-[17px] line-clamp-3 md:line-clamp-5">
                          {blog.excerpt || "Read more about this topic..."}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* other blog posts */}
            {otherBlogs.length > 0 && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-[20px]">
                {otherBlogs.map((blog) => (
                  <div className="bg-white rounded-lg shadow p-3 md:p-6" key={blog._id}>
                    <ActivityCard
                      image={blog.image ? urlFor(blog.image)?.url() || "" : ""}
                      title={blog.title}
                      description={blog.excerpt || "Read more about this topic..."}
                      slug={blog.slug.current}
                      date={blog.publishedAt}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* articles */}
          <section className="w-full bg-cover bg-center pb-20 px-3 md:px-0">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-5xl text-dark text-left md:text-center font-impact font-normal">
                Latest Articles
              </h2>
              <p className="text-grey font-nunito font-medium text-left md:text-center text-[15px] md:text-[17px] mt-5 max-w-[600px] mx-auto">
                Stay informed with our latest articles on industry trends,
                cutting-edge technologies, and expert insights in the world of
                construction.
              </p>
              
              {articles.length === 0 ? (
                <p className="text-center text-grey mt-10">No articles found.</p>
              ) : (
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-[20px]">
                  {articles.map((article) => (
                    <div className="bg-white rounded-lg shadow p-3 md:p-6" key={article._id}>
                      <ActivityCard
                        image={article.image ? urlFor(article.image)?.url() || "" : ""}
                        title={article.title}
                        description={article.excerpt || "Read more about this topic..."}
                        slug={article.slug.current}
                        date={article.publishedAt}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default ArticlePage;
