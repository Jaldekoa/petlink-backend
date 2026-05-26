export interface CreateNotificationDTO {
    userId: string
    title: string
    body?: string
}

export interface UpdateNotificationDTO {
    isRead?: boolean
}