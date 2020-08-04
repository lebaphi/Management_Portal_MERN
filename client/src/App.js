import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import './scss/style.scss'

import TheLayout from './containers/TheLayout'
import Login from './views/pages/login'
import Register from './views/pages/register'
import Page404 from './views/pages/page404/Page404'

import PrivateRoute from './utils/privateRoute'
import PublicRoute from './utils/publicRoute'
import Dashboard from './views/dashboard/Dashboard'

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
)

const App = () => {
	return (
		<HashRouter>
			<React.Suspense fallback={loading}>
				<Switch>
					<PublicRoute restricted={true} component={Login} path="/login" name="Login Page" exact />
					<PublicRoute restricted={false} component={Register} path="/register" name="Register Page"/>
					<PublicRoute exact path="/404" name="Page 404" component={Page404}/>
					<PrivateRoute restricted={false} component={TheLayout} path="/" name="Home" />
					<PrivateRoute component={Dashboard} name="Dashboard page" exact />
				</Switch>
			</React.Suspense>
		</HashRouter>
	)
}

export default App
