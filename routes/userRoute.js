import { Router } from 'express'
import { body } from 'express-validator'
import userCtrl from '../controllers/userCtrl'

const router = Router()

function signUpMDW() {
	return [
		body('email').isEmail().normalizeEmail().escape(), 
		body('password').isLength({ min: 8 }).escape()
	]
}

router.get('/', userCtrl.getAllUsers)
router.post('/signup', signUpMDW(), userCtrl.createUser)
router.post('/login', signUpMDW(), userCtrl.login)

export default router
