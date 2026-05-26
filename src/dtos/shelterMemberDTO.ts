export interface CreateShelterMemberDTO {
    shelterId: bigint
    userId: string
    role?: string
}

export interface UpdateShelterMemberDTO {
    role?: string
}