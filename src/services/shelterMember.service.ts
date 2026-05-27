import { prisma } from '@/config/prisma'
import { CreateShelterMemberDTO, UpdateShelterMemberDTO } from '@/dtos/shelterMember.DTO'
import { ShelterMemberResponse, shelterMemberSelect } from '@/models/shelterMember.model'
import { PaginatedResponse, PaginationParams } from '@/types'
import { getPaginationParams, getSearchFilter } from '@/utils/pagination'

export interface ShelterMemberFilters extends PaginationParams {
    shelterId?: bigint
    userId?: string
    role?: string
}

const getShelterMembers = async (filters: ShelterMemberFilters = {}): Promise<PaginatedResponse<ShelterMemberResponse>> => {
    const { page, limit, skip } = getPaginationParams(filters)

    const where = {
        ...getSearchFilter(filters.search, ['role']),
        ...(filters.shelterId && { shelterId: filters.shelterId }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.role && { role: filters.role }),
    }

    const [data, total] = await Promise.all([
        prisma.shelterMember.findMany({
            where,
            select: shelterMemberSelect,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.shelterMember.count({ where })
    ])

    return {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    }
}

const getShelterMemberById = async (id: bigint): Promise<ShelterMemberResponse | null> => {
    return await prisma.shelterMember.findUnique({
        where: { id },
        select: shelterMemberSelect
    })
}

// Obtener todos los miembros de un shelter
const getMembersByShelter = async (shelterId: bigint): Promise<ShelterMemberResponse[]> => {
    return await prisma.shelterMember.findMany({
        where: { shelterId },
        select: shelterMemberSelect,
        orderBy: { createdAt: 'desc' }
    })
}

// Obtener todos los shelters de un usuario
const getSheltersByUser = async (userId: string): Promise<ShelterMemberResponse[]> => {
    return await prisma.shelterMember.findMany({
        where: { userId },
        select: shelterMemberSelect,
        orderBy: { createdAt: 'desc' }
    })
}

const createShelterMember = async (data: CreateShelterMemberDTO): Promise<ShelterMemberResponse> => {
    return await prisma.shelterMember.create({
        data,
        select: shelterMemberSelect
    })
}

const updateShelterMember = async (id: bigint, data: UpdateShelterMemberDTO): Promise<ShelterMemberResponse> => {
    return await prisma.shelterMember.update({
        where: { id },
        data,
        select: shelterMemberSelect
    })
}

const deleteShelterMember = async (id: bigint): Promise<void> => {
    await prisma.shelterMember.delete({ where: { id } })
}

export const shelterMemberService = {
    getShelterMembers,
    getShelterMemberById,
    getMembersByShelter,
    getSheltersByUser,
    createShelterMember,
    updateShelterMember,
    deleteShelterMember
}
