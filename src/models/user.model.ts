import { Prisma } from '@prisma/client'

export const userSelect = {
    id: true,
    username: true,
    email: true,
    fullName: true,
    role: true,
    description: true,
    avatarUrl: true,
    phone: true,
    isVerified: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.UserSelect

export type UserResponse = Prisma.UserGetPayload<{ select: typeof userSelect }>
