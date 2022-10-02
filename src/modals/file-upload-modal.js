import React, { useContext, useEffect, useState } from "react";
import {
  CModal,
  CModalHeader,
  CButton,
  CModalBody,
  CModalFooter,
  CRow,
  CCol,
  CProgress,
} from "@coreui/react";
import ArticleProvider from "../context/ArticleContext";
import GalleryProvider from "../context/GalleryContext";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useAlert } from "react-alert";
import authHeader from "../services/auth-header";
import urlService from "../services/url-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const API_URL = urlService().baseUrl;

const PUBLIC_URL = urlService().publicUrl;

const Styles = {
  link: {
    textDecoration: "underline",
    fontSize: "11px",
    color: "green",
  },
  Titles: {
    color: "black",
  },
  Theme: {
    background: "rgb(250, 252, 255)",
  },
};

const initialSelectedFile = {
  image: null,
  id: null,
  fileType: null,
  fileName: null,
  fileSize: null,
  fileUploadedOn: null,
};

const ModalMeFile = ({ openModal }) => {
  const {
    // initialLoginAction,
    // setLoginAction,
    // setAuthModal,
    // selectedImageGlobal,
    // setSelectedImageGlobal,
    updateArticle,
    // featuredFor,
    // setSelectedImageEn,
    // setSelectedImageFr,
    modal,
    setModal,
  } = useContext(ArticleProvider.Context);
  const { uploadProgress, setUploadProgress } = useContext(
    GalleryProvider.Context
  );
  const alert = useAlert();
  const [gallery, updateFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(initialSelectedFile);
  const [pagination, setPagination] = useState({});
  const [hasMore, setHasMore] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  //const [loginAction,setLoginAction] =useState(initialLoginAction)

  let loadMore = false;

  //let selectedImageIdv = null;

  const triggerSelectInput = (e, input) => {
    e.preventDefault();
    input.click();
  };

  useEffect(() => {
    const uploadBt = document.getElementById("modal-upload-bt");
    const uploadInput = document.getElementById("modal-upload-input");
    uploadBt.addEventListener("click", (e) =>
      triggerSelectInput(e, uploadInput)
    );
    fetchFiles();
  }, []);

  useEffect(() => {
    if (pagination.next_page_url && pagination.next_page_url !== null) {
      setHasMore(true);
      //alert.show(pagination.next_page_url,{type: 'error',position:"bottom center"})
    } else {
      setHasMore(false);
    }
  }, [pagination]);

  useEffect(() => {
    //selectedImageIdv = selectedImage.id;
  }, [selectedFile.id]);

  const updateSelectedFile = (data) => {
    const newSelectedImage = {
      image: PUBLIC_URL + data.img_big,
      id: data.id,
      fileType: data.file_type,
      fileName: data.file_original_name,
      fileSize: data.file_size,
      fileUploadedOn: data.created_at,
    };
    setSelectedFile(newSelectedImage);
  };

  const fetchFiles = (id) => {
    updateFiles([]);
    setSelectedFile(initialSelectedFile);
    axios
      .request({
        method: "get",
        url: API_URL + "resources/" + id,
        // data: data,
        onUploadProgress: (p) => {
          setUploadProgress(
            (prevProgress) =>
              prevProgress + Math.round((100 * p.loaded) / p.total)
          );
          //console.log("upload progress",p.total/p.loaded)
        },
      })
      .then((response) => {
        //console.log("response file name",response.data.data.data.data)

        updateFiles((prevGallery) => [
          ...prevGallery,
          ...response.data.data.data.data,
        ]);

        setPagination((prevArticle) => {
          return { ...prevArticle, ...response.data.data.data };
        });

        // console.log("initial api fetch",response)
      });
  };

  const deleteFile = () => {
    //updateGallery([])
    //setLoginAction(initialLoginAction);

    axios
      .get(API_URL + "resource/delete/" + selectedFile.id, {
        headers: authHeader(),
      })
      .then((response) => {
        //fetchGallery()
        const newList = gallery.filter((item) => item.id !== selectedFile.id);
        updateFiles(newList);
        setSelectedFile(initialSelectedFile);

        console.log("delete image response", response);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                alert.show("Token error", { type: "notice" });
                //setAuthModal(true);
                // setLoginAction((prevArticle) => {
                //   return {
                //     ...prevArticle,
                //     func: deletePhoto,
                //     params: selectedFile.id,
                //   };
                // });

                break;
              default:
                !error.response
                  ? setSuccessMsg("Server currently down")
                  : setSuccessMsg(error.response.statusText);
            }
          } else {
            setSuccessMsg("Server currently down");
          }
        } else {
          setSuccessMsg("Invalid response");
        }
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const LoadMore = () => {
    pagination.next_page_url == null && setHasMore(false);

    pagination.next_page_url !== null &&
      axios
        .request({
          method: "get",
          url: pagination.next_page_url,
        })
        .then((response) => {
          //console.log("response file name",response.data.data.data.data)

          updateFiles((prevGallery) => [
            ...prevGallery,
            ...response.data.data.data.data,
          ]);

          setPagination((prevArticle) => {
            return { ...prevArticle, ...response.data.data.data };
          });

          // console.log("initial api fetch",response)
        });
  };

  const onChange = (e) => {
    //console.log(e.target.value)
    setUploadProgress(0);
    let file = null;
    file = e.target.files[0] || e.dataTransfer.files[0];
    e.target.value = "";
    let allowed_mime_types = ["xls", "xlsx", "pdf", "doc", "docx"];
    let allowed_size_mb = 2;
    // alert.show(file.type, {
    //   type: "success",
    //   position: "bottom center",
    // });
    if (allowed_mime_types.indexOf(file.type.toLowerCase()) !== -1) {
      //alert('Error : Incorrect file type');
      setSuccessMsg("Incorrect file type");
      //alert.show("Incorrect file type",{type: 'error',position:"top right",containerStyle:{zIndex: 4}})
      return;
    }

    if (file.size > allowed_size_mb * 10024 * 10024) {
      //alert('Error : Exceeded size');
      setSuccessMsg("Size limit of 2mb Exceeded");
      //alert.show("Size limit of 1mb Exceeded",{type: 'error',position:"top right"})
      return;
    }
    //alert("on change for loading files")
    if (!file) return;

    //alert("here we are");

    //
    setSuccessMsg(null);
    setUploading(true);
    //this.createImage(files[0]);
    let reader = new FileReader();
    reader.onload = (e) => {
      //setImage(reader.result)
      //console.log(reader.result)
    };
    reader.readAsDataURL(file);

    let data = new FormData();

    data.append("file", file);

    axios
      .request({
        method: "post",
        url: API_URL + "resource",
        data: data,
        onUploadProgress: (p) => {
          setUploadProgress(
            (prevProgress) =>
              prevProgress + Math.round((100 * p.loaded) / p.total)
          );
          //console.log("upload progress",p.total/p.loaded)
        },
      })
      .then((response) => {
        updateFiles([]);
        updateSelectedFile(response.data.data.data);
        updateFiles((prevGallery) => [response.data.data.data, ...gallery]);

        setPagination(response.data.data.pagination);
        //console.log("Added new resource", gallery);
        setUploading(false);
      })
      .catch((error) => {
        setUploading(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                // setAuthModal(true)
                // setLoginAction(prevArticle=>{
                //   return {...prevArticle,func:fetchArticleByIdApi,params:id}
                // })

                break;
              default:
                !error.response
                  ? setSuccessMsg("Server currently down")
                  : setSuccessMsg(error.response.statusText);
            }
          } else {
            setSuccessMsg("Server currently down");
          }
        } else {
          setSuccessMsg("Invalid response");
        }
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  return (
    <>
      <CModal
        size="lg"
        show={openModal}
        onClose={() => {
          setModal(!openModal);
          setSuccessMsg(null);
        }}
      >
        <CModalHeader closeButton>
          <h3>Files</h3>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="8">
              {
                <>
                  {gallery.length ? (
                    <InfiniteScroll
                      dataLength={gallery.length}
                      next={() => LoadMore()}
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
                        <div
                          className="container"
                          id="scrollableDiv"
                          style={{ overflowY: "auto", height: "370px" }}
                        >
                          <div className="d-flex flex-row flex-wrap align-items-start">
                            {gallery.length &&
                              gallery.map((val, k) => {
                                let imgSmall = PUBLIC_URL + val.img_small;
                                let imageBig = PUBLIC_URL + val.img_big;

                                //alert("check")
                                return (
                                  <div
                                    className="row"
                                    style={{
                                      padding: "1em",
                                      cursor: "pointer",
                                    }}
                                    key={k}
                                  >
                                    {/* <img
                                      src={imgSmall}
                                      className={
                                        selectedFile.id !== null &&
                                        selectedFile.id == val.id
                                          ? "img-thumbnail border border-primary"
                                          : "img-thumbnail"
                                      }
                                      onClick={() => {
                                        updateSelectedFile(val);
                                      }}
                                    /> */}
                                    <div className="col-md-3">
                                      <img
                                        width="40px"
                                        src="https://afrilabs-capacity.com/images/file_icons/pdf.png"
                                      />
                                    </div>
                                    <div className="col-md-9">
                                      <div className="row">
                                        <div className="col-md-8">
                                          <p>Day 1 of 2020 AfHLW Series 2 </p>
                                        </div>
                                        <div className="col-md-4">
                                          <span>
                                            <FontAwesomeIcon
                                              style={{
                                                color: "red",
                                                cursor: "pointer",
                                              }}
                                              icon={faTimes}
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}

                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </InfiniteScroll>
                  ) : (
                    ""
                  )}
                </>
              }

              {/* {gallery.length ? "Showing ":<h3>No images found</h3> } 
                <b>{gallery.length ? pagination.from:""}</b>-<b>{gallery.length ? pagination.to:""}</b> {gallery.length ? "results of":""} <b>{gallery.length ? Math.ceil(pagination.total/pagination.per_page): ""  } {gallery.length ? "pages":""}</b>  */}
              {hasMore ? <b>(scroll down for more images)</b> : ""}
            </CCol>

            {/* <CCol md="4">
              <img
                className={"img-fluid"}
                id="modal-selected-image"
                src={selectedFile.image !== null ? selectedFile.image : ""}
              />

              {selectedFile.image !== null && (
                <p align="center" id="acpb_ft_rm_fr">
                  <a
                    href=""
                    style={Styles.link}
                    id="acpb_del_ft"
                    className="acpb_featured_delete"
                    style={{ color: "red", textDecoration: "underline" }}
                    onClick={(e) => {
                      e.preventDefault();
                      deletePhoto();
                    }}
                  >
                    delete
                  </a>
                </p>
              )}

              {selectedFile.image !== null && (
                <>
                  <p>
                    <b>File name:</b> {selectedFile.fileName}
                  </p>
                  <p>
                    <b>File type:</b> {selectedFile.fileType}
                  </p>
                  <p>
                    <b>File size:</b> {selectedFile.fileSize}kb
                  </p>
                  <p>
                    <b>Uploaded on:</b> {selectedFile.fileUploadedOn}
                  </p>
                  <p>
                    <b>Uploaded on:</b> {selectedFile.id}
                  </p>
                </>
              )}
            </CCol> */}
          </CRow>
          <CRow className="d-flex flex-row justify-content-center">
            {/* <CCol md="8">Left</CCol>
              <CCol md="4">Right</CCol> */}

            <CCol md="4">
              <br />
              <br />
              <input
                id="modal-upload-input"
                type="file"
                hidden={true}
                onChange={(e) => onChange(e)}
              />

              <CButton
                id="modal-upload-bt"
                color="primary"
                size="md"
                block
                md="12"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    &nbsp; Uploading...
                  </>
                ) : (
                  "Add IMage"
                )}
              </CButton>

              {/* ({uploadProgress}% uploaded) */}
              <CProgress
                className="progress-xs"
                color="success"
                value={uploadProgress}
              />
              {successMsg !== null && (
                <b style={{ color: "red" }}>{successMsg}</b>
              )}
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => null}>
            OK
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => {
              setModal(!openModal);
              setSuccessMsg(null);
            }}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ModalMeFile;
