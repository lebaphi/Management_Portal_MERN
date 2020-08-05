
const Utils = {
	checkAuth() {
		const token = localStorage.getItem('token') || ''
		return new Promise((res, rej) => {
			fetch('/api/auth/check', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token })
			})
				.then(response => response.json())
				.then(isAuth => { res(isAuth) })
				.catch(err => { rej(err) })
		})
	},

	validateAndExtractForm(form, ...fields){
		const result = {}
		for (const elm of form.elements){
			if(!elm.checkValidity()){
				elm.reportValidity()
				return {}
			} else if (fields.includes(elm.name)){
				result[ elm.name ] = elm.value
			}
		}
		return result
	},

	isEmpty(obj) {
		for(const key in obj) {
			if(obj.hasOwnProperty(key)) return false
		}
  	return true
	}
}

export default Utils