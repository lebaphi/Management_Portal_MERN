export function handleApiErrors (response) {  
	if (response.ok) return response
	throw Error('Invalid username/password')
	
}