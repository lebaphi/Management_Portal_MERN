import React, { Component } from 'react'  
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'  
import { connect } from 'react-redux'

import { studentListing } from './actions'

class Manage extends Component {  

	// static propTypes = {
	//   user: PropTypes.shape({
	//     id: PropTypes.number.isRequired,
	//     token: PropTypes.object.isRequired,
	//   }),
	//   students: PropTypes.shape({
	//     list: PropTypes.array,
	//     requesting: PropTypes.bool,
	//     successful: PropTypes.bool,
	//     messages: PropTypes.array,
	//     errors: PropTypes.array,
	//   }).isRequired,
	// }

	componentDidMount(){
		
		fetch('/api/auth/check', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: localStorage.getItem('token') })
		})
	}

	render () {
		// const {
		// 	students: {
		// 		requesting,
		// 		successful,
		// 		messages,
		// 		errors,
		// 	},
		// } = this.props

		return (
			<div className="widgets">
				<div className="widget-form">
					<form>
						<h1>Authenticated</h1>
					</form>
					<hr />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({  
	client: state.client,
	students: state.students,
})

const connected = connect(mapStateToProps, { studentListing })(Manage)  
const formed = reduxForm({  
	form: 'students',
})(connected)

export default formed 