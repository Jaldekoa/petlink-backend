import { sponsorshipController } from '@/controllers'
import { verifyToken, requireRole } from '@/middlewares/auth.middleware'
import { user_role } from '@prisma/client'
import { Router } from 'express'

const sponsorshipRouter = Router()

sponsorshipRouter.get('/me', verifyToken, sponsorshipController.getMySponsorships)

sponsorshipRouter.post('/', verifyToken, sponsorshipController.createSponsorship)
sponsorshipRouter.patch('/me/:id/cancel', verifyToken, sponsorshipController.cancelSponsorship)

sponsorshipRouter.get('/', verifyToken, requireRole(user_role.administrador), sponsorshipController.getSponsorships)
sponsorshipRouter.get('/:id', verifyToken, requireRole(user_role.administrador), sponsorshipController.getSponsorshipById)
sponsorshipRouter.put('/:id', verifyToken, requireRole(user_role.administrador), sponsorshipController.updateSponsorship)
sponsorshipRouter.delete('/:id', verifyToken, requireRole(user_role.administrador), sponsorshipController.deleteSponsorship)

export default sponsorshipRouter