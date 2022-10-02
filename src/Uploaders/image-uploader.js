import React, { useEffect, useContext } from "react";
import ArticleProvider from "../context/ArticleContext";

const API_URL = "http://192.168.43.122:8080/laravel/site40/public/api/v1/";

const PUBLIC_URL = "http://192.168.43.122:8080/laravel/site40/public/";

const ImageUpload = ({ postType, target }) => {
  const {
    updateArticle,
    setFeaturedFor,
    setModal,
    selectedImageEn,
    selectedImageFr,
    setSelectedImageEn,
    setSelectedImageFr,
  } = useContext(ArticleProvider.Context);

  //console.log("target",target)

  const triggerSelectInput = (e, input, id) => {
    e.preventDefault();
    setFeaturedFor(id);
    setModal(true);
  };
  
  

  useEffect(() => {
    const uploadBt = document.getElementsByClassName(target);
    //console.log("target", target);
    const uploadInputName = "modal-upload-bt";
    //postType=="en" ? "upload_input_en" : "upload_input_fr"
    const uploadInput = document.getElementById(uploadInputName);
    //console.log("elements id is ",uploadBt[0].id)

    //We attach click handlers to our image selection element for delete action
    document.addEventListener("click", (e) => {
      if (
        e.target.tagName == "A" &&
        e.target.classList.contains("acpb_featured_en_remove")
      ) {
        e.preventDefault();

        //Global store for selected image at any time, used in multiple locatins
        setSelectedImageEn("");
        //Reset featured for selected article
        updateArticle("featured_en", null);
      }
    });

    ///select anchor link with class name acpb_featured_fr_remove
    document.addEventListener("click", (e) => {
      if (
        e.target.tagName == "A" &&
        e.target.classList.contains("acpb_featured_fr_remove")
      ) {
        e.preventDefault();
        setSelectedImageFr("");
        updateArticle("featured_fr", null);
      }
    });

    //we only have two classes on the post pages for image selection, uploadBt retuens an array of both elements
    uploadBt[0].addEventListener("click", (e) =>
      triggerSelectInput(e, uploadInput, uploadBt[0].id)
    );
    uploadBt[1].addEventListener("click", (e) =>
      triggerSelectInput(e, uploadInput, uploadBt[1].id)
    );
  }, []);

  //return image box based on language prop passed (english or french)
  return postType == "en" ? (
    <img className="img-fluid" src={selectedImageEn} />
  ) : (
    <img className="img-fluid" src={selectedImageFr} />
  );
};

export default ImageUpload;
