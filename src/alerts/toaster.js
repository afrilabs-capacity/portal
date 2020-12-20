import React,{useContext} from "react"
import {
    CToaster,
    CToast,
    CToastHeader,
    CToastBody,
  } from '@coreui/react'
  
  



const ToastMe=({showToast,context})=>{
    const {toastType,errors,setToast}=useContext(context)

   

    return (
        <>
            <CToaster>
            
                  <CToast
                    style={{background:toastType=="success" ? "green": "pink",color:toastType=="success" ? "white": "wine"}}
                    show={showToast}
                    autohide={5000}
                    fade={true}
                    className="success"
                  >
                    <CToastHeader >
                      {toastType=="success" ? "Success": "Error"}
                    </CToastHeader>
                    <CToastBody>
                        <ul>
                    {
                       errors.length? errors.map((error,i)=> {
                           setToast(true)
                           return (<li key={i}>{error}</li>)
                           }
                           
                           ) :""
                        //errors.length? setToast(true):""  
                           
                    }
                      </ul>
                    </CToastBody>
                  </CToast>
            </CToaster>
         
        </>
      )

}



export default ToastMe