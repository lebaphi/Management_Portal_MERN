import studentRoute from './studentRoute'
import userRoute from './userRoute'

export default function Route(app) {
	app.use('/api/students', studentRoute)
	app.use('/api/users', userRoute)
}