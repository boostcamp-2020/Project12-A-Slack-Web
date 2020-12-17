import { Router } from 'express'
import channelController from './channel.controller'

const router = Router()

router.get('/', channelController.readChannelsByUser)
router.post('/', channelController.createChannel)
router.get('/all', channelController.readChannelsByWorkspace)
router.get('/:channelId', channelController.readChannelInfo)
router.post('/:channelId/join', channelController.joinChannel)
router.post('/:channelId/join-members', channelController.joinMembersToChannel)
router.delete('/:channelId/user/:userId', channelController.deleteMember)
router.get('/:channelId/joined', channelController.checkJoinedChannel)

export default router
