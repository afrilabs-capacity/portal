import React, { useState,useContext,useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CPagination
} from '@coreui/react'
// import ArticleProvider from "../context/ArticleContext"

const Paginations = ({context}) => {
 
  const {currentPage,goToPageApi,pagination}=useContext(context)


let pagesToRender=Math.ceil(pagination.total/pagination.per_page)

useEffect(()=>{
//alert(pagesToRender)
  },[])

  return (
    <>      
          <CPagination
            align="center"
            size="lg"
            addListClass="some-class"
            activePage={currentPage}
            pages={pagesToRender==0 ? 1 : pagesToRender}
            onActivePageChange={(page)=>goToPageApi(page)}
          />
          <br></br>

         
    </>
  )
}

export default Paginations
