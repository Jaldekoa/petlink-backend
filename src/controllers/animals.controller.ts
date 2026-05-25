import { Request, Response } from "express";
import * as animalsService from "../services/animals.service";

export const getAll = async (req: Request, res: Response) => {
  try {
    const { species, status, shelterId } = req.query;
    const animals = await animalsService.getAllAnimals({
      species: species as string | undefined,
      status: status as string | undefined,
      shelterId: shelterId ? BigInt(shelterId as string) : undefined,
    });
    res.json(animals);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener animales" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const animal = await animalsService.getAnimalById(BigInt(req.params.id as string));
    if (!animal) return res.status(404).json({ error: "Animal no encontrado" });
    res.json(animal);
  } catch {
    res.status(500).json({ error: "Error al obtener el animal" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const animal = await animalsService.createAnimal(req.body);
    res.status(201).json(animal);
  } catch {
    res.status(500).json({ error: "Error al crear el animal" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const animal = await animalsService.updateAnimal(BigInt(req.params.id as string), req.body);
    res.json(animal);
  } catch {
    res.status(500).json({ error: "Error al actualizar el animal" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await animalsService.deleteAnimal(BigInt(req.params.id as string));
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Error al borrar el animal" });
  }
};