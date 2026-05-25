import { prisma } from "../config/prisma";

export const toggleLike = async (userId: string, animalId: bigint) => {
  const existing = await prisma.like.findUnique({
    where: { userId_animalId: { userId, animalId } },
  });

  if (existing) {
    await prisma.like.delete({
      where: { userId_animalId: { userId, animalId } },
    });
    return { liked: false };
  }

  await prisma.like.create({ data: { userId, animalId } });
  return { liked: true };
};

export const getLikesByUser = async (userId: string) => {
  return await prisma.like.findMany({
    where: { userId },
    include: {
      animal: {
        include: { images: { where: { isMain: true } } },
      },
    },
  });
};

export const getLikeCount = async (animalId: bigint) => {
  return await prisma.like.count({ where: { animalId } });
};