import { ObjectId } from 'mongodb'
import userModel from '../models/user'

const UserCtrl = {

	getAllUsers(_, res) {
		userModel.find(
			{},
			null,
			{
				sort: { createdAt: -1 },
			},
			(err, records) => {
				if (err) res.status(500).json({ err })
				res.status(200).json(records)
			}
		)
	},
  
	getUserById(req, res) {
		const id = req.params.id
		userModel.findById(
			{ _id: id },
			(err, records) => {
				if (err) res.status(500).json({ err })
				res.status(200).json(records)
			}
		)
	},

	createUser(req, res){
		const { email, password } = req.body
		
		userModel.create({ _id: new ObjectId(), email, password }, (err, data) => {
			if (err) return res.status(500).json({ err })
			res.status(200).json(data)
		})
	}
}

export default UserCtrl