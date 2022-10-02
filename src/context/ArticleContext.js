import React, { createContext, useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useAlert } from "react-alert";
import authHeader from "../services/auth-header";
import urlService from "../services/url-service";

const API_URL = urlService().baseUrl;

const Context = createContext({});

const initialArticle = {
  id: null,
  title_en: "",
  body_en: null,
  featured_en: null,
  title_fr: "",
  body_fr: null,
  featured_fr: null,
  status: "draft",
  category: "",
  activity_id: "",
  created_at: null,
  updated_at: null,
};

const initialEditArticle = {
  id: null,
  title_en: "",
  body_en: null,
  featured_en: null,
  title_fr: "",
  body_fr: null,
  featured_fr: null,
  status: "draft",
  category: "",
  activity_id: "",
  created_at: null,
  updated_at: null,
};

const initialLoginAction = { func: null, params: null };

const Provider = (props) => {
  // Initial values are obtained from the props
  const history = useHistory();

  const { id } = useParams();

  const location = useLocation();

  const alert = useAlert();

  let errorCount;

  const {
    // article:initialArticle,
    children,
  } = props;

  // Use State to keep the values
  const [article, setArticle] = useState(initialArticle);
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [toast, setToast] = useState(false);
  const [toastType, setToastType] = useState("error");
  const [modal, setModal] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedImageEn, setSelectedImageEn] = useState("");
  const [selectedImageFr, setSelectedImageFr] = useState("");
  const [selectedImageGlobal, setSelectedImageGlobal] = useState("");
  const [featuredFor, setFeaturedFor] = useState("");
  const [editMode, setEditMode] = useState("new");
  const [currentArticle, setCurrentArticle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchingFailMsg, setFetchingFailMsg] = useState(null);
  const [loginAction, setLoginAction] = useState(initialLoginAction);
  const [apiAction, setApiAction] = useState(false);

  // const [featuredFor,setFeaturedFor]=useState("")

  useEffect(() => {
    //console.log("id",id)
    updateFeatured();
    console.log("articles rebuilt", articles[0]);
    console.log("pagination rebuilt", pagination);
    console.log("article rebuilt", article);
  }, [article, articles, pagination]);

  const KeysToErrorArray = (errors) => {
    Object.keys(errors).map((key, index) =>
      setErrors((prevError) => [...prevError, errors[key]])
    );
  };

  const updateArticle = (dataKey, data) => {
    //console.log("data key", dataKey)
    return setArticle((prevState) => {
      let newState = { ...prevState, [dataKey]: data };
      return newState;
    });
  };

  const updateFeatured = () => {
    //console.log("data key", dataKey)
    article.featured_en !== null && setSelectedImageEn(article.featured_en);

    article.featured_fr !== null && setSelectedImageFr(article.featured_fr);
  };

  const resetArticle = () => {
    setArticle(initialArticle);
    setSelectedImageEn("");
    setSelectedImageFr("");
    setCurrentArticle("");
    setFeaturedFor("");
    setToast(false);
  };

  const resetEditArticle = () => {
    setArticle(initialEditArticle);
  };

  const validateArticle = () => {
    setErrors([]);
    setToast(false);
    errorCount = 0;
    let tmpErrors = [];
    if (article.status == "published") {
      if (article.title_en == "") {
        tmpErrors.push(
          "Please enter article title (english) before publishing as (published status)"
        );
        errorCount++;
      }

      if ((article.body_en == null) & (article.type == "dash")) {
        tmpErrors.push(
          "Please enter article body (english) before publishing as (published status)"
        );
        errorCount++;
      }

      if (article.category == "") {
        tmpErrors.push(
          "Please select category before publishing as (published status)"
        );
        errorCount++;
      }
    }

    if (article.status == "draft") {
      if (article.title_en == "") {
        tmpErrors.push(
          "Please enter article title (english) before publishing as (draft status)"
        );
        errorCount++;
      }
    }

    errorCount > 0 && setErrors((prevError) => [...prevError, ...tmpErrors]);

    editMode == "new" && errorCount == 0 && publishArticleApi();

    editMode == "update" && errorCount == 0 && updateArticleApi();
  };

  const publishArticleApi = () => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);

    axios
      .request({
        method: "post",
        headers: authHeader(),
        url: API_URL + "post/new",
        data: article,
      })
      .then((response) => {
        // updateGallery([])
        //   updateGallery(prevGallery=>[
        //     ...prevGallery,...response.data.data.data.data
        //   ])
        setEditMode("update");
        alert.show("New article created", { type: "success" });
        history.replace({
          pathname: "/posts/edit/" + response.data.data.data.id,
          //search: '?query=abc',
          id: response.data.data.data.id,
          state: {
            id: response.data.data.data.id,
            navType: "post_save",
            data: response.data.data.data,
          },
        });
        console.log("post response", response.data.data.data.id);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 422:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 409:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                setAuthModal(true);
                setLoginAction((prevArticle) => {
                  return { ...prevArticle, func: validateArticle };
                });
                break;
              default:
                !error.response
                  ? alert.show("Server currently down", { type: "error" })
                  : alert.show(error.response.statusText, { type: "error" });
            }
          } else {
            alert.show("Server currently down", { type: "error" });
          }
        } else {
          alert.show("Invalid response", { type: "error" });
        }
      });
  };

  const updateArticleApi = () => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);

    axios
      .request({
        method: "post",
        headers: authHeader(),
        url: API_URL + "post/update",
        data: article,
      })
      .then((response) => {
        setEditMode("update");
        alert.show("Article Updated", { type: "success" });
        console.log("post response", response.data.data.data.id);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 422:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 409:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                setAuthModal(true);
                setLoginAction((prevArticle) => {
                  return { ...prevArticle, func: validateArticle };
                });
                break;
              default:
                !error.response
                  ? alert.show("Server currently down", { type: "error" })
                  : alert.show(error.response.statusText, { type: "error" });
            }
          } else {
            alert.show("Server currently down", { type: "error" });
          }
        } else {
          alert.show("Invalid response", { type: "error" });
        }
      });
  };

  const fetchArticleByIdApi = (id) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);

    authHeader() !== "" &&
      axios
        .get(API_URL + "post/" + id, { headers: authHeader() })
        .then((response) => {
          setArticle((prevArticle) => {
            return { ...prevArticle, ...response.data.data.data };
          });

          console.log("post response", response.data.data.data);
          console.log("all articles", articles);
          setApiAction(false);
        })
        .catch((error) => {
          setErrors([]);
          setApiAction(false);
          if (error.response) {
            if (error.response.status) {
              switch (error.response.status) {
                case 500:
                  alert.show(error.response.statusText, { type: "error" });
                  break;
                case 401:
                  //alert.show("Token error",{type:'notice'})
                  setAuthModal(true);
                  setLoginAction((prevArticle) => {
                    return {
                      ...prevArticle,
                      func: fetchArticleByIdApi,
                      params: id,
                    };
                  });

                  break;
                default:
                  !error.response
                    ? alert.show("Server currently down", { type: "error" })
                    : alert.show(error.response.statusText, { type: "error" });
              }
            } else {
              alert.show("Server currently down", { type: "error" });
            }
          } else {
            alert.show("Invalid response", { type: "error" });
          }
          // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
          // setErrors(prevError=>[...prevError,apiStatus])
        });
  };

  const deleteArticleApi = (id) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    //setUsers([])

    axios
      .get(API_URL + "post/delete/" + id, { headers: authHeader() })
      .then((response) => {
        // setUsers(prevArticle=>{
        //   return {...prevArticle,...response.data.data.data}
        // })

        // setPagination(prevArticle=>{
        //   return {...prevArticle,...response.data.data.data}
        // })
        alert.show("Article Deleted", { type: "success" });
        const newList = articles.filter((item) => item.id !== id);
        setArticles(newList);

        //
        console.log("post response", response.data.data.data);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                error.response.data.code == "402" &&
                  alert.show(error.response.data.status);
                if (!error.response.data.code) {
                  setAuthModal(true);
                  setLoginAction((prevArticle) => {
                    return {
                      ...prevArticle,
                      func: deleteArticleApi,
                      params: id,
                    };
                  });
                }

                break;
              default:
                !error.response
                  ? alert.show("Server currently down", { type: "error" })
                  : alert.show(error.response.statusText, { type: "error" });
            }
          } else {
            alert.show("Server currently down", { type: "error" });
          }
        } else {
          //alert.show("Invalid response",{type: 'error'})
        }
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const fetchArticlesApi = () => {
    setArticles([]);
    setFetching(true);
    setFetchingFailMsg(null);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);

    //alert("Hi there man")

    axios
      .get(API_URL + "posts", { headers: authHeader() })
      .then((response) => {
        setArticles((prevArticle) => {
          return [...prevArticle, ...response.data.data.data.data];
        });

        setPagination((prevArticle) => {
          return { ...prevArticle, ...response.data.data.data };
        });

        !response.data.data.data.data.length &&
          setFetchingFailMsg("No articles found");

        setFetching(false);
        console.log("post response all articles", response.data.data.data);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setFetching(false);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                setAuthModal(true);
                setFetchingFailMsg("Waiting for authorization...");
                setLoginAction((prevArticle) => {
                  return { ...prevArticle, func: fetchArticlesApi };
                });
                break;
              default:
                !error.response
                  ? alert.show("Server currently down", { type: "error" })
                  : alert.show(error.response.statusText, { type: "error" });
            }
          } else {
            alert.show("Server currently down", { type: "error" });
          }
        } else {
          alert.show("Invalid response", { type: "error" });
        }
        // error.response!==undefined ? setFetchingFailMsg("No articles found") : setFetchingFailMsg("Unknown error")
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const goToPageApi = (page) => {
    setArticles([]);
    setCurrentPage(page);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);
    setFetchingFailMsg(null);

    axios
      .get(pagination.path + "?page=" + page, { headers: authHeader() })
      .then((response) => {
        setArticles((prevArticle) => {
          return [...prevArticle, ...response.data.data.data.data];
        });

        setPagination((prevArticle) => {
          return { ...prevArticle, ...response.data.data.data };
        });

        console.log("post response all articles", response.data.data.data);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                setFetchingFailMsg("No articles found");
                setAuthModal(true);
                setLoginAction((prevArticle) => {
                  return { ...prevArticle, func: goToPageApi };
                });
                break;
              default:
                !error.response
                  ? alert.show("Server currently down", { type: "error" })
                  : alert.show(error.response.statusText, { type: "error" });
            }
          } else {
            alert.show("Server currently down", { type: "error" });
          }
        } else {
          alert.show("Invalid response", { type: "error" });
        }
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const searchByPhraseApi = () => {
    setArticles([]);
    setFetching(true);
    setFetchingFailMsg(null);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);

    axios
      .get(API_URL + "post/search/" + searchPhrase, { headers: authHeader() })
      .then((response) => {
        setArticles((prevArticle) => {
          return [...prevArticle, ...response.data.data.data.data];
        });

        setPagination((prevArticle) => {
          return { ...prevArticle, ...response.data.data.data };
        });

        setFetching(false);
        !response.data.data.data.length &&
          setFetchingFailMsg("No results found...");
        // alert(JSON.stringify(response.data) )
        console.log("get response", response.data.data.data);
        setApiAction(false);
        //console.log("all articles",articles)
      })
      .catch((error) => {
        setErrors([]);
        setFetching(false);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                setAuthModal(true);
                setLoginAction((prevArticle) => {
                  return { ...prevArticle, func: searchByPhraseApi };
                });
                break;
              default:
                !error.response
                  ? alert.show("Server currently down", { type: "error" })
                  : alert.show(error.response.statusText, { type: "error" });
            }
          } else {
            alert.show("Server currently down", { type: "error" });
          }
        } else {
          alert.show("Invalid response", { type: "error" });
        }
        //alert(JSON.stringify(error.response))
        // error.response!==undefined ? setFetchingFailMsg("No articles found") : setFetchingFailMsg("Unknown error")
      });
  };

  const articleContext = {
    article,
    articles,
    updateArticle,
    toast,
    setToast,
    modal,
    setModal,
    errors,
    validateArticle,
    selectedImageFr,
    selectedImageEn,
    setSelectedImageEn,
    setSelectedImageFr,
    setFeaturedFor,
    selectedImageGlobal,
    setSelectedImageGlobal,
    featuredFor,
    editMode,
    setCurrentArticle,
    setArticle,
    setEditMode,
    resetArticle,
    resetEditArticle,
    initialEditArticle,
    toastType,
    setToastType,
    fetchArticleByIdApi,
    fetchArticlesApi,
    pagination,
    goToPageApi,
    currentPage,
    searchPhrase,
    setSearchPhrase,
    searchByPhraseApi,
    setCurrentPage,
    fetching,
    fetchingFailMsg,
    authModal,
    setAuthModal,
    loginAction,
    apiAction,
    setApiAction,
    deleteArticleApi,
    initialLoginAction,
    setLoginAction,
  };

  // pass the value in provider and return
  return (
    <Context.Provider value={articleContext} {...props}>
      {children}
    </Context.Provider>
  );
};

const ArticleProvider = {
  Provider,
  Context,
};

Provider.propTypes = {
  article: PropTypes.object,
};

Provider.defaultProps = {
  article: {
    title_en: "",
    body_en: null,
    featured_en: null,
    title_fr: "",
    body_fr: null,
    featured_fr: null,
    status: "draft",
  },
};

export default ArticleProvider;
