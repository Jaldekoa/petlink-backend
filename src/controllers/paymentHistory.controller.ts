import { Request, Response } from "express";
import * as paymentHistoryService from "../services/paymentHistory.service";

export const getBySponsorship = async (req: Request, res: Response) => {
  try {
    const payments = await paymentHistoryService.getPaymentsBySponsorshipId(
      BigInt(req.params.sponsorshipId as string)
    );
    res.json(payments);
  } catch {
    res.status(500).json({ error: "Error al obtener pagos" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const payment = await paymentHistoryService.createPayment({
      ...req.body,
      sponsorshipId: BigInt(req.params.sponsorshipId as string),
    });
    res.status(201).json(payment);
  } catch {
    res.status(500).json({ error: "Error al registrar pago" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const payment = await paymentHistoryService.getPaymentById(BigInt(req.params.id as string));
    if (!payment) return res.status(404).json({ error: "Pago no encontrado" });
    res.json(payment);
  } catch {
    res.status(500).json({ error: "Error al obtener el pago" });
  }
};