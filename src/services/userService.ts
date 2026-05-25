import { prisma } from "@/config/prisma"
import { CreateUserDTO, UpdateUserDTO } from "@/dtos"
import { UserResponse, userSelect } from "@/models/userModel"


const getUsers = async (): Promise<UserResponse[]> => {
    return await prisma.user.findMany({ select: userSelect })
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