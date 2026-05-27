import { Prisma } from '@prisma/client'

export const notificationSelect = {
    id: true,
    title: true,
    body: true,
    isRead: true,
    createdAt: true,
} satisfies Prisma.NotificationSelect

export type NotificationResponse = Prisma.NotificationGetPayload<{ select: typeof notificationSelect }>