import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import formidable from 'formidable'
import userModel from '../models/user'
import auth from './authCtrl'
import Utils from '../utils/utils'

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

	badData (res){
		return Utils.handleError(res, 401, 'Invalid username/password')
	},

	async login (req, res){
		const form = formidable.IncomingForm()
		form.parse(req, async (err, form) => {
			if (err) return UserCtrl.badData(res)
			const { email, password } = form
			const user = await UserCtrl.getUserByEmail(email)
			if (!user) return UserCtrl.badData(res)
			
			const match = await bcrypt.compare(password, user.password)
			if(!match) return UserCtrl.badData(res)

			req.session.user = user
			const token = auth.sign(user)
			if (!token) return UserCtrl.badData(res)
			res.status(200).json({ statusCode: 200, token, msg: 'success' })
		})
	}
}

export default UserCtrl