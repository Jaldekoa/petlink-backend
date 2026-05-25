import { PaginationParams } from "@/types"


export const getPaginationParams = (query: PaginationParams) => {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const skip = (page - 1) * limit
    return { page, limit, skip }
}

export const getSearchFilter = (search: string | undefined, fields: string[]) => {
    if (!search) return {}
    return {
        OR: fields.map(field => ({
            [field]: { contains: search, mode: 'insensitive' as const }
        }))
    }
}