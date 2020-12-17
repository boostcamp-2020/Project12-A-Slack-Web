import { Router } from 'express'
import mailController from './mail.controller'

const router = Router()

router.post('/', mailController.sendEmail)

export default router
