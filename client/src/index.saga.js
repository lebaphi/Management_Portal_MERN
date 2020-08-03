import SignupSaga from './components/signup/saga'  
import LoginSaga from './components/login/saga'
import WidgetSaga from './components/widgets/saga'

export default function* IndexSaga () {  
	yield [
		SignupSaga(),
		LoginSaga(),
		WidgetSaga()
	]
}