import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import App from './App'
import Login from './components/login'
import Signup from './components/signup'
import Manage from './components/manage'
import IndexReducer from './index.reducer'
import IndexSagas from './index.saga'
import * as serviceWorker from './serviceWorker'
import {  
	checkIndexAuthorization,
	checkWidgetAuthorization,
} from './components/lib/check.auth'

const sagaMiddleware = createSagaMiddleware()

const composeSetup = process.env.NODE_ENV !== 'production' 
		&& typeof window === 'object' 
		&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
	IndexReducer, 
	composeSetup(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(IndexSagas)

ReactDOM.render(  
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App} >
				<IndexRoute onEnter={checkIndexAuthorization(store)} />
				<Route onEnter={checkWidgetAuthorization('login')} path="/login" component={Login} /> 
				<Route onEnter={checkWidgetAuthorization('signup')} path="/signup" component={Signup} />
				<Route onEnter={checkWidgetAuthorization('manage')} path="/manage" component={Manage} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root'),
)

serviceWorker.register()