import { prisma } from "../config/prisma";

export const getAllAnimals = async (filters?: {
  species?: string;
  status?: string;
  shelterId?: bigint;
}) => {
  return await prisma.animal.findMany({
    where: {
      ...(filters?.species && { species: filters.species }),
      ...(filters?.status && { status: filters.status as any }),
      ...(filters?.shelterId && { shelterId: filters.shelterId }),
    },
    include: {
      images: { where: { isMain: true } },
      shelter: { select: { name: true, city: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getAnimalById = async (id: bigint) => {
  return await prisma.animal.findUnique({
    where: { id },
    include: { images: true, shelter: true },
  });
};

export const createAnimal = async (data: any) => {
  return await prisma.animal.create({ data });
};

export const updateAnimal = async (id: bigint, data: any) => {
  return await prisma.animal.update({ where: { id }, data });
};

export const deleteAnimal = async (id: bigint) => {
  return await prisma.animal.delete({ where: { id } });
};