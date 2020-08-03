const mongoClient = require('mongodb').MongoClient
const http = require('http')
const uri = 'mongodb+srv://phile:Icekul89.%3E@project0.uchh1.gcp.mongodb.net/db_0?retryWrites=true&w=majority'

const option = {
	poolSize: 10,
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

mongoClient.connect(uri, option, (err, client) => {
	if (err) {
		throw err
	}

	http.createServer((req, res) => {
		if (req.url === '/health') {
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			})
			res.write('OK')
			res.end()
			return
		}

		const collection = client.db().collection('message')
		const msg = {
			msgDescription: '\nHello World received on ' + new Date()
		}

		collection.insertOne(msg, (err) => {
			if (err) {
				throw err
			}

			let msgList = ''
			collection.find().toArray((err, data) => {
				if (err) {
					throw err
				}
				data.forEach((msg) => {
					msgList += `${msg.msgDescription}; `
				})

				res.writeHead(200, {
					'Content-Type': 'text/plain'
				})
				res.write('Messages received so far:\n')
				res.end(msgList)
			})
		})
	}).listen(process.env.PORT || 8080, () => {
		console.log('started web process')
	})
})