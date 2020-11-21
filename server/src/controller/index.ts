import { Router } from 'express'
import userController from './user'
import workspaceController from './workspace'
import verifyUser from '../middleware/verifyUser'

const router = Router()

router.use('/user', userController)

router.use('/workspace', verifyUser, workspaceController)

export default router
