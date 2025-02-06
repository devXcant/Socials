import Comment from "@/components/Comment";
import CommentsForm from "@/components/SessionCommentForm";
import { prisma } from "@/db";
import Image from "next/image";
import { Suspense } from "react";
import { uniq } from "lodash";

export default async function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findFirstOrThrow({
    where: { id: params.id }, //grt params from backend and set it to params router structure
  });
  const authorProfile = await prisma.profile.findFirstOrThrow({
    where: { email: post.author },
  });

  const comments = await prisma.comment.findMany({
    where: { postId : post.id },
  });
  const commentsAuthors = await prisma.profile.findMany({
    where: {
      email: { in: uniq(comments.map((c) => c.author)) },
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
            {comments.map((comment) => (
              <div key={comment.id}>
                <Comment
                  text={comment.text}
                  authorProfile={commentsAuthors.find(
                    (a) => a.email === comment.author
                  )}
                />
              </div>
            ))}
          </div>
          <div className="pt-8 border-t mt-8 border-t-gray-300">
            <Suspense fallback={<div>Loading comments...</div>}>
              <CommentsForm postId={post.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
