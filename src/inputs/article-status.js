import React,{useContext,useEffect} from 'react'
import ArticleProvider from "../context/ArticleContext"
import {
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInput,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'

  const setUpdateModeOrNot=()=>{


  }





const ArticleStatus=()=>{
    const {article,updateArticle}=useContext(ArticleProvider.Context)

    let articleStatus

    // useEffect(()=>{
    //  articleStatus=article.status
    // },[])


    return (
    <div className={""}>
        <label>Published &nbsp;</label>
       <input  type="radio"  id="statusp" name="status" checked={article.status=="published"?true:false} value="published" onChange={(e)=>{
         updateArticle("status", e.target.value)
         //console.log("article",article)
         }} />  


         <label>&nbsp;&nbsp;&nbsp;Draft &nbsp;</label>
         <input  type="radio"  id="statusd" name="status" value="draft" checked={article.status=="draft"?true:false} onChange={(e)=>{
         updateArticle("status", e.target.value)
         //console.log("article",article)
         }} />

     </div>
   

    )
    

   

}
 export default ArticleStatus