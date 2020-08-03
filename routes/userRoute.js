import { Router } from 'express'
import { body } from 'express-validator'
import userCtrl from '../controllers/userCtrl'

const router = Router()

function getUserByIdMDW(){
	return [
		body('id').escape()
	]
}

function signUpMDW() {
	return [
		body('email').isEmail().normalizeEmail().escape(), 
		body('password').isLength({ min: 8 }).escape()
	]
}

router.get('/', userCtrl.getAllUsers)
router.get('/:id', getUserByIdMDW(), userCtrl.getUserById)
router.post('/signup', signUpMDW(), userCtrl.createUser)

export default router
