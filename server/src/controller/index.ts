import { Router } from 'express'
import verifyUser from '../middleware/user.middleware'
import userController from './user'
import channelController from './channel'
import workspaceController from './workspace'
import threadController from './thread'
import messageController from './message'

const router = Router()

router.use('/user', userController)
router.use(verifyUser)
router.use('/channel', channelController)
router.use('/workspace', workspaceController)
router.use('/thread', threadController)
router.use('/message', messageController)

export default router
