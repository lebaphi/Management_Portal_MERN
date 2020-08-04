import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkAuth } from './checkAuth'
import PropTypes from 'prop-types'

class PrivateRoute extends Component {

	UNSAFE_componentWillMount(){
		this.setState({ isAuth: true })
	}
  
	componentDidMount(){
		checkAuth().then(({ isAuth }) => {
			this.setState({ isAuth })
		}, () => {
			this.setState({ isAuth: false })
		})
	}
  
	render(){
		const { component: Component, ...rest } = this.props
		return (
			<Route {...rest} render={props => (
				this.state.isAuth ?
					<Component {...props} />
					: <Redirect to="/login" />
			)} />
		)
	}

}

PrivateRoute.propTypes = {
	component: PropTypes.any,
	restricted: PropTypes.bool
}

export default PrivateRoute