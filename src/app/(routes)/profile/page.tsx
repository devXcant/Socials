import { auth } from "@/auth";
import PostGrid from "@/components/PostsGrid";
import { prisma } from "@/db";
import { Check, ChevronLeft, Cog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await prisma.profile.findFirstOrThrow({
    where: { email: session?.user?.email as string },
  });
  return (
    <main>
      <section className="flex justify-between items-center">
        <button>
          <ChevronLeft />
        </button>
        <div className="font-bold flex items-center gap-2">
          {profile.username}
          <div className="size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white">
            <Check size={16} />
          </div>
        </div>
        <Link href={`/settings`}>
          <Cog />
        </Link>
      </section>
      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2  rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
          <div className="size-44 p-2 bg-white rounded-full">
            <div className="size-40 aspect-square overflow-hidden rounded-full">
            <Image
  src={profile.avatar || ""}
  alt="Profile Picture"
  width={160} // Adjust size as needed
  height={160}
  className="w-full h-full object-cover rounded-full"
/>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center mt-4">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500 my-1">{profile.subtitle}</p>
        <p className="">{profile.bio}</p>
      </section>
      <section className="mt-4">
        <div className="flex justify-center gap-4 font-bold">
          <Link href="/">Posts</Link>
          <Link className="text-gray-500" href="/highlights">
            Highlights
          </Link>
        </div>
      </section>
      <section className="mt-4">
        <PostGrid />
      </section>
    </main>
  );
}

// checkpointVideo = 47:30
// TODO CHECK VIDEO
