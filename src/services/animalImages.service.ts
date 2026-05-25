import { prisma } from "../config/prisma";

export const getImagesByAnimal = async (animalId: bigint) => {
  return await prisma.animalImage.findMany({ where: { animalId } });
};

export const addImage = async (data: {
  animalId: bigint;
  imageUrl: string;
  isMain?: boolean;
}) => {
  // Si la nueva es main, quita el flag a las demás del mismo animal
  if (data.isMain) {
    await prisma.animalImage.updateMany({
      where: { animalId: data.animalId },
      data: { isMain: false },
    });
  }
  return await prisma.animalImage.create({ data });
};

export const deleteImage = async (id: bigint) => {
  return await prisma.animalImage.delete({ where: { id } });
};

export const setMainImage = async (id: bigint, animalId: bigint) => {
  await prisma.animalImage.updateMany({
    where: { animalId },
    data: { isMain: false },
  });
  return await prisma.animalImage.update({
    where: { id },
    data: { isMain: true },
  });
};