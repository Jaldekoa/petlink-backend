import { userController } from '@/controllers'
import { requireRole, verifyToken } from '@/middlewares'
import { user_role } from '@prisma/client'
import { Router } from 'express'

const userRoutes = Router()


userRoutes.get('/me', verifyToken, userController.getMe)
userRoutes.put('/me', verifyToken, userController.updateMe)
userRoutes.delete('/me', verifyToken, userController.deleteMe)

userRoutes.get('/', verifyToken, requireRole(user_role.administrador), userController.getUsers)
userRoutes.get('/:id', verifyToken, requireRole(user_role.administrador), userController.getUserById)
userRoutes.get('/email/:email', verifyToken, requireRole(user_role.administrador), userController.getUserByEmail)
userRoutes.post('/', verifyToken, requireRole(user_role.administrador), userController.createUser)
userRoutes.put('/:id', verifyToken, requireRole(user_role.administrador), userController.updateUser)
userRoutes.delete('/:id', verifyToken, requireRole(user_role.administrador), userController.deleteUser)

export default userRoutes