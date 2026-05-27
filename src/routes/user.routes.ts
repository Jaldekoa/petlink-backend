import { userController } from '@/controllers'
import { requireRole } from '@/middlewares'
import { user_role } from '@prisma/client'
import { Router } from 'express'

const userRouter = Router()


userRouter.get('/me', userController.getMe)
userRouter.put('/me', userController.updateMe)
userRouter.delete('/me', userController.deleteMe)

userRouter.get('/', requireRole(user_role.administrador), userController.getUsers)
userRouter.get('/:id', requireRole(user_role.administrador), userController.getUserById)
userRouter.get('/email/:email', requireRole(user_role.administrador), userController.getUserByEmail)
userRouter.post('/', requireRole(user_role.administrador), userController.createUser)
userRouter.put('/:id', requireRole(user_role.administrador), userController.updateUser)
userRouter.delete('/:id', requireRole(user_role.administrador), userController.deleteUser)

export default userRouter