import React, { useEffect, useContext, useState } from "react";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CPagination,
  CButton,
} from "@coreui/react";
import ActivityProvider from "../../context/ActivityContext";
import ActivityCategoryNew from "../../inputs/activity-category-new";
import UserRole from "../../inputs/user-role";
import { useFormik } from "formik";
import * as Yup from "yup";
import usersData from "../../views/users/UsersData";
import Paginations from "../../pagination/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "../../modals/login-modal";
import ModalMeFile from "../../modals/file-upload-modal";

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
  cardStyle: {
    boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    border: "none",
  },
};

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const DashboardUserActivity = () => {
  //var userName = prompt("Please Enter your Name");

  const {
    toast,
    errors,
    deleteUserApi,
    apiAction,
    fetchingFailMsg,
    activities,
    addActivityApi,
    deleteActivity,
    deleteSubActivity,
    addSubActivityApi,
  } = useContext(ActivityProvider.Context);

  const [activityMode, setActivityMode] = useState(true);
  const [modal, showModal] = useState(false);
  const [currentSubActivity, setCurrentSubActivity] = useState([]);
  //const [currentSubActivity, setCurrentSubActivity] = useState([]);

  useEffect(() => {
    //fetchActivityCategoriesApi();
  }, []);

  const Styles = {
    errorColor: {
      color: "red",
    },
  };

  const formikActivityForm = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(40, "Must be 40 characters or less")
        .required("Activity name field required"),
      //email: Yup.string().email("Invalid email address").required("Required"),
      //role: Yup.string().required("Email address required"),
    }),
    onSubmit: (values) => {
      //setUser(values)
      addActivityApi(values);
      //alert(JSON.stringify(values, null, 2));
    },
  });

  const formikSubActivityForm = useFormik({
    initialValues: {
      name: "",
      activity_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(80, "Must be 30 characters or less")
        .required("Activity sub name field required"),
      activity_id: Yup.string().required("Activity required"),
      //email: Yup.string().email("Invalid email address").required("Required"),
      //role: Yup.string().required("Email address required"),
    }),
    onSubmit: (values) => {
      //setUser(values)
      addSubActivityApi(values);
      //alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    // currentPage !== page && setPage(currentPage)
  }, []);

  return (
    <CRow>
      <CCol xl={5}>
        <CCard>
          <CCardHeader>Add Activity</CCardHeader>
          <CCardBody>
            <form onSubmit={formikActivityForm.handleSubmit}>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Activity Name</CLabel>
                    <CInput
                      id="name"
                      placeholder="Enter activity name"
                      onChange={formikActivityForm.handleChange}
                      onBlur={formikActivityForm.handleBlur}
                      value={formikActivityForm.values.name}
                    />
                  </CFormGroup>
                  {formikActivityForm.touched.name &&
                  formikActivityForm.errors.name ? (
                    <>
                      <div style={Styles.errorColor}>
                        {formikActivityForm.errors.name}
                      </div>
                      <br />
                    </>
                  ) : null}
                </CCol>
              </CRow>
              {/* <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Email</CLabel>
                    <CInput
                      id="email"
                      type="email"
                      placeholder="Enter email here.."
                      placeholder="Enter your name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </CFormGroup>
                  {formik.touched.email && formik.errors.email ? (
                    <div style={Styles.errorColor}>{formik.errors.email}</div>
                  ) : null}
                </CCol>
              </CRow> */}

              {/* <CRow className="text-center">
                <CCol xs="12">
                  <UserRole formik={formik} />
                </CCol>
              </CRow> */}

              <CRow className="text-center">
                <CCol xs="12">
                  {apiAction ? (
                    <button
                      className="btn btn-primary px-4 w-100"
                      disabled={apiAction}
                    >
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      &nbsp;Loading...
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary px-4 w-100"
                      disabled={apiAction}
                    >
                      Add
                    </button>
                  )}
                  <div style={{ color: "red" }} className="mt-2">
                    {errors && errors.length ? (
                      <h3>Submission contains errors</h3>
                    ) : (
                      ""
                    )}
                    {errors && errors.length
                      ? errors.map((error, i) => (
                          <p key={i} className="text-left">
                            {error}
                          </p>
                        ))
                      : ""}
                  </div>
                </CCol>
              </CRow>
            </form>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>Add Sub Activity</CCardHeader>
          <CCardBody>
            <form onSubmit={formikSubActivityForm.handleSubmit}>
              <CRow>
                <CCol xs="12">
                  <ActivityCategoryNew validation={formikSubActivityForm} />
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Sub Activity Name</CLabel>
                    <CInput
                      id="name"
                      placeholder="Enter sub activity name"
                      onChange={formikSubActivityForm.handleChange}
                      onBlur={formikSubActivityForm.handleBlur}
                      value={formikSubActivityForm.values.name}
                      disabled={!activities.length}
                    />
                  </CFormGroup>
                  {formikSubActivityForm.touched.name &&
                  formikSubActivityForm.errors.name ? (
                    <>
                      <div style={Styles.errorColor}>
                        {formikSubActivityForm.errors.name}
                      </div>
                      <br />
                    </>
                  ) : null}
                </CCol>
              </CRow>
              {/* <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Email</CLabel>
                    <CInput
                      id="email"
                      type="email"
                      placeholder="Enter email here.."
                      placeholder="Enter your name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </CFormGroup>
                  {formik.touched.email && formik.errors.email ? (
                    <div style={Styles.errorColor}>{formik.errors.email}</div>
                  ) : null}
                </CCol>
              </CRow> */}

              {/* <CRow className="text-center">
                <CCol xs="12">
                  <UserRole formik={formik} />
                </CCol>
              </CRow> */}

              <CRow className="text-center">
                <CCol xs="12">
                  {apiAction ? (
                    <button
                      className="btn btn-primary px-4 w-100"
                      disabled={apiAction}
                    >
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      &nbsp;Loading...
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary px-4 w-100"
                      disabled={apiAction}
                    >
                      Add
                    </button>
                  )}
                  <div style={{ color: "red" }} className="mt-2">
                    {errors && errors.length ? (
                      <h3>Submission contains errors</h3>
                    ) : (
                      ""
                    )}
                    {errors && errors.length
                      ? errors.map((error, i) => (
                          <p key={i} className="text-left">
                            {error}
                          </p>
                        ))
                      : ""}
                  </div>
                </CCol>
              </CRow>
            </form>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xl={7}>
        <CCard>
          <CCardHeader className="d-flex flex-row justify-content-between">
            Activities
            {!activityMode ? (
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setActivityMode((prevMode) => !prevMode);
                  //setCurrentSubActivity((prevAct) => activity.subactivities);
                }}
                style={Styles.link}
              >
                Back to Activities
              </a>
            ) : null}
          </CCardHeader>
          <CCardBody>
            <table className="table table-hover  mb-2 d-none d-sm-table w-100">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sub Activities</th>

                  <th>Trash</th>
                </tr>
              </thead>
              <tbody>
                {activityMode && activities.length
                  ? activities.map((activity) => (
                      <tr key={activity.id}>
                        <td className="pd-2">{activity.name}</td>
                        <td className="pd-2">
                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              setActivityMode((prevMode) => !prevMode);
                              setCurrentSubActivity(
                                (prevAct) => activity.subactivities
                              );
                            }}
                            style={Styles.link}
                          >
                            View ({activity.subactivities.length})
                          </a>
                        </td>

                        <td className="pd-2">
                          {
                            <FontAwesomeIcon
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => deleteActivity(activity.id)}
                              icon={faTrash}
                            />
                          }
                        </td>
                      </tr>
                    ))
                  : null}

                {!activityMode && currentSubActivity.length
                  ? currentSubActivity.map((subActivity) => (
                      <tr key={subActivity.id}>
                        <td className="pd-2">{subActivity.name}</td>
                        <td className="pd-2"></td>
                        <td className="pd-2"></td>
                        <td className="pd-2">
                          {
                            <FontAwesomeIcon
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => showModal(true)}
                              icon={faUpload}
                            />
                          }
                        </td>

                        <td className="pd-2">
                          {
                            <FontAwesomeIcon
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() =>
                                deleteSubActivity(
                                  subActivity.id
                                  //currentSubParentId
                                )
                              }
                              icon={faTrash}
                            />
                          }
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>

            {!activities.length && fetchingFailMsg !== null && (
              <h3 className="mb-4">{fetchingFailMsg}</h3>
            )}

            {/* {activities.length && activities.length ? (
              <Paginations context={ActivityProvider.Context} />
            ) : (
              ""
            )} */}
          </CCardBody>
        </CCard>
      </CCol>
      <LoginModal context={ActivityProvider.Context} />
      <ModalMeFile openModal={modal} />
    </CRow>
  );
};

export default DashboardUserActivity;
