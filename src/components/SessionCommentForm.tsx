import { auth } from "@/auth";
import { prisma } from "@/db";
import CommentForm from "./CommentForm";


export default async function SessionCommentForm() {
  const session = await auth();
  const profile = await prisma.profile.findFirstOrThrow({
    where: { email: session?.user?.email as string },
  });
  return (
     <CommentForm avatar={profile.avatar || '' } />
  );
}
