import { NotificationFilters, notificationService } from '@/services/notification.service'
import { Request, Response } from 'express'

const getMyNotifications = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: NotificationFilters = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            isRead: req.query.isRead === 'true' ? true : req.query.isRead === 'false' ? false : undefined,
        }
        const result = await notificationService.getMyNotifications(req.user!.userId, filters)
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notificaciones' })
    }
}

const markAsRead = async (req: Request, res: Response): Promise<void> => {
    try {
        const notification = await notificationService.markAsRead(BigInt(req.params.id as string), req.user!.userId)
        res.json(notification)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Notificación no encontrada' })
            return
        }
        res.status(500).json({ error: 'Error al marcar la notificación como leída' })
    }
}

const markAllAsRead = async (req: Request, res: Response): Promise<void> => {
    try {
        await notificationService.markAllAsRead(req.user!.userId)
        res.json({ message: 'Todas las notificaciones marcadas como leídas' })
    } catch (error) {
        res.status(500).json({ error: 'Error al marcar las notificaciones como leídas' })
    }
}

const deleteNotification = async (req: Request, res: Response): Promise<void> => {
    try {
        await notificationService.deleteNotification(BigInt(req.params.id as string), req.user!.userId)
        res.status(204).send()
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Notificación no encontrada' })
            return
        }
        res.status(500).json({ error: 'Error al eliminar la notificación' })
    }
}

const deleteAllNotifications = async (req: Request, res: Response): Promise<void> => {
    try {
        await notificationService.deleteAllNotifications(req.user!.userId)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar las notificaciones' })
    }
}

export const notificationController = {
    getMyNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications
}