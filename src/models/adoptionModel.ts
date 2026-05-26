import { Prisma } from '@prisma/client'

export const adoptionSelect = {
    id: true,
    status: true,
    message: true,
    statusMessage: true,
    createdAt: true,
    updatedAt: true,
    animal: {
        select: {
            id: true,
            name: true,
            species: true,
            breed: true,
            status: true,
        }
    },
    user: {
        select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
            phone: true,
            email: true,
        }
    }
} satisfies Prisma.AdoptionSelect

export type AdoptionResponse = Prisma.AdoptionGetPayload<{ select: typeof adoptionSelect }>