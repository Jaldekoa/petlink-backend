import { sponsorship_status } from '@prisma/client'

export interface CreateSponsorshipDTO {
    animalId: bigint
    monthlyAmount?: number | null
}

export interface UpdateSponsorshipDTO {
    status?: sponsorship_status
    monthlyAmount?: number | null
    endDate?: Date
}
