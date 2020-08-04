require('dotenv').config()
import express from 'express'
import session from 'express-session'
const FileStore = require('session-file-store')(session)
const app = express()
const addRequestId = require('express-request-id')()
import { join } from 'path'
import morgan, { token } from 'morgan'
import { json, urlencoded } from 'body-parser'
import methodOverride from 'method-override'
import { createWriteStream } from 'fs'
import routes from './routes'
import database from './database/database'
import config from './config/config'

database.connectDB()

app.use(addRequestId)
app.use(methodOverride('_method'))
app.use(json())
app.use(urlencoded({ extended: true }))

app.set('trust proxy', 1)
app.use(session({
	name : 'local.session',
	secret: config.secretKey,
	resave: true,
	store: new FileStore(),
	saveUninitialized: true
}))

token('id', function getId (req) {
	return req.id
})

app.use(express.static(join(__dirname, '/client/build')))

let accessLogStream = createWriteStream(__dirname + '/access.log', {
	flags: 'a',
})
let loggerFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
app.use(morgan(loggerFormat, { stream: accessLogStream }))

routes(app)

app.get('/', (req, res) => {
	res.sendFile(join(__dirname, '/client/build/index.html'))
})

app.use((req, res) => {
	res.status(404).send({ error: 'Not Found' })
})

app.listen(8080, () => {
	console.log('Express Server running on port 8080')
})

process.on('SIGINT', () => {
	database.disconnectDB()
	process.exit(0)
})
