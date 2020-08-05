import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import userModel from '../models/user'
import auth from './authCtrl'

const UserCtrl = {

	getAllUsers (_, res) {
		userModel.find({}, null, { sort: { createdAt: -1 } }, (err, records) => {
			if (err) res.status(404).json({ err })
			res.status(200).json(records)
		})
	},
  
	getUserById (id) {
		return new Promise((res, rej) => {
			userModel.findById({ _id: id }, (err, user) => {
				if (err) rej(err)
				else res(user)
			})
		})
	},

	getUserByEmail (email) {
		return new Promise((res, rej) => {
			userModel.findOne({ email }, (err, user) => {
				if (err) rej(err)
				else res(user)
			})
		})
	},

	createUser (req, res){
		const { email, password } = req.body
		bcrypt.hash(password, 10, function (err, hash) {
			if (err) return res.status(502).json({ statusCode: 502, msg: 'Unexpected Error' })
			userModel.create({ _id: new ObjectId(), email, password: hash }, err => {
				if (err) return res.status(502).json({ statusCode: 502, msg: 'Unexpected Error' })
				res.status(200).json({ statusCode: 200, msg: 'Success' })
			})
		})
	},

	async login (req, res){
		const { email, password } = req.body
		console.log(email, password)
		const user = await UserCtrl.getUserByEmail(email)
		if (!user) return res.status(401).json({ statusCode: 401, msg: 'Unauthorized' })
			
		const match = await bcrypt.compare(password, user.password)
		if(!match) return res.status(401).json({ statusCode: 401, msg: 'Unauthorized' })

		req.session.user = user
		const token = auth.sign(user)
		if (!token) return UserCtrl.badData(res)
		res.status(200).json({ statusCode: 200, token, msg: 'Success' })
	}
}

export default UserCtrl