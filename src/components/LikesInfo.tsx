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
  sessionLike: Like | null; // ✅ Allow `null` values
}) {
  const router = useRouter();
  const [likedByMe, setLikedByMe] = useState(!!sessionLike);

  return (
    <div className="flex items-center gap-2">
      <form
        action={async (data: FormData) => {
          if (likedByMe) {
            await removeLikeFromPost(data);
            setLikedByMe(false);
          } else {
            await likePost(data);
            setLikedByMe(true);
          }
          router.refresh();
        }}
        className="text-gray items-center gap-2"
      >
        <input type="hidden" value={post.id} name="postId" />
        <button type="submit">
          <HeartIcon className={likedByMe ? "text-red-500 fill-red-500" : ""} />{" "}
          {post.likesCount} {post.likesCount === 1 ? "person likes" : "people like"} this
        </button>
      </form>
    </div>
  );
}
