import { adoptionController } from '@/controllers/apdoption.controller'
import { verifyToken, requireRole } from '@/middlewares/auth.middleware'
import { user_role } from '@prisma/client'
import { Router } from 'express'

const adoptionRouter = Router()

adoptionRouter.get('/me', verifyToken, adoptionController.getMyAdoptions)
adoptionRouter.post('/', verifyToken, adoptionController.createAdoption)

adoptionRouter.get('/', verifyToken, requireRole(user_role.administrador, user_role.trabajador), adoptionController.getAdoptions)
adoptionRouter.get('/:id', verifyToken, requireRole(user_role.administrador, user_role.trabajador), adoptionController.getAdoptionById)
adoptionRouter.put('/:id', verifyToken, requireRole(user_role.administrador, user_role.trabajador), adoptionController.updateAdoption)
adoptionRouter.delete('/:id', verifyToken, requireRole(user_role.administrador), adoptionController.deleteAdoption)

export default adoptionRouter