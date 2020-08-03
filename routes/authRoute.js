import { Router } from 'express'
import { body } from 'express-validator'
import AuthCtrl from '../controllers/authCtrl'

const router = Router()

function authMDW () {
	return [
		body('token').escape(), 
	]
}

router.post('/check', authMDW(), AuthCtrl.isAuthenticated)

export default router
