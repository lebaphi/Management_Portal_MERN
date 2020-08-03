import studentModel from '../models/student'

const StudentCtrl = {

	getAllStudents (_, res) {
		studentModel.find(
			{},
			null,
			{
				sort: { createdAt: -1 },
			},
			(err, records) => {
				if (err) res.status(404).json({ err })
				res.status(200).json(records)
			}
		)
	},
  
	getStudentById (req, res) {
		const id = req.params.id
		studentModel.findOne(
			{ _id: id },
			(err, records) => {
				if (err) res.status(404).json({ err })
				res.status(200).json(records)
			}
		)
	}
}

export default StudentCtrl
