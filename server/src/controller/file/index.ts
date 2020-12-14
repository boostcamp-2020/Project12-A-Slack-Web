import { Router } from 'express'
import upload from '@middleware/file-upload'
import fileController from './file.controller'

const router = Router()

router.post('/', upload.single('filename'), fileController.createFile)

export default router
