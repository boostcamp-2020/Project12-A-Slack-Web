import { Router } from 'express'
import workspaceController from './workspace.controller'

const router = Router()

router.get('/', workspaceController.readWorkspaceByUser)
router.post('/', workspaceController.createWorkspace)
router.post('/join', workspaceController.joinWorkspace)

export default router
