import React,{useContext,useEffect} from 'react'
import {
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInput,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  //import ArticleProvider from "../context/ArticleContext"

const SearchInput =({context})=>{
    const { searchPhrase,
        setSearchPhrase,
        searchByPhraseApi
    }=useContext(context)


    useEffect(()=>{

      

    },[])
      
    return (<div className="input-group">
     {/* <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">@</span>
     </div> */}
     <input type="text"  className="form-control mr-sm-2" placeholder="Search here..." onChange={(e)=>setSearchPhrase(e.target.value)} onKeyDown={(e)=>e.keyCode == 13 ?searchByPhraseApi():""} />
     <div className="input-group-prepend">
    <button className="btn btn-outline-primary" id="basic-addon1" onClick={
        ()=>{
        searchPhrase!=="" && searchByPhraseApi()
        }
        } >Search</button>
     </div>
    </div>)
    

}

export default SearchInput