import { adoption_status } from '@prisma/client'

export interface CreateAdoptionDTO {
    animalId: bigint
    message?: string
}

export interface UpdateAdoptionDTO {
    status?: adoption_status
    statusMessage?: string
}