import { Router } from 'express'
import workspaceController from './workspace.controller'

const router = Router()

router.get('/', workspaceController.readWorkspaceByUser)
router.post('/', workspaceController.createWorkspace)
router.post('/check-name', workspaceController.checkWorkspaceName)
router.post('/join', workspaceController.joinWorkspace)
router.get('/:workspaceId', workspaceController.readCurrentWorkspaceInfo)
router.get('/:workspaceId/teammate', workspaceController.readWorkspaceUsers)

export default router
