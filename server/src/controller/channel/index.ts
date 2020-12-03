import { Router } from 'express'
import channelController from './channel.controller'

const router = Router()

router.get('/', channelController.readChannelsByUser)
router.post('/', channelController.createChannel)
router.get('/all')
router.get('/:channelId', channelController.readChannelThreads)
router.post('/:channelId/join', channelController.joinChannel)

export default router
