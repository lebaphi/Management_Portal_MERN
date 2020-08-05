import React, { Component } from 'react'
import {
	CButton,
	CCard,
	CCardBody,
	CCol,
	CContainer,
	CForm,
	CInput,
	CInputGroup,
	CInputGroupPrepend,
	CInputGroupText,
	CRow,
  CLink,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Utils from '../../../utils/utils'


class Register extends Component {

  state = {
    signup: false,
    error: ''
  }

  register = () => {
    this.setState({error : ''})
    const form = document.getElementById('register-form')
    const formData = Utils.validateAndExtractForm(form, 'email', 'password', 'repeatPwd')
    if(Utils.isEmpty(formData)) return
    const { email, password, repeatPwd } = formData

    if (password !== repeatPwd) {
      this.setState({error: 'Password does not match'})
      return
    } else if (password.length < 8) {
      this.setState({error: 'Password should be more than 8 characters'})
      return
    }

    fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })
      .then(response => response.json())
      .then(({ statusCode, msg }) => {
        if (statusCode === 200) {
          this.setState({signup: true})
        } else {
          this.setState({error: msg})
        }
      })
  }
  
	render(){
		return (
			<div className="c-app c-default-layout flex-row align-items-center">
				<CContainer>
					<CRow className="justify-content-center">
						<CCol md="9" lg="7" xl="6">
							<CCard className="mx-4">
								<CCardBody className="p-4">
									<CForm id="register-form">
										<h1>Register</h1>
										<p className="text-muted">Create your account</p>
										<CInputGroup className="mb-3">
											<CInputGroupPrepend>
												<CInputGroupText>@</CInputGroupText>
											</CInputGroupPrepend>
											<CInput type="email" name="email" placeholder="Email" autoComplete="email" required/>
										</CInputGroup>
										<CInputGroup className="mb-3">
											<CInputGroupPrepend>
												<CInputGroupText>
													<CIcon name="cil-lock-locked" />
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput type="password" name="password" placeholder="Password" autoComplete="new-password" required/>
										</CInputGroup>
										<CInputGroup className="mb-4">
											<CInputGroupPrepend>
												<CInputGroupText>
													<CIcon name="cil-lock-locked" />
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput type="password" name="repeatPwd" placeholder="Repeat password" autoComplete="new-password" required/>
										</CInputGroup>
                    {this.state.error && 
                    <CAlert color="danger">
                      {this.state.error}
                    </CAlert>}
										<CButton color="success" block onClick={this.register}>Create Account</CButton>
										{this.state.signup && 
                    <CLink to="/login">
											<CButton color="link" className="px-0">User created success. Login now!</CButton>
										</CLink>}
									</CForm>
								</CCardBody>
							</CCard>
						</CCol>
					</CRow>
				</CContainer> 
			</div>
		)
	}
	
}

export default Register
