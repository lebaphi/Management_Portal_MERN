import SignupSaga from './components/signup/saga'  
import LoginSaga from './components/login/saga'

export default function* IndexSaga () {  
	yield [
		SignupSaga(),
		LoginSaga(),
	]
}