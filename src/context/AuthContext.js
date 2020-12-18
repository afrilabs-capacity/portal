import React, { createContext, useState,useEffect} from "react";
import { useHistory,useLocation,useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Context = createContext({});

const API_URL = "http://192.168.43.122:8080/laravel/site40/public/api/v1/";

 const Provider = props => {
 
 
  const {
    // article:initialArticle,
    childrens
  } = props;

  // Use State to keep the values
  const [modal,setModal] = useState(false);
 


  const articleContext = {
  modal,
  setModal
    
  };

  // pass the value in provider and return
  return <Context.Provider value={articleContext}  {...props}></Context.Provider>;
};


const AuthProvider= {
    Provider,
    Context
};


export default AuthProvider