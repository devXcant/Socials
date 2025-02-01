/* eslint-disable @next/next/no-img-element */
"use client";
import { Post } from "@prisma/client";
import Link from "next/link";
import Masonry from "react-masonry-css";


export default function PostsGrid({posts}: {posts: Post[]}) {
  return (
    <div className="max-w-4xl mx-auto">
      <Masonry
        breakpointCols={{ default: 4, 860: 3, 500: 2 }}
        className="flex -ml-4 "
        columnClassName="pl-4 "
      >
        {posts.map((post, i) => (
          <Link href={`/posts/${post.id}`} className="mb-4 " key={i}>
            <img src={post.image} alt="" />
          </Link>
        ))}
      </Masonry>
    </div>
  );
}
