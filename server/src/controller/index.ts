import { Router } from 'express'
import verifyUser from '@middleware/user.middleware'
import userRouter from './user'
import workspaceRouter from './workspace'
import channelRouter from './channel'
import threadRouter from './thread'
import messageRouter from './message'
import reactionRouter from './reaction'
import fileRouter from './file'
import mailRouter from './mail'

const router = Router()

router.use('/user', userRouter)
router.use(verifyUser)
router.use('/workspace', workspaceRouter)
router.use('/channel', channelRouter)
router.use('/thread', threadRouter)
router.use('/message', messageRouter)
router.use('/reaction', reactionRouter)
router.use('/file', fileRouter)
router.use('/sendmail', mailRouter)

export default router
