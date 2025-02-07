import Comment from "@/components/Comment";
import CommentsForm from "@/components/SessionCommentForm";
import { prisma } from "@/db";
import Image from "next/image";
import { Suspense } from "react";
import { uniq } from "lodash";
import { BookmarkIcon } from "lucide-react";
import LikesInfo from "@/components/LikesInfo";
import { getSessionEmailOrThrow } from "@/actions";

export default async function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params?.id) {
    throw new Error("Post ID is missing");
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const authorProfile = await prisma.profile.findUnique({
    where: { email: post.author },
  });

  if (!authorProfile) {
    throw new Error("Author profile not found");
  }

  const comments = await prisma.comment.findMany({
    where: { postId: post.id },
  });

  const commentsAuthors = await prisma.profile.findMany({
    where: {
      email: { in: uniq(comments.map((c) => c.author)) },
    },
  });

  const sessionEmail = await getSessionEmailOrThrow();

  const myLike = await prisma.like.findFirst({
    where: {
      author: sessionEmail,
      postId: post.id,
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Image
            src={post.image}
            alt={post.description}
            width={1200}
            height={1500}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Comment text={post.description} authorProfile={authorProfile} />
          <div className="pt-4 flex flex-col gap-4">
            {comments.map((comment) => {
              const authorProfile = commentsAuthors.find(
                (a) => a.email === comment.author
              );
              return (
                <div key={comment.id}>
                  <Comment text={comment.text} authorProfile={authorProfile} />
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 justify-between py-4 mb-4 border-t border-t-gray-300">
            <LikesInfo post={post} sessionLike={myLike || null} />
            <div className="flex items-center">
              <button>
                <BookmarkIcon />
              </button>
            </div>
          </div>
          <div className="pt-8 border-t border-t-gray-300">
            <Suspense fallback={<div>Loading comments...</div>}>
              <CommentsForm postId={post.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
