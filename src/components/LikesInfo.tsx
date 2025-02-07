"use client";
import { likePost, removeLikeFromPost } from "@/actions";
import { Like, Post } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LikesInfo({
  post,
  sessionLike,
}: {
  post: Post;
  sessionLike: Like;
}) {
  const router = useRouter();
  const [likedByMe, setLikedByMe] = useState(!!sessionLike);
  return (
    <div className="flex items-center gap-2">
      <form
        action={async (data: FormData) => {
          setLikedByMe((prev) => !prev);
                  if (likedByMe) {
              await removeLikeFromPost(data)
          } else {

            await likePost(data);
          }
          router.refresh();
        }}
        className="text-gray items-center gap-2"
      >
        <input
          type="hidden"
          className="flex items-center gap-2"
          value={post.id}
          name="postId"
        />
        <button type="submit">
          <HeartIcon className={likedByMe ? "text-red-500 fill-red-500" : ""} />{" "}
          {post.likesCount} People liked
        </button>
        {post.likesCount} people like this this
      </form>
    </div>
  );
}
