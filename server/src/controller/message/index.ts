import { Router } from 'express'
import messageController from './message.controller'

const router = Router()

router.get('/:id', messageController.readMessageById)
router.get('/', messageController.readMessagesByThread)
router.post('/', messageController.createMessage)
router.patch('/:id', messageController.updateMessage)
router.delete('/:id', messageController.deleteMessage)

export default router
