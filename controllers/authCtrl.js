import jwt from 'jsonwebtoken'
import config from '../config/config'

const AuthCtrl = {

	sign (user) {
		const { _id: id, email: userName, createdAt } = user
		try {
			return jwt.sign({ id, userName, createdAt }, config.secretKey, { expiresIn: '1h' })
		}catch(err){
			return null
		}
	},

	unSign (token){
		try {
			return jwt.verify(token, config.secretKey)			
		} catch(err) {
			return null
		}
	},
	
	isAuthenticated (req, res){
		const { token } = req.body
		const user = req.session.user
		console.log(token)
		console.log(user)
		try {
			const { id, userName: email } = jwt.verify(token, config.secretKey)
			const isAuth = user._id === id && user.email === email
			res.status(isAuth ? 200 : 401).json({ isAuth })
		} catch(err) {
			res.status(401).json({ isAuth: false })
		}
	}
}

export default AuthCtrl