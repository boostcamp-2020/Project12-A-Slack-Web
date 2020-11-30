import { Router } from 'express'
import messageController from './message.controller'

const router = Router()

router.post('/', messageController.createMessage)
router.patch('/:id', messageController.updateMessage)

export default router
