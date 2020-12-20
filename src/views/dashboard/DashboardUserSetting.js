import React, { useEffect,useContext } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
} from '@coreui/react'
import UserProvider from "../../context/UserContext"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginModal from '../../modals/login-modal'



const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const DashboardUserSetting= () => {


    const {updatePasswordUserApi,errors,apiAction}=useContext(UserProvider.Context)

 

    const Styles={
        errorColor:{
            color:"red"
        }
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: Yup.object({
          password: Yup.string().required('Password is required').min(6, 'Your password must be  6 characters or more.'),
          passwordConfirmation: Yup.string().required("PLease confirm password again")
             .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: values => {
            //setUser(values)
            updatePasswordUserApi(values)
          //alert(JSON.stringify(values, null, 2));
        },
      });

  useEffect(() => {
    // currentPage !== page && setPage(currentPage)
  }, [])

  return (
      
    <CRow>
      <CCol xl={5}>
        <CCard>
          <CCardHeader>
          Update Password
          </CCardHeader>
          <CCardBody>
          <form onSubmit={formik.handleSubmit}>
          <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">New Password</CLabel>
                    <CInput 
                    id="password"
                    type="password" 
                    placeholder="Enter your new password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                     />
                  </CFormGroup>
                  {formik.touched.password && formik.errors.password ? (
         <><div style={Styles.errorColor}>{formik.errors.password}</div><br /></>
       ) : null}
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Confirm New Password</CLabel>
                    <CInput id="passwordConfirmation"
                    type="password" 
                      placeholder="Confirm password here.." 
                      placeholder="Enter your name" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirmation}
                      
                       />
                  </CFormGroup>
                  {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
         <div style={Styles.errorColor}>{formik.errors.passwordConfirmation}<br />
         <br /></div>
         
       ) : null}
                </CCol>
              </CRow>

              

              
              <CRow className="text-center">
              <CCol xs="12">
              {apiAction ? 
                    <button className="btn btn-primary px-4 w-100"   disabled={apiAction}>
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      &nbsp;Loading...
                    </button> : 
                    <button className="btn btn-primary px-4 w-100"  disabled={apiAction}>
                    
                      Update Password
                    </button>}
                  <div style={{color:"red"}} className="mt-2">
                  {errors.length ? <h3>Submission contains errors</h3>:""}
                      {errors.length ?errors.map( (error,i)=><p key={i} className="text-left">{error}</p>):""}
                      </div>
                  </CCol>
              </CRow>
         </form>
          </CCardBody>
        </CCard>
      </CCol>


      
      <LoginModal context={UserProvider.Context}/>
      
    </CRow>
  )
}

export default DashboardUserSetting
