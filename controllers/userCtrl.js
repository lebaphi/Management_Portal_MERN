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
			if (err) return res.status(404).json({ err })
			userModel.create({ _id: new ObjectId(), email, password: hash }, (err, data) => {
				if (err) return res.status(404).json({ err })
				res.status(200).json(data)
			})
		})
	},

	async login (req, res){
		const { email, password } = req.body
		const user = await UserCtrl.getUserByEmail(email)
		if (!user) return res.status(403).json({ err: 'Invalid username/password' })
		
		const match = await bcrypt.compare(password, user.password)
		if(!match) return res.status(403).json({ err: 'Invalid username/password' })

		req.session.user = user
		const token = await auth.sign(user)
		if (!token) return res.status(403)
		res.status(200).json(token)
	}
}

export default UserCtrl