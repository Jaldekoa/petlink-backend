import { Prisma } from '@prisma/client'

export const shelterMemberSelect = {
    id: true,
    role: true,
    createdAt: true,
    shelter: {
        select: {
            id: true,
            name: true,
            logoUrl: true,
            city: true,
            country: true,
        }
    },
    user: {
        select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
        }
    }
} satisfies Prisma.ShelterMemberSelect

export type ShelterMemberResponse = Prisma.ShelterMemberGetPayload<{ select: typeof shelterMemberSelect }>