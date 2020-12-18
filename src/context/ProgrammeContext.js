import React, { createContext, useState,useEffect} from "react";
import { useHistory,useLocation,useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios"
import urlService from "../services/url-service";

const API_URL = urlService().baseUrl;

const Context = createContext({});

const initialArticle={
    id:null,
    title_en: "",
    body_en: null,
    featured_en:null,
    title_fr: "",
    body_fr: null,
    featured_fr:null,
    status:"draft",
    category:"",
    created_at:null,
    updated_at:null
}


const initialEditArticle={
 id:null,
 title_en: "",
 body_en: null,
 featured_en:null,
 title_fr: "",
 body_fr: null,
 featured_fr:null,
 status:"draft",
 category:"",
 created_at:null,
 updated_at:null
}




 const Provider = props => {
  // Initial values are obtained from the props

let errorCount
 
  const {
    // article:initialArticle,
    children
  } = props;

  // Use State to keep the values
  const [programmes,setProgrammes] = useState([]);
  const [pagination,setPagination] = useState({});
  const [currentPage,setCurrentPage]=useState(1)
  const [searchPhrase,setSearchPhrase]=useState("")
  const [errors,setErrors]=useState([])
  const [fetching,setFetching]=useState(false)
  const [fetchingFailMsg,setFetchingFailMsg]=useState(null)

  // const [featuredFor,setFeaturedFor]=useState("")
  useEffect(()=>{

  },[])
  


  const fetchProgrammesApi =()=>{
    setProgrammes([])
    setFetching(true)

    //alert("Hi there man")

    axios.get( API_URL+"programmes").then (response => {

      console.log("fetch articles",response.data.data.data.data)
      setProgrammes(prevArticle=>{
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
      error.response!==undefined ? setFetchingFailMsg("No programmes found") : setFetchingFailMsg("Unknown error")
      // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
      // setErrors(prevError=>[...prevError,apiStatus])
      
  });

  }


  const goToPageApi =(page)=>{
    setProgrammes([])
    setCurrentPage(page)

    axios.get( pagination.path+"?page="+page).then (response => {
      setProgrammes(prevArticle=>{
        return [...prevArticle,...response.data.data.data.data]
      })

      setPagination(prevArticle=>{
        return {...prevArticle,...response.data.data.data}
      })
      
     
      console.log("post response all articles",response.data.data.data)
    }).catch(error => {
      setErrors([])
      let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
      setErrors(prevError=>[...prevError,apiStatus])
      
  });

  }


  const searchByPhraseApi =()=>{
    
    setProgrammes([])
    setFetching(true)
    setFetchingFailMsg(null)

    axios.get( API_URL+"programmes/search/"+searchPhrase).then (response => {

      
      setProgrammes(prevArticle=>{
        return [...prevArticle,...response.data.data.data.data]
      })

      setPagination(prevArticle=>{
        return {...prevArticle,...response.data.data.data}
      })
      
      setFetching(false)
      !response.data.data.data.length && setFetchingFailMsg("No results found...")
      console.log("get response",response.data.data.data)
      //console.log("all articles",articles)
    }).catch(error => {
      setErrors([])
      setFetching(false)
     
      error.response!==undefined ? setFetchingFailMsg("No articles found") : setFetchingFailMsg("Unknown error")
      // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
      // setErrors(prevError=>[...prevError,apiStatus])
      
  });

  }


  const articleContext = {
    programmes,
    fetchProgrammesApi,
    pagination,
    goToPageApi,
    currentPage,
    searchPhrase,
    setSearchPhrase,
    searchByPhraseApi,
    fetching,
    fetchingFailMsg,
 

    

  };

  // pass the value in provider and return
  return <Context.Provider value={articleContext}  {...props}>{children }</Context.Provider>;
};


const ProgrammeProvider= {
    Provider,
    Context
};

// Provider.propTypes = {
//     article:PropTypes.object,  
// };

// Provider.defaultProps = {
//   article: {
//     title_en: "",
//     body_en: null,
//     featured_en:null,
//     title_fr: "",
//     body_fr: null,
//     featured_fr:null,
//     status:"draft"
//   },


// };


export default ProgrammeProvider