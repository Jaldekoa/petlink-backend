import { shelterMemberController } from '@/controllers/shelterMember.controller'
import { verifyToken, requireRole } from '@/middlewares/auth.middleware'
import { user_role } from '@prisma/client'
import { Router } from 'express'

const shelterMemberRouter = Router()

shelterMemberRouter.get('/', verifyToken, requireRole(user_role.administrador), shelterMemberController.getShelterMembers)
shelterMemberRouter.post('/', verifyToken, requireRole(user_role.administrador), shelterMemberController.createShelterMember)
shelterMemberRouter.put('/:id', verifyToken, requireRole(user_role.administrador), shelterMemberController.updateShelterMember)
shelterMemberRouter.delete('/:id', verifyToken, requireRole(user_role.administrador), shelterMemberController.deleteShelterMember)

shelterMemberRouter.get('/shelter/:shelterId', verifyToken, shelterMemberController.getMembersByShelter)
shelterMemberRouter.get('/user/:userId', verifyToken, shelterMemberController.getSheltersByUser)
shelterMemberRouter.get('/:id', verifyToken, shelterMemberController.getShelterMemberById)

export default shelterMemberRouter