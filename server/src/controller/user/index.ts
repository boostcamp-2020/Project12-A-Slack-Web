import { Router } from 'express'
import passport from 'passport'
import userController from './user'

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

export default router
