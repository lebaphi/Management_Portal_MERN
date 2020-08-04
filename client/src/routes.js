import Dashboard from './views/dashboard/Dashboard'
import Users from './views/users/Users'
import User from './views/users/User'
import Login from './views/pages/login'

const routes = [
	{ path: '/', exact: true, name: 'Home' },
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
	{ path: '/users', exact: true, name: 'Users', component: Users },
	{ path: '/users/:id', exact: true, name: 'User Details', component: User },
	{ path: '/login', exact: true, name: 'Login', component: Login }
]

export default routes
