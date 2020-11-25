import { Router } from 'express'
import passport from 'passport'
import verifyUser from '../../middleware/user.middleware'
import userController from './user.controller'

const router = Router()

router.get(
  '/oauth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  }),
)
router.get(
  '/oauth/google/callback',
  passport.authenticate('google', { session: false }),
  userController.handleGoogleLoginCallback,
)

router.get('/status', verifyUser, userController.statusController)

export default router
