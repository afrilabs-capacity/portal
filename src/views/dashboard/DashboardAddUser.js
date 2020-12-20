import React, { useEffect,useContext } from 'react'

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CPagination,
  CButton
} from '@coreui/react'
import UserProvider from "../../context/UserContext"
import UserRole from "../../inputs/user-role"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import usersData from '../../views/users/UsersData'
import Paginations from "../../pagination/pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from "@fortawesome/free-solid-svg-icons";
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

const DashboardAddUser = () => {


    const {toast,fetchUsersApi,users,setUser,addUserApi,errors,deleteUserApi,apiAction,fetchingFailMsg}=useContext(UserProvider.Context)

    useEffect(()=>{
    
  fetchUsersApi()

    },[])

    const Styles={
        errorColor:{
            color:"red"
        }
    }

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password:'',
          role: 'editor',
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .max(15, 'Must be 7 characters or less')
            .required('Name field required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          role: Yup.string().required('Email address required'),
        }),
        onSubmit: values => {
            //setUser(values)
            addUserApi(values)
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
          Add User
          </CCardHeader>
          <CCardBody>
          <form onSubmit={formik.handleSubmit}>
          <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInput 
                    id="name" 
                    placeholder="Enter your name" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                     />
                  </CFormGroup>
                  {formik.touched.name && formik.errors.name ? (
         <><div style={Styles.errorColor}>{formik.errors.name}</div><br /></>
       ) : null}
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Email</CLabel>
                    <CInput id="email"
                     type="email"
                      placeholder="Enter email here.." 
                      placeholder="Enter your name" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                      
                       />
                  </CFormGroup>
                  {formik.touched.email && formik.errors.email ? (
         <div style={Styles.errorColor}>{formik.errors.email}</div>
       ) : null}
                </CCol>
              </CRow>

              <CRow className="text-center">
              <CCol xs="12">
                   <UserRole formik={formik} />
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
                    
                      Add
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


      <CCol xl={7}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
            
          <table className="table table-hover  mb-2 d-none d-sm-table w-100">
        
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Registered</th>
            <th>Role</th>
            <th>Trash</th>
          </thead>
          <tbody>
          {users.length ? users.map(user=>(
            <tr>
            <td className="pd-2">{user.name}</td>
            <td className="pd-2">{user.email}</td>
            <td className="pd-2">{user.registered}</td>
            <td className="pd-2">{user.role}</td>
            <td className="pd-2">{<FontAwesomeIcon style={{color:"red",cursor:"pointer"}} onClick={()=>deleteUserApi(user.id)} icon={faTrash} />}</td>

            </tr>
          )):""}

          </tbody>
          </table>
          
          {!users.length && fetchingFailMsg!==null && <h3 className="mb-4">{fetchingFailMsg}</h3>}
          
          {users.length ? <Paginations context={UserProvider.Context} /> : "" }
              
         
          </CCardBody>
        </CCard>
      </CCol>
      <LoginModal context={UserProvider.Context}/>
      
    </CRow>
  )
}

export default DashboardAddUser
