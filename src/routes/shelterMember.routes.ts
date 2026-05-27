import { shelterMemberController } from '@/controllers/shelterMember.controller'
import { verifyToken, requireRole } from '@/middlewares/auth.middleware'
import { user_role } from '@prisma/client'
import { Router } from 'express'

const shelterMemberRoutes = Router()

shelterMemberRoutes.get('/', verifyToken, requireRole(user_role.administrador), shelterMemberController.getShelterMembers)
shelterMemberRoutes.post('/', verifyToken, requireRole(user_role.administrador), shelterMemberController.createShelterMember)
shelterMemberRoutes.put('/:id', verifyToken, requireRole(user_role.administrador), shelterMemberController.updateShelterMember)
shelterMemberRoutes.delete('/:id', verifyToken, requireRole(user_role.administrador), shelterMemberController.deleteShelterMember)

shelterMemberRoutes.get('/shelter/:shelterId', verifyToken, shelterMemberController.getMembersByShelter)
shelterMemberRoutes.get('/user/:userId', verifyToken, shelterMemberController.getSheltersByUser)
shelterMemberRoutes.get('/:id', verifyToken, shelterMemberController.getShelterMemberById)

export default shelterMemberRoutes