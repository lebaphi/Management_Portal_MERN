
class Config {
	get connectionStr() { return process.env.MONGO_DB}
	get databaseName() { return process.env.DB_NAME}
	get secretKey() {return process.env.SECRET_KEY}
}

export default new Config()
