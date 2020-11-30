import { Router } from 'express'
import threadController from './thread.controller'

const router = Router()

router.post('/', threadController.createThread)
router.delete('/:id', threadController.deleteThread)

export default router
