import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import authHeader from "../services/auth-header";

import urlService from "../services/url-service";

const API_URL = urlService().baseUrl;

const Context = createContext({});

const initialLoginAction = { func: null, params: null };

const initialSubActivityPayload = {
  name: "",
  activity_id: "",
};

const Provider = (props) => {
  const alert = useAlert();
  const [authModal, setAuthModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [apiAction, setApiAction] = useState(false);
  const [loginAction, setLoginAction] = useState(initialLoginAction);
  const [activities, setActivities] = useState([]);
  const [subActivities, setSubActivities] = useState([]);
  const [activitiesCount, setActivitiesCount] = useState(0);

  // const updateSubActivityPayload = (dataKey, data) => {
  //   //console.log("data key", dataKey)
  //   return setSubActivityPayload((prevState) => {
  //     let newState = { ...prevState, [dataKey]: data };
  //     return newState;
  //   });
  // };

  useEffect(() => {
    //alert("activity context");
    fetchActivityCategoriesApi();
  }, []);

  useEffect(() => {
    //alert("activity context");
    //alert.show("sub payload changed");
  }, []);

  // useEffect(() => {
  //   setActivitiesCount((count) => count + 1);
  //   console.log("activities response" + activitiesCount, activities);
  // }, [activities]);

  const KeysToErrorArray = (errors) => {
    Object.keys(errors).map((key, index) =>
      setErrors((prevError) => [...prevError, errors[key]])
    );
  };

  const addActivityApi = (activitydata) => {
    setErrors([]);
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);

    axios
      .request({
        method: "post",
        headers: authHeader(),
        url: API_URL + "activity/new",
        data: activitydata,
      })
      .then((response) => {
        fetchActivityCategoriesApi();
        alert.show("New activity created!", { type: "success" });
        //fetchUsersApi();
        setApiAction(false);
        //   console.log("post response",response.data.data.data.id)
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
                error.response.data.code == "402" &&
                  alert.show(error.response.data.status);
                if (!error.response.data.code) {
                  setAuthModal(true);
                  setLoginAction((prevArticle) => {
                    return {
                      ...prevArticle,
                      func: addActivityApi,
                      params: activitydata,
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
          alert.show("Invalid response", { type: "error" });
        }
      });
  };

  const addSubActivityApi = (activitydata) => {
    setErrors([]);
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    //setFetchingFailMsg(null);
    // setErrors(prevErrors=>[...prevErrors,"ready to add user"])

    axios
      .request({
        method: "post",
        headers: authHeader(),
        url: API_URL + "activity/sub/new",
        data: activitydata,
      })
      .then((response) => {
        fetchActivityCategoriesApi();
        alert.show("New sub activity created!", { type: "success" });
        //fetchUsersApi();
        setApiAction(false);
        //   console.log("post response",response.data.data.data.id)
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
                error.response.data.code == "402" &&
                  alert.show(error.response.data.status);
                if (!error.response.data.code) {
                  setAuthModal(true);
                  setLoginAction((prevArticle) => {
                    return {
                      ...prevArticle,
                      func: addSubActivityApi,
                      params: activitydata,
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
          alert.show("Invalid response", { type: "error" });
        }
      });
  };

  const fetchActivityCategoriesApi = () => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    setActivities([]);
    //setUsers([])

    axios
      .get(API_URL + "activities", { headers: authHeader() })
      .then((response) => {
        setActivities((prevArticle) => {
          return [...prevArticle, ...response.data.data];
        });

        // setPagination(prevArticle=>{
        //   return {...prevArticle,...response.data.data.data}
        // })
        //alert.show(response.data, { type: "success" });
        //const newList = articles.filter((item) => item.id !== id);
        //setArticles(newList);

        //
        //console.log("activities response", activities);
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
                      func: fetchActivityCategoriesApi,
                      //params: id,
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

  const fetchSubActivityByActivityId = (id) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    setSubActivities([]);
    //setUsers([])

    axios
      .get(API_URL + "activity/subs/" + id, { headers: authHeader() })
      .then((response) => {
        setSubActivities((prevArticle) => {
          return [...prevArticle, ...response.data.data];
        });

        // setPagination(prevArticle=>{
        //   return {...prevArticle,...response.data.data.data}
        // })
        //alert.show(response.data, { type: "success" });
        //const newList = articles.filter((item) => item.id !== id);
        //setArticles(newList);

        //
        //console.log("activities response", activities);
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
                      func: fetchSubActivityByActivityId,
                      //params: id,
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

  const deleteActivity = (id) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    //setUsers([])
    //alert.show(id);

    axios
      .get(API_URL + "activity/delete/" + id, { headers: authHeader() })
      .then((response) => {
        alert.show("Activity Deleted", { type: "success" });
        const newList = activities.filter((item) => item.id !== id);
        setActivities(newList);

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
                      func: deleteActivity,
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

  const deleteSubActivity = (id) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    //setUsers([])
    //alert.show(id);

    axios
      .get(API_URL + "activity/sub/delete/" + id, {
        headers: authHeader(),
      })
      .then((response) => {
        fetchActivityCategoriesApi();
        alert.show("Sub Activity Deleted", { type: "success" });
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
                      func: deleteSubActivity,
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

  const activityContext = {
    setAuthModal,
    setErrors,
    setApiAction,
    activities,
    subActivities,
    fetchActivityCategoriesApi,
    fetchSubActivityByActivityId,
    addActivityApi,
    deleteActivity,
    deleteSubActivity,
    addSubActivityApi,
    apiAction,
    errors,
  };

  const {
    // article:initialArticle,
    children,
  } = props;

  // pass the value in provider and return
  return (
    <Context.Provider value={activityContext} {...props}>
      {children}
    </Context.Provider>
  );
};

const ActivityProvider = {
  Provider,
  Context,
};

// Provider.propTypes = {
//   article: PropTypes.object,
// };

export default ActivityProvider;
