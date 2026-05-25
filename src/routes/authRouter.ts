import { authController } from '@/controllers'
import { checkCredentials, isRegisterDataCorrect } from '@/middlewares'
import { Router } from 'express'

const authRouter = Router()
authRouter.post('/login', checkCredentials, authController.login)
authRouter.post('/register', isRegisterDataCorrect, authController.register)

export default authRouter