import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { urlFor } from "@/sanity/lib/image";
import { getSingleBlog } from "@/sanity/queries";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const SingleBlogPage = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);
  console.log("bbbbbbbbbb",blog)

  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="md:col-span-3">
          {blog?.mainImage && (
            <Image
              src={urlFor(blog?.mainImage).url()}
              alt={blog.title || "Blog Image"}
              width={800}
              height={800}
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          )}
        </div>
        <div>BlogLeft</div>
      </Container>
    </div>
  );
};

export default SingleBlogPage;
