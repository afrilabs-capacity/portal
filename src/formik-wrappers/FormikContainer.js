import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import FormikControl from "./FormikControl";



const initialValues = {
    email: '',
    comments:'',
    selectOption:'',
    radioOption:'',
    checkboxOption:[]
  };

  const validationSchema= Yup.object({
  email:Yup.string().email('Invalid Mail Format').required('required'),
  comments:Yup.string().required('required'),
  selectOption:Yup.string().required('required'),
  radioOption:Yup.string().required('required'),
  checkboxOptions:Yup.array().required('required')
   })


   const onSubmit=(values,onSubmitProps)=>{       
    console.log(values)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    alert("Submit")
}

function FormikContainer() {
    const dropdownOptions =[
        {key:'Select an option',value:''},
        {key:'Option 1',value:'options1'},
        {key:'Option 2',value:'options2'},
        {key:'Option 3',value:'options3'},
        {key:'Option 4',value:'options4'}
    ]


    const radioOptions =[
        {key:'Option 1',value:'options1'},
        {key:'Option 2',value:'options2'},
        {key:'Option 3',value:'options3'},
        {key:'Option 4',value:'options4'}
    ]


    const checkboxOptions =[
        {key:'Option 1',value:'coptions1'},
        {key:'Option 2',value:'coptions2'},
        {key:'Option 3',value:'coptions3'},
        {key:'Option 4',value:'coptions4'}
    ]


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
          console.log('formik',formik)
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              name="email"
              label="Email"
            />
            <br />
            <FormikControl
              control="textarea"
              type="text"
              name="comments"
              label="Comments"
            />
            <br />
            <FormikControl
              control="select"
              type="text"
              name="selectOption"
              label="Select a topic"
              options={dropdownOptions}
            />
            <br />
            <FormikControl
              control="radio"
              name="radioOption"
              label="Select a topic"
              options={radioOptions}
            />
            <br />
            <FormikControl
              control="checkbox"
              name="checkboxOption"
              label="Checkbox topics"
              options={checkboxOptions}
            />
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikContainer;
