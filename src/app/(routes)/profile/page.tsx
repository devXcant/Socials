import PostGrid from "@/components/PostsGrid";
import { Check, ChevronLeft, Cog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main>
      <section className="flex justify-between items-center">
        <button>
          <ChevronLeft />
        </button>
        <div className="font-bold flex items-center gap-2">
          My name is ayor
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
                src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3V5fGVufDB8fDB8fHww"
                alt="any"
                layout="responsive"
                width={48}
                height={48}
                quality={60}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-center mt-4">
        <h1 className="text-xl font-bold">Ayo</h1>
        <p className="text-gray-500 my-1">Business Account</p>
        <p className="">
          Enterpreneur, Husband, Father <br />
          contact: Ayor@gmail.com
        </p>
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
