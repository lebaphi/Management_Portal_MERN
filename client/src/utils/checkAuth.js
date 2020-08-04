
export function checkAuth() {
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
}