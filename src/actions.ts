"use server";

import { auth } from "./auth";
import { prisma } from "./db";

export async function getSessionEmailOrThrow() {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    throw "not logged in";
  }
  return userEmail;
}

export async function updateProfile(data: FormData) {
  const userEmail = await getSessionEmailOrThrow();
  const newUserInfo = {
    username: data.get("username") as string,
    name: data.get("username") as string,
    subtitle: data.get("subtitle") as string,
    bio: data.get("bio") as string,
    avatar: data.get("avatar") as string,
  };
  await prisma.profile.upsert({
    where: {
      email: userEmail,
    },
    update: newUserInfo,
    create: {
      email: userEmail,
      ...newUserInfo,
    },
  });
}

export async function postEntry(data: FormData) {
  const sessionEmail = await getSessionEmailOrThrow();
  const postDoc = await prisma.post.create({
    data: {
      author: sessionEmail,
      image: data.get("image") as string,
      description: data.get("description") as string,
    },
  });

  return postDoc.id;
}

export async function postComment(data: FormData) {
  const authorEmail = await getSessionEmailOrThrow();
  await prisma.comment.create({
    data: {
      author: authorEmail,
      postId: data.get("postId") as string,
      text: data.get("text") as string,
    },
  });
}

async function updatePostLikesCount(postId: string) {
  await prisma.post.update({
    where: { id: postId },
    data: {
      likesCount: await prisma.like.count({ where: { postId } }),
    },
  });
}

export async function likePost(data: FormData) {
  const postId = data.get("postId");

  const postIdStr = String(postId);

  await prisma.like.create({
    data: {
      author: await getSessionEmailOrThrow(),
      postId: postIdStr,
    },
  });

  await updatePostLikesCount(postIdStr);
}

export async function removeLikeFromPost(data: FormData) {
  const postId = data.get("postId") as string;
  await prisma.like.deleteMany({
    where: {
      postId,
      author: await getSessionEmailOrThrow(),
    },
  });

  await updatePostLikesCount(postId);
}
