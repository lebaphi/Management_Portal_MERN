import { Router } from 'express'
import userCtrl from '../controllers/userCtrl'

const router = Router()

router.get('/', userCtrl.getAllUsers)
router.post('/signup', userCtrl.createUser)
router.post('/login', userCtrl.login)

export default router
