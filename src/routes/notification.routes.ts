import { notificationController } from '@/controllers'
import { verifyToken } from '@/middlewares'
import { Router } from 'express'

const notificationRouter = Router()

notificationRouter.get('/', verifyToken, notificationController.getMyNotifications)
notificationRouter.patch('/read-all', verifyToken, notificationController.markAllAsRead)
notificationRouter.patch('/:id/read', verifyToken, notificationController.markAsRead)
notificationRouter.delete('/all', verifyToken, notificationController.deleteAllNotifications)
notificationRouter.delete('/:id', verifyToken, notificationController.deleteNotification)

export default notificationRouter