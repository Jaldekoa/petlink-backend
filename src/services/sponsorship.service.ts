import { prisma } from '@/config/prisma'
import { CreateSponsorshipDTO, UpdateSponsorshipDTO } from '@/dtos'
import { SponsorshipResponse, sponsorshipSelect } from '@/models/sponsorshipModel'
import { PaginatedResponse, PaginationParams } from '@/types'
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
    return await prisma.sponsorship.create({
        data: {
            userId,
            animalId: data.animalId,
            monthlyAmount: data.monthlyAmount,
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