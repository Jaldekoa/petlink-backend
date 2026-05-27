import { notificationController } from '@/controllers'
import { verifyToken } from '@/middlewares'
import { Router } from 'express'

const notificationRoutes = Router()

notificationRoutes.get('/', verifyToken, notificationController.getMyNotifications)
notificationRoutes.patch('/read-all', verifyToken, notificationController.markAllAsRead)
notificationRoutes.patch('/:id/read', verifyToken, notificationController.markAsRead)
notificationRoutes.delete('/all', verifyToken, notificationController.deleteAllNotifications)
notificationRoutes.delete('/:id', verifyToken, notificationController.deleteNotification)

export default notificationRoutes