import { Router } from 'express'
import messageController from './message.controller'

const router = Router()

router.post('/', messageController.createMessage)

export default router
