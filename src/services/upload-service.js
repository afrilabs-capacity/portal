import axios from "axios";
import authHeader from "./auth-header";


const API_URL = "http://192.168.43.122:8080/laravel/site40/public/api/v1/";

const uploadImage = (username, email, password) => {
  return axios.post(API_URL + "upload_image", {
    username,
    email,
    password,
  },{ headers: authHeader() });
};


export default {
    uploadImage
}