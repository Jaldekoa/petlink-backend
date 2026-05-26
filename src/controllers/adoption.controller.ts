import { Request, Response } from 'express'
import { adoption_status } from '@prisma/client'
import { AdoptionFilters, adoptionService } from '@/services'

const getAdoptions = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: AdoptionFilters = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            status: req.query.status as adoption_status | undefined,
            userId: req.query.userId as string | undefined,
            animalId: req.query.animalId ? BigInt(req.query.animalId as string) : undefined,
        }
        const result = await adoptionService.getAdoptions(filters)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las adopciones' })
    }
}

const getAdoptionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const adoption = await adoptionService.getAdoptionById(BigInt(req.params.id as string))
        if (!adoption) {
            res.status(404).json({ error: 'Adopción no encontrada' })
            return
        }
        res.json(adoption)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la adopción' })
    }
}

const getMyAdoptions = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: AdoptionFilters = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            status: req.query.status as adoption_status | undefined,
        }
        const result = await adoptionService.getMyAdoptions(req.user!.userId, filters)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tus adopciones' })
    }
}

const createAdoption = async (req: Request, res: Response): Promise<void> => {
    try {
        const adoption = await adoptionService.createAdoption(req.user!.userId, {
            animalId: BigInt(req.body.animalId),
            message: req.body.message,
        })
        res.status(201).json(adoption)
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Ya tienes una solicitud de adopción para este animal' })
            return
        }
        res.status(500).json({ error: 'Error al crear la adopción' })
    }
}

const updateAdoption = async (req: Request, res: Response): Promise<void> => {
    try {
        const adoption = await adoptionService.updateAdoption(BigInt(req.params.id as string), req.body)
        res.json(adoption)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Adopción no encontrada' })
            return
        }
        res.status(500).json({ error: 'Error al actualizar la adopción' })
    }
}

const deleteAdoption = async (req: Request, res: Response): Promise<void> => {
    try {
        await adoptionService.deleteAdoption(BigInt(req.params.id as string))
        res.status(204).send()
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Adopción no encontrada' })
            return
        }
        res.status(500).json({ error: 'Error al eliminar la adopción' })
    }
}

export const adoptionController = {
    getAdoptions,
    getAdoptionById,
    getMyAdoptions,
    createAdoption,
    updateAdoption,
    deleteAdoption
}