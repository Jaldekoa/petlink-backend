import { Request, Response } from 'express'
import { sponsorship_status } from '@prisma/client'
import { SponsorshipFilters, sponsorshipService } from '@/services'

const getSponsorships = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: SponsorshipFilters = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            status: req.query.status as sponsorship_status | undefined,
            userId: req.query.userId as string | undefined,
            animalId: req.query.animalId ? BigInt(req.query.animalId as string) : undefined,
        }
        const result = await sponsorshipService.getSponsorships(filters)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los apadrinamientos' })
    }
}

const getSponsorshipById = async (req: Request, res: Response): Promise<void> => {
    try {
        const sponsorship = await sponsorshipService.getSponsorshipById(BigInt(req.params.id as string))
        if (!sponsorship) {
            res.status(404).json({ error: 'Apadrinamiento no encontrado' })
            return
        }
        res.json(sponsorship)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el apadrinamiento' })
    }
}

const getMySponsorships = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: SponsorshipFilters = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            status: req.query.status as sponsorship_status | undefined,
            animalId: req.query.animalId ? BigInt(req.query.animalId as string) : undefined,
        }
        const result = await sponsorshipService.getMySponsorships(req.user!.userId, filters)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tus apadrinamientos' })
    }
}

const createSponsorship = async (req: Request, res: Response): Promise<void> => {
    try {
        const sponsorship = await sponsorshipService.createSponsorship(req.user!.userId, {
            animalId: BigInt(req.body.animalId),
            monthlyAmount: Number(req.body.monthlyAmount),
        })
        res.status(201).json(sponsorship)
    } catch (error: any) {
        res.status(500).json({ error: 'Error al crear el apadrinamiento' })
    }
}

const updateSponsorship = async (req: Request, res: Response): Promise<void> => {
    try {
        const sponsorship = await sponsorshipService.updateSponsorship(BigInt(req.params.id as string), req.body)
        res.json(sponsorship)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Apadrinamiento no encontrado' })
            return
        }
        res.status(500).json({ error: 'Error al actualizar el apadrinamiento' })
    }
}

const cancelSponsorship = async (req: Request, res: Response): Promise<void> => {
    try {
        const sponsorship = await sponsorshipService.cancelSponsorship(BigInt(req.params.id as string))
        res.json(sponsorship)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Apadrinamiento no encontrado' })
            return
        }
        res.status(500).json({ error: 'Error al cancelar el apadrinamiento' })
    }
}

const deleteSponsorship = async (req: Request, res: Response): Promise<void> => {
    try {
        await sponsorshipService.deleteSponsorship(BigInt(req.params.id as string))
        res.status(204).send()
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Apadrinamiento no encontrado' })
            return
        }
        res.status(500).json({ error: 'Error al eliminar el apadrinamiento' })
    }
}

export const sponsorshipController = {
    getSponsorships,
    getSponsorshipById,
    getMySponsorships,
    createSponsorship,
    updateSponsorship,
    cancelSponsorship,
    deleteSponsorship
}