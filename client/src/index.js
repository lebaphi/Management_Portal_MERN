import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import App from './App'
import Login from './components/login'
import Signup from './components/signup'
import Widgets from './components/widgets'
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
				<Route path="/login" component={Login} /> 
				<Route path="/signup" component={Signup} />
				<Route onEnter={checkWidgetAuthorization(store)} path="/widgets" component={Widgets} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root'),
)

serviceWorker.register()