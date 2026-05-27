import { Request, Response } from "express";
import * as likesService from "../services/likes.service";

export const toggle = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const animalId = BigInt(req.params.animalId as string);
    const result = await likesService.toggleLike(userId, animalId);
    res.json(result);
  } catch {
    res.status(500).json({ error: "Error al procesar like" });
  }
};

export const getMyLikes = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const likes = await likesService.getLikesByUser(userId);
    res.json(likes);
  } catch {
    res.status(500).json({ error: "Error al obtener likes" });
  }
};

export const getCount = async (req: Request, res: Response) => {
  try {
    const count = await likesService.getLikeCount(BigInt(req.params.animalId as string));
    res.json({ count });
  } catch {
    res.status(500).json({ error: "Error al contar likes" });
  }
};
