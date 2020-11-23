import { Router } from 'express'
import userController from './user'
import workspaceController from './workspace'
import threadController from './thread'
import verifyUser from '../middleware/verifyUser'

const router = Router()

router.use('/user', userController)
router.use('/workspace', verifyUser, workspaceController)
router.use('/thread', threadController)

export default router
