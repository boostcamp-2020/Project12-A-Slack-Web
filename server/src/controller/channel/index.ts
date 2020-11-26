import { Router } from 'express'
import channelController from './channel.controller'

const router = Router()

router.get('/', channelController.readChannelsByUser)
router.post('/', channelController.createChannel)
router.get('/:channelId', channelController.readChannelThreads)

export default router
