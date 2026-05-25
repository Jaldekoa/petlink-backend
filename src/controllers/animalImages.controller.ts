import { Request, Response } from "express";
import * as animalImagesService from "../services/animalImages.service";

export const getByAnimal = async (req: Request, res: Response) => {
  try {
    const images = await animalImagesService.getImagesByAnimal(BigInt(req.params.animalId as string));
    res.json(images);
  } catch {
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const image = await animalImagesService.addImage({
      ...req.body,
      animalId: BigInt(req.params.animalId as string),
    });
    res.status(201).json(image);
  } catch {
    res.status(500).json({ error: "Error al añadir imagen" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await animalImagesService.deleteImage(BigInt(req.params.id as string));
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Error al borrar imagen" });
  }
};

export const setMain = async (req: Request, res: Response) => {
  try {
    const image = await animalImagesService.setMainImage(
      BigInt(req.params.id as string),
      BigInt(req.params.animalId as string)
    );
    res.json(image);
  } catch {
    res.status(500).json({ error: "Error al establecer imagen principal" });
  }
};