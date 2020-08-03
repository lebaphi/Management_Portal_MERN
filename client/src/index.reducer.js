import { combineReducers } from 'redux'  
import { reducer as form } from 'redux-form'  
import client from './components/client/reducer'  
import signup from './components/signup/reducer'  
import login from './components/login/reducer'
import widgets from './components/widgets/reducer'

const IndexReducer = combineReducers({  
	signup,
	client,
	login,
	form,
	widgets
})

export default IndexReducer  