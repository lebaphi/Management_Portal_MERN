import React from 'react'  
import PropTypes from 'prop-types'
import './styles/App.css'

const App = props => (  
	<div className="App">
		<div className="App-header">
			<h2>Student Management</h2>
		</div>
		<section className="App-body">
			{props.children}
		</section>
	</div>
)

App.propTypes = {  
	children: PropTypes.node,
}

export default App