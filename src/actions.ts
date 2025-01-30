"use server";

import { prisma } from "./db";

export async function updateProfile(data: FormData, userEmail: string) {
  const newUserfInfo = {
    username: data.get("username") as string,
    name: data.get("username") as string,
    subtitle: data.get("subtitle") as string,
    bio: data.get("bio") as string,
  };
  await prisma.profile.upsert({
    where: {
      email: userEmail,
    },
    update: newUserfInfo,
    create: {
      email: userEmail,
      ...newUserfInfo,
    },
  });
}
