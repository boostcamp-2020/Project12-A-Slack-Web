import { Router } from 'express'
import reactionController from './reaction.controller'

const router = Router()

router.post('/', reactionController.createOrRemoveReaction)

export default router
