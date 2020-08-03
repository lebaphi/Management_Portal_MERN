import studentRoute from './studentRoute'
import userRoute from './userRoute'
import authRoute from './authRoute'

export default function Route(app) {
	app.use('/api/students', studentRoute)
	app.use('/api/users', userRoute)
	app.use('/api/auth', authRoute)
}