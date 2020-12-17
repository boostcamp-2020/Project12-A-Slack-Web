import passport from 'passport'
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth2'
import { findOrCreateUser } from '@service/user.service'

const serverURL =
  process.env.NODE_ENV === 'development'
    ? process.env.BACK_DOMAIN_DEVELOP
    : process.env.BACK_DOMAIN_PRODUCTION

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${serverURL}/api/user/oauth/google/callback`,
}

const googleLoginVerify = async (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: VerifyCallback,
) => {
  try {
    const { _json: userData } = profile
    const currentUser = await findOrCreateUser(userData)
    done(null, currentUser)
  } catch (error) {
    done(error)
  }
}

const passportInit = () => {
  passport.use(new GoogleStrategy(googleConfig, googleLoginVerify))
}

export default passportInit
