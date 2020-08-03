
class Config  {
	get connectionStr() {  return process.env.MONGO_DB}
	get databaseName() {  return process.env.DB_NAME}
}

export default new Config()
