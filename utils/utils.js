const Utils = {
	handleError (res, statusCode, msg) {
		res.status(statusCode).json({ statusCode, token: null, msg })
	}
}

export default Utils