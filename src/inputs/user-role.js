import React,{useContext,useEffect} from 'react'
import UserProvider from "../context/UserContext"
import {
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInput,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'


const UserRole=({formik})=>{
    const {user,updateUser}=useContext(UserProvider.Context)

    

    let articleStatus

     useEffect(()=>{
      //alert(user)
     },[formik.values.role])


    return (
    <div className={""}>
        <label>Administrator &nbsp;</label>
       <input  type="radio"  id="statusp" name="role" checked={formik.values.role=="admin"? true:false} value="admin" onChange={formik.handleChange} />  


         <label>&nbsp;&nbsp;&nbsp;Editor &nbsp;</label>
         <input  type="radio"  id="statusd" name="role" value="editor" checked={formik.values.role=="editor"?true:false} onChange={formik.handleChange} />

     </div>
   

    )
    

   

}
 export default UserRole