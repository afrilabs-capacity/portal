import axios from "axios";
import {useContext} from 'react'
import authHeader from "./auth-header";
import UserProvider from "../../context/UserContext"

const API_URL = "http://192.168.43.122:8080/laravel/site40/public/api/v1/";

const getUsersApi= () => {

  const {toast,fetchUsersApi,users,setUser,addUserApi,errors,KeysToErrorArray,setFetching,setErrors,setPagination,setUsers}=useContext(UserProvider.Context)


  axios.get( API_URL+"users",{headers: authHeader()}).then (response => {
    setUsers([])
    setFetching(true)

    console.log("fetch articles",response.data.data.data.data)
    setUsers(prevArticle=>{
      return [...prevArticle,...response.data.data.data.data]
    })

    setPagination(prevArticle=>{
      return {...prevArticle,...response.data.data.data}
    })
    
    setFetching(false)
    console.log("post response all articles",response.data.data.data)
  }).catch(error => {
    setErrors([])
    setFetching(false)
    if(error.response.status){
         switch(error.response.status) {
      case 500:
          alert.show(error.response.statusText,{type: 'error'})
        break;
      case 422:
          KeysToErrorArray(error.response.data.errors)
        break;
        case 409:
          KeysToErrorArray(error.response.data.errors)
        break;
        case 401:
          alert.show("Token error",{type:'notice'})
          //showLoginModal()
        break;
      default:
          !error.response ? alert.show("Server currently down",{type: 'error'}):
          alert.show(error.response.statusText,{type: 'error'})
    }     
    }else{
      alert.show("Server currently down",{type: 'error'})
    }

  //   error.response!==undefined ? setFetchingFailMsg("No programmes found") : setFetchingFailMsg("Unknown error")
    // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
    // setErrors(prevError=>[...prevError,apiStatus])
    
});
};



export default {
  getUsersApi
};