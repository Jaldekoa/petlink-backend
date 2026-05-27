import { sponsorshipController } from '@/controllers'
import { verifyToken, requireRole } from '@/middlewares/auth.middleware'
import { user_role } from '@prisma/client'
import { Router } from 'express'

const sponsorshipRoutes = Router()

sponsorshipRoutes.get('/me', verifyToken, sponsorshipController.getMySponsorships)

sponsorshipRoutes.post('/', verifyToken, sponsorshipController.createSponsorship)
sponsorshipRoutes.patch('/me/:id/cancel', verifyToken, sponsorshipController.cancelSponsorship)

sponsorshipRoutes.get('/', verifyToken, requireRole(user_role.administrador), sponsorshipController.getSponsorships)
sponsorshipRoutes.get('/:id', verifyToken, requireRole(user_role.administrador), sponsorshipController.getSponsorshipById)
sponsorshipRoutes.put('/:id', verifyToken, requireRole(user_role.administrador), sponsorshipController.updateSponsorship)
sponsorshipRoutes.delete('/:id', verifyToken, requireRole(user_role.administrador), sponsorshipController.deleteSponsorship)

export default sponsorshipRoutes