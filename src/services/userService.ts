import { prisma } from "@/config/prisma"
import { CreateUserDTO, UpdateUserDTO } from "@/dtos"
import { UserResponse, userSelect } from "@/models/userModel"
import { PaginatedResponse, PaginationParams } from "@/types"
import { getPaginationParams, getSearchFilter } from "@/utils/pagination"
import { user_role } from "@prisma/client"

export interface UserFilters extends PaginationParams {
    role?: user_role
    isVerified?: boolean
}

const getUsers = async (filters: UserFilters = {}): Promise<PaginatedResponse<UserResponse>> => {
    const { page, limit, skip } = getPaginationParams(filters)

    const where = {
        ...getSearchFilter(filters.search, ['username', 'email', 'fullName']),
        ...(filters.role && { role: filters.role }),
        ...(filters.isVerified !== undefined && { isVerified: filters.isVerified }),
    }

    const [data, total] = await Promise.all([
        prisma.user.findMany({
            where,
            select: userSelect,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.user.count({ where })
    ])

    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }
}

const getUserById = async (id: string): Promise<UserResponse | null> => {
    return await prisma.user.findUnique({
        where: { id },
        select: userSelect
    })
}

const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email }
    })
}

const createUser = async (data: CreateUserDTO): Promise<UserResponse> => {
    return await prisma.user.create({
        data,
        select: userSelect
    })
}

const updateUser = async (id: string, data: UpdateUserDTO): Promise<UserResponse> => {
    return await prisma.user.update({
        where: { id },
        data,
        select: userSelect
    })
}

const deleteUser = async (id: string): Promise<void> => {
    await prisma.user.delete({ where: { id } })
}

export const userService = { getUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser }