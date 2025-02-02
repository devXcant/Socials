import { auth } from "@/auth";
import { prisma } from "@/db";
import { Button, TextArea } from "@radix-ui/themes";
import Avatar from "./Avatar";

export default async function CommentsForm() {
  const session = await auth();
  const profile = await prisma.profile.findFirstOrThrow({
    where: { email: session?.user?.email as string },
  });
  return (
    <form action={asycn data => {}}>
      <div className="flex gap-2">
        <div>
          <Avatar src={profile.avatar || ""} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <TextArea placeholder="knerfn erfer kger" />
          <div>
            <Button>Post Comments</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
