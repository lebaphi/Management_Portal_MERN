import { call, put, cancelled, takeLatest } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
import { handleApiErrors } from '../lib/api-errors'

import {  
	LOGIN_REQUESTING,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
} from './constants'

const loginUrl = '/api/users/login'

function loginApi(email, password) {  
	return fetch(loginUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})
		.then(handleApiErrors)
		.then(response => response.json())
		.catch((error) => { throw error })
}

function logout () {  
	localStorage.removeItem('token')
	browserHistory.push('/login')
}

function* loginFlow (action) {  
	let token
	try {
		const { email, password } = action
		token = yield call(loginApi, email, password )
		yield put({ type: LOGIN_SUCCESS })
		localStorage.setItem('token', token)
		browserHistory.push('/manage')
	} catch (error) {
		yield put({ type: LOGIN_ERROR, error })
	} finally {
		if (yield cancelled()) {
			browserHistory.push('/login')
		}
	}

	return token
}

function* loginWatcher () {  
	yield takeLatest(LOGIN_REQUESTING, loginFlow)
}

export default loginWatcher  