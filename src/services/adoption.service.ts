import { prisma } from '@/config/prisma'
import { CreateAdoptionDTO, UpdateAdoptionDTO } from '@/dtos'
import { AdoptionResponse, adoptionSelect } from '@/models/adoption.model'
import { PaginatedResponse, PaginationParams } from '@/types'
import { getPaginationParams } from '@/utils/pagination'
import { adoption_status } from '@prisma/client'

export interface AdoptionFilters extends PaginationParams {
    status?: adoption_status
    userId?: string
    animalId?: bigint
}

const getAdoptions = async (filters: AdoptionFilters = {}): Promise<PaginatedResponse<AdoptionResponse>> => {
    const { page, limit, skip } = getPaginationParams(filters)

    const where = {
        ...(filters.status && { status: filters.status }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.animalId && { animalId: filters.animalId }),
    }

    const [data, total] = await Promise.all([
        prisma.adoption.findMany({
            where,
            select: adoptionSelect,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.adoption.count({ where })
    ])

    return {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    }
}

const getAdoptionById = async (id: bigint): Promise<AdoptionResponse | null> => {
    return await prisma.adoption.findUnique({
        where: { id },
        select: adoptionSelect
    })
}

// Adopciones del usuario autenticado
const getMyAdoptions = async (userId: string, filters: AdoptionFilters = {}): Promise<PaginatedResponse<AdoptionResponse>> => {
    const { page, limit, skip } = getPaginationParams(filters)

    const where = {
        userId,
        ...(filters.status && { status: filters.status }),
    }

    const [data, total] = await Promise.all([
        prisma.adoption.findMany({
            where,
            select: adoptionSelect,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.adoption.count({ where })
    ])

    return {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    }
}

// El usuario crea la solicitud, el userId viene del token
const createAdoption = async (userId: string, data: CreateAdoptionDTO): Promise<AdoptionResponse> => {
    return await prisma.adoption.create({
        data: {
            userId,
            animalId: data.animalId,
            message: data.message,
        },
        select: adoptionSelect
    })
}

// Solo admin/worker puede cambiar el status
const updateAdoption = async (id: bigint, data: UpdateAdoptionDTO): Promise<AdoptionResponse> => {
    return await prisma.adoption.update({
        where: { id },
        data,
        select: adoptionSelect
    })
}

const deleteAdoption = async (id: bigint): Promise<void> => {
    await prisma.adoption.delete({ where: { id } })
}

export const adoptionService = {
    getAdoptions,
    getAdoptionById,
    getMyAdoptions,
    createAdoption,
    updateAdoption,
    deleteAdoption
}