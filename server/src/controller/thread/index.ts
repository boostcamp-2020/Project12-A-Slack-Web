import { Router } from 'express'
import threadController from './thread.controller'

const router = Router()

router.post('/', threadController.createThread)
router.get('/', threadController.readThreadsByChannel)
router.delete('/:id', threadController.deleteThread)

export default router
