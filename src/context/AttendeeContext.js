import React, { createContext, useState,useEffect} from "react";
import axios from "axios"

import urlService from "../services/url-service";

const API_URL = urlService().baseUrl;

const Context = createContext({});






 const Provider = props => {
  // Initial values are obtained from the props

let errorCount
 
  const {
    // article:initialArticle,
    children
  } = props;

  // Use State to keep the values 
  const [attendee,setAttendee] =useState([])
  const [attendees,setAttendees] = useState([]);
  const [excelAttendees,setExcelAttendees] = useState([]);
  const [pagination,setPagination] = useState({});
  const [currentPage,setCurrentPage]=useState(1)
  const [searchPhrase,setSearchPhrase]=useState("")
  const [errors,setErrors]=useState([])
  const [fetching,setFetching]=useState(false)
  const [fetchingFailMsg,setFetchingFailMsg]=useState(null)

// const [featuredFor,setFeaturedFor]=useState("")
  useEffect(()=>{

  },[])
  

  const fetchAttendeeByIdApi =(id)=>{
    setAttendee([])
    setFetching(true)
    setFetchingFailMsg(null)
    let refsData=[]
    //alert("Hi there man")
      axios.get( API_URL+"programmes/attendees/user/"+id).then (response => {

      console.log("fetch attendees",response.data.data.data)
      setAttendee(response.data.data.data)
      

      // if(response.data.data.data.refs!==null){
        
      //   setAttendee(prevArticle=>{
      //     return {...prevArticle,refs:response.data.data.data.refs}
      //   })
      // }

      // setPagination(prevArticle=>{
      //   return {...prevArticle,...response.data.data.data}
      // })
      
      setFetching(false)
      console.log("post response all attendees",response.data.data.data[0]['refs'][0]['name'])
    }).catch(error => {
      setErrors([])
      setFetching(false)
      error.response!==undefined ? setFetchingFailMsg("No attendeed found") : setFetchingFailMsg("Unknown error")
      // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
      // setErrors(prevError=>[...prevError,apiStatus])
      
  });

  }


  const fetchAttendeesByProgrammeIdApi =(id)=>{
    setAttendees([])
    setExcelAttendees([])
    setFetching(true)
    setFetchingFailMsg(null)

    //alert("Hi there man")

    axios.get( API_URL+"programmes/attendees/"+id).then (response => {

      // console.log("fetch attendees by programme id",response.data.data.data.excel)
      setAttendees(prevArticle=>{
        return [...prevArticle,...response.data.data.data.data]
      })

      setExcelAttendees(prevArticle=>{
        return [...prevArticle,...response.data.data.excel]
      })

      setPagination(prevArticle=>{
        return {...prevArticle,...response.data.data.data}
      })
      
      setFetching(false)
      console.log("post response all attendees",response.data.data.data.data)
    }).catch(error => {
      setErrors([])
      setFetching(false)
      error.response!==undefined ? setFetchingFailMsg("No attendeed found") : setFetchingFailMsg("Unknown error")
        
      //setErrors(prevError=>[...prevError,apiStatus])
     
      
  });

  }


  const goToPageApi =(page)=>{
    setAttendees([])
    setCurrentPage(page)
    setFetching(true)
    setFetchingFailMsg(null)

    axios.get( pagination.path+"?page="+page).then (response => {
      setAttendees(prevArticle=>{
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
      error.response!==undefined ? setFetchingFailMsg("No attendeed found") : setFetchingFailMsg("Unknown error")
      // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
      // setErrors(prevError=>[...prevError,apiStatus])
      
  });

  }


  const searchAttendeesByPhraseApi =()=>{
    
    setAttendees([])
    setFetching(true)
    setFetchingFailMsg(null)

    axios.get( API_URL+"programmes/attendees/search/"+searchPhrase).then (response => {

      
      setAttendees(prevArticle=>{
        return [...prevArticle,...response.data.data.data.data]
      })

      setPagination(prevArticle=>{
        return {...prevArticle,...response.data.data.data}
      })
      
      setFetching(false)
      console.log("get response",response.data.data.data)
      //console.log("all articles",articles)
    }).catch(error => {
      setErrors([])
      setFetching(false)
      error.response!==undefined ? setFetchingFailMsg("No attendeed found") : setFetchingFailMsg("Unknown error")
      // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
      // setErrors(prevError=>[...prevError,apiStatus])
      
  });

  }


  const articleContext = {
    attendees,
    attendee,
    fetchAttendeesByProgrammeIdApi,
    fetchAttendeeByIdApi,
    pagination,
    goToPageApi,
    currentPage,
    searchPhrase,
    setSearchPhrase,
    searchAttendeesByPhraseApi,
    excelAttendees,
    fetching,
    fetchingFailMsg
 
  };

  // pass the value in provider and return
  return <Context.Provider value={articleContext}  {...props}>{children }</Context.Provider>;
};


const AttendeeProvider= {
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


export default AttendeeProvider