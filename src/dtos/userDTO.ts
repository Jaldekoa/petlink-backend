export interface CreateUserDTO {
    username: string
    email: string
    password: string
    fullName?: string
    phone?: string
}

export interface UpdateUserDTO {
    username?: string
    email?: string
    fullName?: string
    description?: string
    avatarUrl?: string
    phone?: string
}