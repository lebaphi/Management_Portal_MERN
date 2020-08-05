import React from 'react'
import { Link } from 'react-router-dom'
import {
	CButton,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CInput,
	CContainer,
	CForm,
	CInputGroup,
	CInputGroupPrepend,
	CInputGroupText,
	CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Utils from '../../../utils/utils'

const handleSubmit = (props) => {
	const form = document.getElementById('login-form')
	const formData = Utils.validateAndExtractForm(form, 'email', 'password')
	if(Utils.isEmpty(formData)) return
	const { email, password } = formData

	fetch('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password })
	})
		.then(response => response.json())
		.then(({ statusCode, token }) => {
			if (statusCode === 200) {
				localStorage.setItem('token', token)
				props.history.push('dashboard')
			}
		})
}

const Login = props => {

	return (
		<div className="c-app c-default-layout flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md="8">
						<CCardGroup>
							<CCard className="p-4">
								<CCardBody>
									<CForm id="login-form">
										<h1>Login</h1>
										<p className="text-muted">Sign In to your account</p>
										<CInputGroup className="mb-3">
											<CInputGroupPrepend>
												<CInputGroupText>
													<CIcon name="cil-user" />
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput type="email" name="email" placeholder="Username" autoComplete="username" required/>
										</CInputGroup>
										<CInputGroup className="mb-4">
											<CInputGroupPrepend>
												<CInputGroupText>
													<CIcon name="cil-lock-locked" />
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput type="password" name="password" placeholder="Password" autoComplete="current-password" required/>
										</CInputGroup>
										<CRow>
											<CCol xs="6">
												<CButton color="primary" className="px-4" onClick={() => handleSubmit(props)}>Login</CButton>
											</CCol>
											<CCol xs="6" className="text-right">
												<CButton color="link" className="px-0">Forgot password?</CButton>
											</CCol>
										</CRow>
									</CForm>
								</CCardBody>
							</CCard>
							<CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
								<CCardBody className="text-center">
									<div>
										<h2>Sign up</h2>
										<p>Description here...</p>
										<Link to="/register">
											<CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
										</Link>
									</div>
								</CCardBody>
							</CCard>
						</CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	)
}

export default Login
