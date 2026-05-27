import { prisma } from '@/config/prisma'
import { CreateSponsorshipDTO, UpdateSponsorshipDTO } from '@/dtos'
import { SponsorshipResponse, sponsorshipSelect } from '@/models/sponsorship.model'
import { PaginatedResponse, PaginationParams } from '@/types'
import { AppError } from '@/utils'
import { getPaginationParams } from '@/utils/pagination'
import { sponsorship_status } from '@prisma/client'

export interface SponsorshipFilters extends PaginationParams {
    status?: sponsorship_status
    userId?: string
    animalId?: bigint
}

const getSponsorships = async (filters: SponsorshipFilters = {}): Promise<PaginatedResponse<SponsorshipResponse>> => {
    const { page, limit, skip } = getPaginationParams(filters)

    const where = {
        ...(filters.status && { status: filters.status }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.animalId && { animalId: filters.animalId }),
    }

    const [data, total] = await Promise.all([
        prisma.sponsorship.findMany({
            where,
            select: sponsorshipSelect,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.sponsorship.count({ where })
    ])

    return {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    }
}

const getSponsorshipById = async (id: bigint): Promise<SponsorshipResponse | null> => {
    return await prisma.sponsorship.findUnique({
        where: { id },
        select: sponsorshipSelect
    })
}

const getMySponsorships = async (userId: string, filters: SponsorshipFilters = {}): Promise<PaginatedResponse<SponsorshipResponse>> => {
    const { page, limit, skip } = getPaginationParams(filters)

    const where = {
        userId,
        ...(filters.status && { status: filters.status }),
        ...(filters.animalId && { animalId: filters.animalId }),
    }

    const [data, total] = await Promise.all([
        prisma.sponsorship.findMany({
            where,
            select: sponsorshipSelect,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.sponsorship.count({ where })
    ])

    return {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    }
}

const createSponsorship = async (userId: string, data: CreateSponsorshipDTO): Promise<SponsorshipResponse> => {
    const existing = await prisma.sponsorship.findFirst({
        where: {
            userId,
            animalId: data.animalId,
            status: { not: sponsorship_status.cancelado },
        },
    })

    if (existing) {
        throw new AppError('Ya tienes una solicitud de apadrinamiento para este animal', 409)
    }

    return await prisma.sponsorship.create({
        data: {
            userId,
            animalId: data.animalId,
            monthlyAmount: data.monthlyAmount ?? null,
            status: data.monthlyAmount ? sponsorship_status.activo : sponsorship_status.pendiente,
        },
        select: sponsorshipSelect
    })
}

const updateSponsorship = async (id: bigint, data: UpdateSponsorshipDTO): Promise<SponsorshipResponse> => {
    return await prisma.sponsorship.update({
        where: { id },
        data,
        select: sponsorshipSelect
    })
}

const cancelSponsorship = async (id: bigint): Promise<SponsorshipResponse> => {
    return await prisma.sponsorship.update({
        where: { id },
        data: {
            status: sponsorship_status.cancelado,
            endDate: new Date(),
        },
        select: sponsorshipSelect
    })
}

const deleteSponsorship = async (id: bigint): Promise<void> => {
    await prisma.sponsorship.delete({ where: { id } })
}

export const sponsorshipService = {
    getSponsorships,
    getSponsorshipById,
    getMySponsorships,
    createSponsorship,
    updateSponsorship,
    cancelSponsorship,
    deleteSponsorship
}
