import { Router } from 'express'
import userController from './user'

const router = Router()

router.get('/oauth/google', userController.googleLogin)

export default router
