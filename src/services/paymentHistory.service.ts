import { prisma } from "../config/prisma";

export const getPaymentsBySponsorshipId = async (sponsorshipId: bigint) => {
  return await prisma.paymentHistory.findMany({
    where: { sponsorshipId },
    orderBy: { paidAt: "desc" },
  });
};

export const createPayment = async (data: {
  sponsorshipId: bigint;
  amount: number;
  paymentMethod?: string;
  paymentReference?: string;
}) => {
  return await prisma.paymentHistory.create({ data });
};

export const getPaymentById = async (id: bigint) => {
  return await prisma.paymentHistory.findUnique({ where: { id } });
};