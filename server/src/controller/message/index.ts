import { Router } from 'express'
import messageController from './message.controller'

const router = Router()

router.get('/', messageController.readMessageById)
router.post('/', messageController.createMessage)
router.patch('/:id', messageController.updateMessage)
router.delete('/:id', messageController.deleteMessage)

export default router
