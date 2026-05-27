import { Prisma } from '@prisma/client'

export const sponsorshipSelect = {
    id: true,
    monthlyAmount: true,
    status: true,
    startDate: true,
    endDate: true,
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
            email: true,
        }
    }
} satisfies Prisma.SponsorshipSelect

export type SponsorshipResponse = Prisma.SponsorshipGetPayload<{ select: typeof sponsorshipSelect }>