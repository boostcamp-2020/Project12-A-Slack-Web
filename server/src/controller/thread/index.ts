import { Router } from 'express'
import threadController from './thread.controller'

const router = Router()

router.post('/', threadController.createThread)

export default router
