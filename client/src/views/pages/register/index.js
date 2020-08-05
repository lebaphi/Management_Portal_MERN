import React from 'react'
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
	CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

function register() {
  const form = document.getElementById('register-form')
		const formData = new FormData(form)
		fetch('/api/users/signup', {
			method: 'POST',
			body: formData
		})
			.then(response => response.json())
			.then(({statusCode}) => {
        if (statusCode === 200) {
          alert('Done, login now')
        }
			})
}

const Register = () => {

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
                    <CInput type="text" name="email" placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="password" placeholder="Password" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="repeatPwd" placeholder="Repeat password" autoComplete="new-password" />
                  </CInputGroup>
                  <CButton color="success" block onClick={register}>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer> 
    </div>
  )
}

export default Register
