import React from 'react'
import { Link } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import FormikLoginBasicContainer from "../../../formik-wrappers/FormikLoginBasicContainer"
import AuthService from "../../../services/auth.service";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { withRouter, useHistory,useLocation,Redirect } from "react-router-dom";




const Loading =()=> (
 <div class="h-100 d-flex align-items-center flex-column">
  <div class="spinner-border" role="status">
  </div>
  <span class="text-primary">Loading...</span>
</div>
)

const user = AuthService.getCurrentUser();

const Login = () => {

  const history=useHistory()
  console.log('user',user)

  if(localStorage.lac_user) return <Redirect to="/dashboard" />

  return   <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>

                    {/* <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup> */}
                    <FormikLoginBasicContainer />
                  
                </CCardBody>
              </CCard>

              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  
}

export default Login
