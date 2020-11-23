import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('certified user')
})

export default router
