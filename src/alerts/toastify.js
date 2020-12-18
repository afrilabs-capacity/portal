import React,{useContext} from "react"
import {
    CToaster,
    CToast,
    CToastHeader,
    CToastBody,
  } from '@coreui/react'
  import ArticleProvider from "../context/ArticleContext"
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


let toaster=toast
   

const ToastMe=({showToast})=>{
    const {toast,toastType,errors,setToast}=useContext(ArticleProvider.Context)

  let notify = () => toastType=="success" ? toaster.success("Wow so easy !"): toaster.error("Error!")
   
    return (
        <>
  
      <div>
       
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
{ }
<ToastContainer />
      </div>
    
         
        </>
      )

}



export default ToastMe