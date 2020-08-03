import { Router } from 'express'
import { param } from 'express-validator'
import studentCtrl from '../controllers/studentCtrl'

const router = Router()

function getStudentByIdMDW(){
	return [
		param('id').escape()
	]
}

router.get('/', studentCtrl.getAllStudents)
router.get('/:id', getStudentByIdMDW(), studentCtrl.getStudentById)

export default router
