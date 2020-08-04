
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkAuth } from './checkAuth'
import PropTypes from 'prop-types'

class PublicRoute extends Component {

	UNSAFE_componentWillMount(){
		this.setState({ isAuth: false })
	}
  
	componentDidMount(){
		checkAuth().then(({ isAuth }) => {
			this.setState({ isAuth })
		}, () => {
			this.setState({ isAuth: false })
		})
	}

	render(){
		const { component: Component, restricted, ...rest } = this.props
		return (
			<Route {...rest} render={props => (
				this.state.isAuth && restricted ?
					<Redirect to="/dashboard" />
					: <Component {...props} />
			)} />
		)
	}
	
}

PublicRoute.propTypes = {
	component: PropTypes.any,
	restricted: PropTypes.bool
}

export default PublicRoute