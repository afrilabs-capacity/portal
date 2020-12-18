import React from 'react'
import {Field, ErrorMessage} from 'formik'
import TextError from './TextError'
import {
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'


function Input(props) {
    const {label, name,placeholder,type,...rest} = props
    //const restItems= {...rest}
    //console.log('rest',{...rest})
    return ( 

          <div>
          <Field  id={name} name={name} {...rest} >
              { ({field,form})=>{
                  console.log('formik errors',form.errors)
                  return <div className="mb-3">
                   <CInputGroup className={""}>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type={type} {...field} placeholder={placeholder}  />  
                    </CInputGroup>
                    <ErrorMessage name={name}  component={TextError} />
                    </div>
              }

              }

          </Field>
          
          </div>
            
         

       
    )
     {/* <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field  id={name} name={name} {...rest} />
            <ErrorMessage name={name}  component={TextError} />
        </div> */}
}

export default Input
