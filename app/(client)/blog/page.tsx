import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import { GET_ALL_BLOG } from "@/sanity/queries/query";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { Any } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function BlogPage() {
  const blogs = await getAllBlogs(6);
  return (
    <div>
      <Container>
        <Title>Blog page</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-10">
          {blogs?.map((blog: Any) => (
            <div key={blog?._id} className="rounded-md overflow-hidden group">
              {blog?.mainImage && (
                <Link href={`/blog/${blog?._id}`} className="overflow-hidden">
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt="blogImage"
                    width={500}
                    height={500}
                    className="w-full max-h-80 object-cover group-hover:scale-110 hoverEffect"
                  />
                </Link>
              )}

              <div className="bg-gray-100 p-5">
                <div className="text-xs flex items-center gap-5">
                  <div className="flex items-center relative group cursor-pointer">
                    {blog?.blogcategories?.map((item: Any, index: Any) => (
                      <p
                        key={index}
                        className="font-semibold text-shop_dark_green tracking-wider"
                      >
                        {item?.title}
                      </p>
                    ))}
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
                  </div>

                  <div className="flex items-center relative group cursor-pointer hover:text-shop_dark_green hoverEffect">
                    <p className="flex items-center gap-1">
                      <Calendar size={15} />{" "}
                      {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    </p>
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
                  </div>
                </div>

                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="text-base font-bold tracking-wide mt-5 line-clamp-2 block hover:text-shop_dark_green hoverEffect"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default BlogPage;
