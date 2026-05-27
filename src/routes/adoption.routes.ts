import { adoptionController } from '@/controllers/adoption.controller'
import { verifyToken, requireRole } from '@/middlewares/auth.middleware'
import { user_role } from '@prisma/client'
import { Router } from 'express'

const adoptionRoutes = Router()

adoptionRoutes.get('/me', verifyToken, adoptionController.getMyAdoptions)
adoptionRoutes.post('/', verifyToken, adoptionController.createAdoption)

adoptionRoutes.get('/', verifyToken, requireRole(user_role.administrador, user_role.trabajador), adoptionController.getAdoptions)
adoptionRoutes.get('/:id', verifyToken, requireRole(user_role.administrador, user_role.trabajador), adoptionController.getAdoptionById)
adoptionRoutes.put('/:id', verifyToken, requireRole(user_role.administrador, user_role.trabajador), adoptionController.updateAdoption)
adoptionRoutes.delete('/:id', verifyToken, requireRole(user_role.administrador), adoptionController.deleteAdoption)

export default adoptionRoutes