import { userController } from '@/controllers'
import { Router } from 'express'

const userRouter = Router()

userRouter.get('/', userController.getUsers)
userRouter.get('/:id', userController.getUserById)
// userRouter.post('/', userController.createUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

export default userRouter