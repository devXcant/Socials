import Avatar from "@/components/Avatar";
import CommentsForm from "@/components/CommentsForm";
import { prisma } from "@/db";
import Image from "next/image";
import { Suspense } from "react";

export default async function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findFirstOrThrow({ where: { id: params.id } });
  const authorProfile = await prisma.profile.findFirstOrThrow({
    where: { email: post.author },
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
          <div className="flex items-center space-x-4 rounded-lg p-4 bg-gray-50">
            <div>
              <Avatar src={authorProfile.avatar || ""} />
            </div>

            <div>
              <h3 className="text-2xl font-bold">{authorProfile.name}</h3>
              <p className="text-gray-500">@{authorProfile.username}</p>
            </div>
          </div>
          <div>
            <p className="text-lg">{post.description}</p>
          </div>
          <div className="pt-8 border-t mt-8 border-t-gray-300">
            <Suspense>
              <CommentsForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
