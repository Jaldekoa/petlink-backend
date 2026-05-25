import { Request, Response } from "express";
import * as sheltersService from "../services/shelters.service";

// 1. GET /api/shelters → listar todas las shelters
export const getAll = async (req: Request, res: Response) => {
  try {
    const shelters = await sheltersService.getAllShelters();
    res.json(shelters);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las protectoras" });
  }
};

// 2. GET /api/shelters/:id → obtener una shelter por ID
export const getById = async (req: Request, res: Response) => {
  try {
    const id = BigInt(req.params.id as string);
    const shelter = await sheltersService.getShelterById(id);

    if (!shelter) {
      return res.status(404).json({ error: "Protectora no encontrada" });
    }

    res.json(shelter);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la protectora" });
  }
};

// 3. POST /api/shelters → crear una shelter nueva
export const create = async (req: Request, res: Response) => {
  try {
    const newShelter = await sheltersService.createShelter(req.body);
    res.status(201).json(newShelter);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la protectora" });
  }
};

// 4. PATCH /api/shelters/:id → actualizar una shelter
export const update = async (req: Request, res: Response) => {
  try {
    const id = BigInt(req.params.id as string);
    const updated = await sheltersService.updateShelter(id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la protectora" });
  }
};

// 5. DELETE /api/shelters/:id → borrar una shelter
export const remove = async (req: Request, res: Response) => {
  try {
    const id = BigInt(req.params.id as string);
    await sheltersService.deleteShelter(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al borrar la protectora" });
  }
};