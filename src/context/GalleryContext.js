import React, { createContext, useState,useEffect } from "react";
import PropTypes from "prop-types";

const Context = createContext({});

 const Provider = ({children}) => {

// Use State to keep the values
const [uploadProgress,setUploadProgress] = useState(0);

//useEffect(()=>{console.log("article ii",article)},[article])
const galleryContext = {
    uploadProgress,
    setUploadProgress
  };

  // pass the value in provider and return
  return <Context.Provider value={galleryContext}>{children}</Context.Provider>;
};



const GalleryProvider= {
    Provider,
    Context
};

// Provider.propTypes = {
//     article:PropTypes.object,  
// };




export default GalleryProvider