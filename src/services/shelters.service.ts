import { prisma } from "../config/prisma";

export const getAllShelters = async () => {
  return await prisma.shelter.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getShelterById = async (id: bigint) => {
  return await prisma.shelter.findUnique({
    where: { id },
    include: { animals: { where: { status: "available" }, take: 10 } },
  });
};

export const createShelter = async (data: any) => {
  return await prisma.shelter.create({ data });
};

export const updateShelter = async (id: bigint, data: any) => {
  return await prisma.shelter.update({ where: { id }, data });
};

export const deleteShelter = async (id: bigint) => {
  return await prisma.shelter.delete({ where: { id } });
};