import axios from "axios";
import urlService from "../services/url-service";

const API_URL = urlService().authUrl;

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
        
        //alert("hi there")
        console.log('response',response)
      if (response.data.access_token) {
        console.log("LAC response",response)
          let userData={
              id:response.data.user.id,
              name:response.data.user.name,
              email:response.data.user.email,
              accountType:response.data.user.account_type,
              accessToken:response.data.access_token
          }
          
        localStorage.setItem("lac_user", JSON.stringify(userData));
      }
      //console.log(response)
      return response.data;
    })
};

const logout = () => { 
localStorage.removeItem("lac_user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("lac_user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};