import mongoose from 'mongoose'
import config from '../config/config'

const Database = {

	initialize(){
		mongoose.connection.on('open', function() {
			console.log('Connected to Database (MongoDB) ')
		})
		mongoose.connection.on('error', function() {
			console.log('error in Database (MongoDB) connections')
		})
		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose default connection disconnected')
		})
		process.on('SIGINT', () => {
			mongoose.connection.close(() => {
				console.log('Mongoose disconnected through app termination')
				process.exit(0)
			})
		})
	},

	connectDB () {
		const options = {
			poolSize: 10,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
		this.initialize()
		mongoose.connect(config.connectionStr, options)
	},

	disconnectDB() {
		mongoose.disconnect(config.connectionStr)
	}
}

export default Database
