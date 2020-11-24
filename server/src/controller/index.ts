import { Router } from 'express'
import userController from './user'
import workspaceController from './workspace'
import verifyUser from '../middleware/user.middleware'
import threadController from './thread'
import messageController from './message'

const router = Router()

router.use('/user', userController)
router.use('/message', messageController)
router.use(verifyUser)
router.use('/workspace', workspaceController)
router.use('/thread', threadController)

export default router
