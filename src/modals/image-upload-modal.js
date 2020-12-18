import React,{useContext,useEffect,useState} from "react"
import {
    CModal,
    CModalHeader,
    CButton,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
    CProgress
  } from '@coreui/react'
  import ArticleProvider from "../context/ArticleContext"
  import PgCatProvider from "../context/PgCatContext"
  import GalleryProvider from "../context/GalleryContext";
  import InfiniteScroll from 'react-infinite-scroll-component';
  import axios from "axios";
  import { useAlert } from 'react-alert'
  import authHeader from "../services/auth-header";
  import urlService from "../services/url-service";

const API_URL = urlService().baseUrl;

  const PUBLIC_URL = urlService().publicUrl;

  const Styles={
    link:{
      textDecoration:"underline",
      fontSize:"11px",
      color:"green"
    },
    Titles:{
      color:"black"
    },
    Theme:{
      background:"rgb(250, 252, 255)"
    }
  }
    


const ModalMe=({showToast})=>{

  const {initialLoginAction,setLoginAction,setAuthModal,selectedImageGlobal,setSelectedImageGlobal,updateArticle,article,setArticle,featuredFor,setSelectedImageEn,setSelectedImageFr,modal,setModal}=useContext(ArticleProvider.Context)
  const {boy,uploadProgress,setUploadProgress} = useContext(GalleryProvider.Context)
  const alert = useAlert()

  

  const [gallery,updateGallery]=useState([])

  const [selectedImage,setSelectedImage]=useState("")
  const [selectedImageId,setSelectedImageId]=useState("")
  const [fileType,setFileType]=useState("")
  const [fileName,setFileName]=useState("")
  const [fileSize,setFileSize]=useState("")
  const [fileDimension,setFileDimension]=useState("")
  const [fileUploadedOn,setFileUploadedOn]=useState("")
  const [pagination,setPagination] = useState({});
  const [hasMore,setHasMore] = useState(false);
  const [successMsg,setSuccessMsg] = useState(null);
  const [uploading,setUploading] = useState(false);
  //const [loginAction,setLoginAction] =useState(initialLoginAction)

  let loadMore=false

  let selectedImageIdv=null

  const triggerSelectInput=(e,input)=>{
    e.preventDefault()
     input.click()
}

useEffect(()=>{
  const uploadBt=document.getElementById("modal-upload-bt")
  const uploadInput=document.getElementById("modal-upload-input")
  uploadBt.addEventListener("click",(e)=>triggerSelectInput(e,uploadInput))
  // document.addEventListener("click",(e)=>{ 
  //   if (e.target.tagName == 'A' && e.target.classList.contains("acpb_featured_delete")) {
  //     e.preventDefault(); 
  //     deletePhoto()
  //     //setSelectedImageEn("")
  //     //updateArticle("featured_en",null)
  //   }
  // })
  //console.log("gallery from useEffect",gallery)

   fetchGallery()
},[])




useEffect(()=>{
if(pagination.next_page_url && pagination.next_page_url!==null){
  setHasMore(true)
//alert.show(pagination.next_page_url,{type: 'error',position:"bottom center"})
}else{
  setHasMore(false)
} 
},[pagination])

useEffect(()=>{
  selectedImageIdv=selectedImageId
  },[selectedImageId])

 

 const fetchGallery=async=>{
  updateGallery([])
  setSelectedImage("")
  setSelectedImageId("")
  axios.request( {
    method: "get", 
    url: API_URL+"photo/all", 
    // data: data, 
    onUploadProgress: (p) => {
       setUploadProgress(prevProgress=>prevProgress+Math.round((100 * p.loaded) / p.total))
       //console.log("upload progress",p.total/p.loaded)
    }


  }).then (response => {
      //console.log("response file name",response.data.data.data.data)
    
      updateGallery(prevGallery=>[
        ...prevGallery,...response.data.data.data.data
      ])

      setPagination(prevArticle=>{
        return {...prevArticle,...response.data.data.data}
      })

     // console.log("initial api fetch",response)
  })

 }


 const deletePhoto=()=>{
  //updateGallery([])
  setLoginAction(initialLoginAction)

   axios.get(API_URL+"photo/delete/"+selectedImageId,{headers: authHeader() }).then (response => {
 //fetchGallery()
 const newList = gallery.filter((item) => item.id !== selectedImageId);
 updateGallery(newList);
 setSelectedImage("")

 console.log('delete image response',response)
  }).catch(error => {
    if(error.response){
      if(error.response.status){
           switch(error.response.status) {
        case 500:
            alert.show(error.response.statusText,{type: 'error'})
          break;
          case 401:
            alert.show("Token error",{type:'notice'})
            setAuthModal(true)
            setLoginAction(prevArticle=>{
              return {...prevArticle,func:deletePhoto,params:selectedImageId}
            })
            
          break;
        default:
            !error.response ? setSuccessMsg("Server currently down"):
            setSuccessMsg(error.response.statusText)
      }     
      }else{
        setSuccessMsg("Server currently down")
      }
    }else{
      setSuccessMsg("Invalid response")
    }
    // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
    // setErrors(prevError=>[...prevError,apiStatus])
    
});

 }



 const LoadMore=()=>{


pagination.next_page_url==null && setHasMore(false)

pagination.next_page_url!==null && axios.request( {
    method: "get", 
    url: pagination.next_page_url, 
  }).then (response => {
      //console.log("response file name",response.data.data.data.data)
    
      updateGallery(prevGallery=>[
        ...prevGallery,...response.data.data.data.data
      ])

      setPagination(prevArticle=>{
        return {...prevArticle,...response.data.data.data}
      })

     // console.log("initial api fetch",response)
  })

 }





const onChange=(e)=>{
  //console.log(e.target.value)
  setUploadProgress(0)
  let file=null
  file = e.target.files[0] || e.dataTransfer.files[0];
  e.target.value = "";
  let allowed_mime_types = [ 'image/jpeg', 'image/png' ];
  let allowed_size_mb = 2;
  
  if(allowed_mime_types.indexOf(file.type) == -1) {
//alert('Error : Incorrect file type');
setSuccessMsg("Incorrect file type")
//alert.show("Incorrect file type",{type: 'error',position:"top right",containerStyle:{zIndex: 4}})
return;
}

if(file.size > allowed_size_mb*1024*1024) {
//alert('Error : Exceeded size');
setSuccessMsg("Size limit of 2mb Exceeded")
//alert.show("Size limit of 1mb Exceeded",{type: 'error',position:"top right"})
return;
}
  //alert("on change for loading files")
  if (!file)
  return;

  // 
  setSuccessMsg(null)
  setUploading(true)
  //this.createImage(files[0]);
  let reader = new FileReader();
  reader.onload = (e) => {
  //setImage(reader.result)
  //console.log(reader.result)

  };
  reader.readAsDataURL(file);

  let data = new FormData();

  data.append("file",file);
  
  axios.request( {
      method: "post", 
      url: API_URL+"photo/upload", 
      data: data, 
      onUploadProgress: (p) => {
         setUploadProgress(prevProgress=>prevProgress+Math.round((100 * p.loaded) / p.total))
         //console.log("upload progress",p.total/p.loaded)
      }


    }).then (response => {
      updateGallery([])
      //setHasMore(true)
        // updateGallery(prevGallery=>[
        //   ...prevGallery,...response.data.data.data.data
        // ])

        // setPagination(prevArticle=>{
        //   return {...prevArticle,...response.data.data.data}
        // })
        //alert.show("Success",{type: 'success'})
        //console.log("Adding new image",response.data.data.data)
        //  updateGallery(prevGallery=>[
        //   ...prevGallery,response.data.data.data
        // ])
        //fetchGallery()
        
        let imageBig=PUBLIC_URL+response.data.data.data.img_big
        setSelectedImage(imageBig)
        setSelectedImageId(response.data.data.data.id)
        setFileType(response.data.data.data.file_type)
        setFileName(response.data.data.data.file_original_name)
        setFileSize(response.data.data.data.file_size)
        setFileUploadedOn(response.data.data.data.created_at)
       updateGallery(prevGallery=> [response.data.data.data,...gallery])

        setPagination(response.data.data.pagination)
        console.log("Added new image",gallery)
        setUploading(false)
        
    }).catch(error => {
      setUploading(false)
      if(error.response){
        if(error.response.status){
             switch(error.response.status) {
          case 500:
              alert.show(error.response.statusText,{type: 'error'})
            break;
            case 401:
              //alert.show("Token error",{type:'notice'})
              // setAuthModal(true)
              // setLoginAction(prevArticle=>{
              //   return {...prevArticle,func:fetchArticleByIdApi,params:id}
              // })
              
            break;
          default:
              !error.response ? setSuccessMsg("Server currently down"):
              setSuccessMsg(error.response.statusText)
        }     
        }else{
          setSuccessMsg("Server currently down")
        }
      }else{
        setSuccessMsg("Invalid response")
      }
      // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
      // setErrors(prevError=>[...prevError,apiStatus])
      
  });
}


    
    return (
        <>
      
      <CModal
      size="lg"
        show={modal}
        onClose={()=>{setModal(!modal); setSuccessMsg(null)}}
      >
        <CModalHeader closeButton>
        
          <h3>Gallery</h3>  
          </CModalHeader>
        <CModalBody>
          <CRow>
              <CCol md="8">
                {
              <>
                    {
                
           gallery.length ?
          <InfiniteScroll
          dataLength={gallery.length}
          next={()=>LoadMore()}
          hasMore={hasMore}
          loader={""}
         
          scrollableTarget="scrollableDiv"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b></b>
            </p>
          }
        >
        {/* <div className="row"> */}

                 <div className="container">
                    <div className="container" id="scrollableDiv" style={{overflowY:"auto",height:"370px"}}>
                      <div className="d-flex flex-row flex-wrap align-items-start">
          {

            

        gallery.length  && gallery.map((val, k) => {

        let imgSmall=PUBLIC_URL+val.img_small
        let imageBig=PUBLIC_URL+val.img_big

        //alert("check")
          return (
          <div className="col-md-4" style={{padding:"1em",cursor:"pointer"}} key={k}>
              <img src={imgSmall} className={'img-thumbnail'} onClick={() => {
        //let imageSource=document.getElementById("modal-selected-image").src.value=val
                setSelectedImage(imageBig)
                setSelectedImageId(val.id)
                setFileType(val.file_type)
                setFileName(val.file_original_name)
                setFileSize(val.file_size)
                setFileUploadedOn(val.created_at)
              }} />
          </div>
          )
          })
          
          }

          {/* </div> */}
                </div>
                </div>
            </div>
        </InfiniteScroll> :""


                    }




               
            </>
        
                  
              

             
                 
                }
                
                
                {/* {gallery.length ? "Showing ":<h3>No images found</h3> } 
                <b>{gallery.length ? pagination.from:""}</b>-<b>{gallery.length ? pagination.to:""}</b> {gallery.length ? "results of":""} <b>{gallery.length ? Math.ceil(pagination.total/pagination.per_page): ""  } {gallery.length ? "pages":""}</b>  */}
                 {hasMore ? <b>(scroll down for more images)</b>:""}
                

              </CCol>


              <CCol md="4">
              <img  className={'img-fluid'} id="modal-selected-image" src={selectedImage!==""?selectedImage:""} />

              {selectedImage!=="" && <p align="center" id="acpb_ft_rm_fr"><a href="" style={Styles.link} id="acpb_del_ft" className="acpb_featured_delete" style={{color:"red",textDecoration:"underline"}} onClick={(e)=>{ e.preventDefault(); deletePhoto()} }>delete</a></p>} 

              {selectedImage!=="" && 
              <>
              <p><b>File name:</b> {fileName}</p>
              <p><b>File type:</b> {fileType}</p>
              <p><b>File size:</b> {fileSize}kb</p>
              <p><b>Uploaded on:</b> {fileUploadedOn}</p>
              
              </>}
              </CCol>
          </CRow>
          <CRow className="d-flex flex-row justify-content-center">
              {/* <CCol md="8">Left</CCol>
              <CCol md="4">Right</CCol> */}
              
              <CCol md="4">
              <br />
              <br />
              <input id="modal-upload-input" type="file"  hidden={true} onChange={(e)=>onChange(e)} />
            
                
                     <CButton id="modal-upload-bt" color="primary" size="md" block md="12">
                     { uploading ? <><span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      &nbsp; Uploading...</> :
                       "Add IMage" }
                       </CButton>
              
              
              {/* ({uploadProgress}% uploaded) */}
              <CProgress className="progress-xs" color="success" value={uploadProgress} />
              {successMsg!==null && <b style={{color:"red"}} >{successMsg}</b>}
              </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={()=>{
            
            if(featuredFor!=="") {
              //setting featured image
              setModal(prev=>!prev)
              //console.log("selected Image",selectedImage)
              //console.log("Featured For",featuredFor)
              if(featuredFor=="acpb_en_ft"){
                updateArticle("featured_en",selectedImage)
                setSelectedImageEn(selectedImage)
              }else{
                updateArticle("featured_fr",selectedImage)
                setSelectedImageFr(selectedImage)
              }
              
               
            }else{
              //setting featured image
              setModal(prev=>!prev)
              selectedImage!=="" && setSelectedImageGlobal(selectedImage)

            }
            
            }}>OK</CButton>{' '}

          <CButton
            color="secondary"
            onClick={()=>{setModal(!modal); setSuccessMsg(null)}}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    </>
           
      )

}



export default ModalMe