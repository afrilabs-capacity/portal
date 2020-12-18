import React,{useContext,useEffect} from 'react'
import {
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInput,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import ArticleProvider from "../context/ArticleContext"

const TitleInput =({actionType})=>{
    const {editMode,article,updateArticle}=useContext(ArticleProvider.Context)


    useEffect(()=>{

      

    },[])
      
    let key="xxx"

    const setUpdateModeOrNot=()=>{

      if(actionType=="en" && editMode=="update" && !article.title_en==""){
   
        return  article.title_en

      }


      if(actionType=="fr" && editMode=="update" && !article.title_fr==""){
  
        return  article.title_fr

      }

      return ""


    }

    return (<div className="input-group mb-3">
     <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">@</span>
     </div>
     <input type="text"  className="form-control" value={actionType=="en" ? article.title_en:article.title_fr}  placeholder="Title here.."  onChange={(e)=>{
        actionType=="en" ? updateArticle("title_en", e.target.value):  updateArticle("title_fr", e.target.value)
         //console.log("article",article)
         }} />
    </div>)
    

}

export default TitleInput