/* eslint-disable @next/next/no-img-element */
"use client";
import Masonry from "react-masonry-css";

const images = [
  "https://picsum.photos/id/237/1024/768",
  "https://picsum.photos/id/238/768/1024",
  "https://picsum.photos/id/239/1024/768",
  "https://picsum.photos/id/240/768/1024",
  "https://picsum.photos/id/241/1024/768",
  "https://picsum.photos/id/242/768/1024",
  "https://picsum.photos/id/243/1024/768",
  "https://picsum.photos/id/244/768/1024",
  "https://picsum.photos/id/245/1024/768",
  "https://picsum.photos/id/246/768/1024",
  "https://picsum.photos/id/247/1024/768",
  "https://picsum.photos/id/248/768/1024",
  "https://picsum.photos/id/249/1024/768",
  "https://picsum.photos/id/250/768/1024",
];
export default function PostsGrid() {
  return (
    <div className="max-w-4xl mx-auto">
      <Masonry
        breakpointCols={{ default: 4, 860: 3, 500: 2 }}
        className="flex -ml-4 "
        columnClassName="pl-4 "
      >
        {images.map((src, i) => (
          <div className="mb-4 " key={i}>
            <img src={src} alt="" />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
