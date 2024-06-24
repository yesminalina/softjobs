import { Router } from 'express'
import { registerUser, loginUser, getUser } from '../controllers/users.controller.js'
import { tokenAuth, usersLogger } from '../middlewares/users.middleware.js'

const router = Router()

router.post('/usuarios', usersLogger, registerUser)
router.post('/login', usersLogger, loginUser)
router.get('/usuarios', tokenAuth, getUser)

export default router
