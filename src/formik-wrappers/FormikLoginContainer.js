import React, { useState,useEffect,useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { CCol, CRow, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import AuthService from "../services/auth.service";
import { withRouter, useHistory,useLocation,Redirect } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};



const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Mail Format").required("required"),
  password: Yup.string().required("required"),
});

const FormikLoginContainer=({context})=> {
      
  const history = useHistory();
  const location= useLocation()
  const {setAuthModal,loginAction,apiAction}=useContext(context)

 const { from } = location.state || { from: { pathname: "/dashboard" } };
  const [apiError, setApiError] = useState(null);

  const onSubmit = (values, onSubmitProps) => {
    //console.log('form values',values);

    onSubmitProps.setSubmitting(true);
    AuthService.login(values.email, values.password).then(
      () => {
        if(context){
        
          //call intended function after relogin
          loginAction && loginAction.params ? loginAction.func(loginAction.params ): loginAction.func()

          //close login modal
          setAuthModal(false)
        }else{
           history.push("/dashboard");
        } 
        //window.location.reload();
      },
      (error) => {
        if (error.response) {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          switch (error.response.code) {
            case "401":
              setApiError("Invalid Username or Password");
            default:
              setApiError("Invalid Username or Password");
          }
        } else {
            onSubmitProps.setSubmitting(false);
          setApiError(error.message);
        }
        onSubmitProps.setSubmitting(false);
      }
    );
    //onSubmitProps.resetForm()
    //alert("Submit");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        console.log("formik", formik);
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
            />

            <FormikControl
              control="input"
              type="password"
              name="password"
              label="Password"
              placeholder="password"
            />

            {apiError !== null ? (
              <CRow>
              <CCol xs="12">
                <div class="alert alert-danger" role="alert">
                  {apiError}
                </div>
                </CCol>
              </CRow>
            ) : (
              ""
            )}

            <CRow>
              <CCol xs="6">
              
                  { 
                    apiAction ? 
                    <button className="btn btn-primary px-4"  disabled={apiAction}>
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </button> : 
                    <button className="btn btn-primary px-4"  disabled={apiAction}>
                    
                      Login
                    </button>
                  }
                
              </CCol>
              <CCol xs="6" className="text-right">
                <CButton color="link" className="px-0">
                  Forgot password?
                </CButton>
              </CCol>
            </CRow>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikLoginContainer;
