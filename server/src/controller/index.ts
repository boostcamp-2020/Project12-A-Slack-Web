import { Router } from 'express'
import userController from './user'
import workspaceController from './workspace'
import verifyUser from '../middleware/user.middleware'

const router = Router()

router.use('/user', userController)

router.use(verifyUser)
router.use('/workspace', workspaceController)

export default router
