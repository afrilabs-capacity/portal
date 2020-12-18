import React,{useContext,useEffect,useState} from "react"
import {
    CModal,
    CModalHeader,
    CButton,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
    CProgress
  } from '@coreui/react'
  import axios from "axios";
  import FormikLoginContainer from '../formik-wrappers/FormikLoginContainer'
  import AuthProvider from '../context/AuthContext'


const LoginModal=({context})=>{

    const {authModal,setAuthModal,apiAction,setApiAction}=useContext(context)

     //alert(modal)

    return (
        <>
      
      <CModal
      size="sm"
        show={authModal}
        onClose={()=>{
          setAuthModal(!authModal) 
          setApiAction(false)
          } }
      >
        <CModalHeader closeButton><h1>Login</h1> </CModalHeader>
        <CModalBody>
          <CRow>
              <CCol md="12" className="text-center">
           <p style={{color:"red"}}>Session expired, please sign in to continue</p>
             <FormikLoginContainer context={context} />
              </CCol>
          </CRow>
         
        </CModalBody>
        <CModalFooter>
        
          <CButton
            color="secondary"
            onClick={()=>{
          setAuthModal(!authModal) 
          setApiAction(false)
          }}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    </>
           
      )

}



export default LoginModal