import { Router } from 'express'
import reactionController from './reaction.controller'

const router = Router()

router.post('/', reactionController.createReaction)
router.delete('/:reactionId', reactionController.deleteReaction)

export default router
