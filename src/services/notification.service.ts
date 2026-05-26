import { prisma } from '@/config/prisma'
import { CreateNotificationDTO } from '@/dtos'
import { NotificationResponse, notificationSelect } from '@/models'
import { PaginatedResponse, PaginationParams } from '@/types'
import { getPaginationParams } from '@/utils'

export interface NotificationFilters extends PaginationParams {
    isRead?: boolean
}

const getMyNotifications = async (userId: string, filters: NotificationFilters = {}): Promise<PaginatedResponse<NotificationResponse>> => {
    const { page, limit, skip } = getPaginationParams(filters)

    const where = {
        userId,
        ...(filters.isRead !== undefined && { isRead: filters.isRead }),
    }

    const [data, total] = await Promise.all([
        prisma.notification.findMany({
            where,
            select: notificationSelect,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.notification.count({ where })
    ])

    return {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    }
}

// Marcar una notificación como leída
const markAsRead = async (id: bigint, userId: string): Promise<NotificationResponse> => {
    return await prisma.notification.update({
        where: { id, userId },
        data: { isRead: true },
        select: notificationSelect
    })
}

// Marcar todas como leídas
const markAllAsRead = async (userId: string): Promise<void> => {
    await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true }
    })
}

// Solo para uso interno desde otros servicios
const createNotification = async (data: CreateNotificationDTO): Promise<NotificationResponse> => {
    return await prisma.notification.create({
        data,
        select: notificationSelect
    })
}

const deleteNotification = async (id: bigint, userId: string): Promise<void> => {
    await prisma.notification.delete({
        where: { id, userId }
    })
}

const deleteAllNotifications = async (userId: string): Promise<void> => {
    await prisma.notification.deleteMany({
        where: { userId }
    })
}

export const notificationService = {
    getMyNotifications,
    markAsRead,
    markAllAsRead,
    createNotification,
    deleteNotification,
    deleteAllNotifications
}