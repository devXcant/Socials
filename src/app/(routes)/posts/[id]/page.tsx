import { prisma } from "@/db";
import Image from "next/image";

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
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="size-16 aspect-square overflow-hidden rounded-full">
          <Image
            src={post.image}
            width={50}
            height={50}
            alt={post.description}
          />
        </div>
        <div className="flex">
          <Image
            src={authorProfile.avatar || ""}
                      alt={authorProfile.username + "avatar"}
                      width={50}
            height={50}
          />
        </div>
        <div>
          <h3>{authorProfile.name}</h3>
          <h3>{authorProfile.username}</h3>
        </div>
        <div>
          <p>{post.description}</p>
        </div>
      </div>
    </div>
  );
}
