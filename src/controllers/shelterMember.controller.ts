import { ShelterMemberFilters, shelterMemberService } from '@/services'
import { Request, Response } from 'express'

const getShelterMembers = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: ShelterMemberFilters = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            search: req.query.search as string | undefined,
            shelterId: req.query.shelterId ? BigInt(req.query.shelterId as string) : undefined,
            userId: req.query.userId as string | undefined,
            role: req.query.role as string | undefined,
        }
        const result = await shelterMemberService.getShelterMembers(filters)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los miembros' })
    }
}

const getShelterMemberById = async (req: Request, res: Response): Promise<void> => {
    try {
        const member = await shelterMemberService.getShelterMemberById(BigInt(req.params.id as string))
        if (!member) {
            res.status(404).json({ error: 'Miembro no encontrado' })
            return
        }
        res.json(member)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el miembro' })
    }
}

const getMembersByShelter = async (req: Request, res: Response): Promise<void> => {
    try {
        const members = await shelterMemberService.getMembersByShelter(BigInt(req.params.shelterId as string))
        res.json(members)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los miembros del shelter' })
    }
}

const getSheltersByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const shelters = await shelterMemberService.getSheltersByUser(req.params.userId as string)
        res.json(shelters)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los shelters del usuario' })
    }
}

const createShelterMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const member = await shelterMemberService.createShelterMember({
            ...req.body,
            shelterId: BigInt(req.body.shelterId),
        })
        res.status(201).json(member)
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'El usuario ya es miembro de este shelter' })
            return
        }
        res.status(500).json({ error: 'Error al crear el miembro' })
    }
}

const updateShelterMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const member = await shelterMemberService.updateShelterMember(BigInt(req.params.id as string), req.body)
        res.json(member)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Miembro no encontrado' })
            return
        }
        res.status(500).json({ error: 'Error al actualizar el miembro' })
    }
}

const deleteShelterMember = async (req: Request, res: Response): Promise<void> => {
    try {
        await shelterMemberService.deleteShelterMember(BigInt(req.params.id as string))
        res.status(204).send()
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Miembro no encontrado' })
            return
        }
        res.status(500).json({ error: 'Error al eliminar el miembro' })
    }
}

export const shelterMemberController = {
    getShelterMembers,
    getShelterMemberById,
    getMembersByShelter,
    getSheltersByUser,
    createShelterMember,
    updateShelterMember,
    deleteShelterMember
}