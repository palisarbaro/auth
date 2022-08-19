import { Router } from 'express'
import { userController, tokenController } from './controllers'

const router = Router()

router.post('/createuser', userController.createUser.bind(userController))
router.post('/login', userController.login.bind(userController))
router.post('/token', tokenController.token.bind(tokenController))

export default router