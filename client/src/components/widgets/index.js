import React, { Component } from 'react'  
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'  
import { connect } from 'react-redux'

import Messages from '../notification/message'  
import Errors from '../notification/error'

import { widgetCreate } from './actions'

const nameRequired = value => (value ? undefined : 'Name Required')

class Widgets extends Component {  

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      token: PropTypes.object.isRequired,
    }),
    widgets: PropTypes.shape({
      list: PropTypes.array,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    widgetCreate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }

  submit = (widget) => {
    const { client, widgetCreate, reset } = this.props
    widgetCreate(client, widget)
    reset()
  }

  renderNameInput = ({ input, type, meta: { touched, error } }) => (
    <div>
      <input
        {...input}
        type={type}
      />

      {touched && error && (
        <div style={{ color: '#cc7a6f', margin: '-10px 0 15px', fontSize: '0.7rem' }}>
          {error}
        </div>
        )
      }
    </div>
  )
	render () {
		const {
			handleSubmit,
			invalid,
			widgets: {
				requesting,
				successful,
				messages,
				errors,
			},
		} = this.props

		return (
			<div className="widgets">
				<div className="widget-form">
					<form onSubmit={handleSubmit(this.submit)}>
						<h1>CREATE THE WIDGET</h1>
						<label htmlFor="name">Name</label>
						{/* We will use a custom component AND a validator */}
						<Field
							name="name"
							type="text"
							id="name"
							className="name"
							component={this.renderNameInput}
							validate={nameRequired}
						/>
						<label htmlFor="description">Description</label>
						<Field
							name="description"
							type="text"
							id="description"
							className="description"
							component="input"
						/>
						<label htmlFor="size">Size</label>
						<Field
							name="size"
							type="number"
							id="size"
							className="number"
							component="input"
						/>
						{/* the button will remain disabled until not invalid */}
						<button
							disabled={invalid}
							action="submit"
						>CREATE</button>
					</form>
					<hr />
					<div className="widget-messages">
						{requesting && <span>Creating widget...</span>}
						{!requesting && !!errors.length && (
							<Errors message="Failure to create Widget due to:" errors={errors} />
						)}
						{!requesting && successful && !!messages.length && (
							<Messages messages={messages} />
						)}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({  
	client: state.client,
	widgets: state.widgets,
})

const connected = connect(mapStateToProps, { widgetCreate })(Widgets)  
const formed = reduxForm({  
	form: 'widgets',
})(connected)

export default formed 