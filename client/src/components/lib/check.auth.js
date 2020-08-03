
function checkAuthorization (dispatch) {  

	const storedToken = localStorage.getItem('token')
	if (storedToken) {
		// 	CHECK TOKEN IS VALID HERE

		// const token = JSON.parse(storedToken)
		// const createdDate = new Date(token.created)
		// const created = Math.round(createdDate.getTime() / 1000)
		// const ttl = 1209600
		// const expiry = created + ttl

		// if (created > expiry) return false
		return true
	}

	return false
}

export function checkIndexAuthorization ({ dispatch }) {  
	return (nextState, replace, next) => {
		if (checkAuthorization(dispatch)) {
			replace('manage')
			return next()
		}
		replace('login')
		return next()
	}
}

export function checkWidgetAuthorization ({ dispatch }, route) {  

	return (_, replace, next) => {
		if (checkAuthorization(dispatch)){
			if ([ 'login', 'signup' ].includes(route)) replace('manage')
			return next()
		}
		if (![ 'login', 'signup' ].includes(route)) replace('login')
		return next()
	}
}