"use client"
import { Post } from "@prisma/client";
import { HeartIcon } from "lucide-react";

export default function LikesInfo({post}: {post: Post}) {
    return (
        <div className="flex items-center gap-2">
            <form action={async (data: FormData) => {

              }} className="text-gray">
                <HeartIcon className="fill-red-500" /> {post.likesCount} People
                liked this
              </form>
            </div>
    )
}
