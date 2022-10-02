import React, { useContext, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import ArticleProvider from "../../context/ArticleContext";
import Paginations from "../../pagination/pagination";
import SearchInput from "../../inputs/search-input";
import LoginModal from "../../modals/login-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const styles = {
  noBorder: {
    border: "none",
  },
  noBorderTop: {
    borderBTop: "none",
  },
  cardStyle: {
    boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    border: "none",
  },
};

const Dashboard = () => {
  const {
    fetching,
    fetchingFailMsg,
    setCurrentPage,
    articles,
    fetchArticlesApi,
    pagination,
    deleteArticleApi,
  } = useContext(ArticleProvider.Context);

  useEffect(() => {
    fetchArticlesApi();
    setCurrentPage(1);
    //alert("mount")
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard style={styles.cardStyle}>
            <CCardHeader style={styles.noBorder}>
              <CRow className="mt-4">
                <CCol md="5">
                  All Posts | Showing Page{" "}
                  <b>{articles.length ? pagination.from : ""}</b>-
                  <b>{articles.length ? pagination.to : ""}</b> of{" "}
                  <b>{articles.length ? pagination.total : ""}</b> Results
                </CCol>

                <CCol>
                  <SearchInput context={ArticleProvider.Context} />
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <table
                className="table table-hover no-border mb-2 d-none d-sm-table"
                style={styles.noBorder}
              >
                <thead className="" style={styles.noBorder}>
                  <tr style={styles.noBorder}>
                    <th>Title</th>
                    <th className="text-center">Activity</th>
                    <th className="text-center">Sub Activity</th>
                    <th className="text-center">Status</th>
                    <th>Category</th>
                    <th className="text-center">Type</th>
                    <th>Trash</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.length
                    ? articles.map((post) => (
                        <tr key={post.id} style={styles.noBorder}>
                          <td>
                            <a href={"/posts/edit/" + post.id}>
                              <h5>{post.title_en}</h5>
                            </a>
                            <div className="small text-muted">
                              <a href={"/posts/edit/" + post.id}>
                                <span>Edit</span>
                              </a>{" "}
                              | Posted: {post.created_at}
                            </div>
                          </td>
                          <td className="text-center">
                            <span>
                              {post.activity == null
                                ? "N/A"
                                : post.activity.name}
                            </span>
                          </td>

                          <td className="text-center">
                            <span>
                              {post.activitysub == null
                                ? "N/A"
                                : post.activitysub.name}
                            </span>
                          </td>
                          <td className="text-center">
                            <span>{post.status}</span>
                          </td>
                          <td>
                            <div className="clearfix">
                              <div className="float-left">
                                <span>{post.category}</span>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <span>{post.type}</span>
                          </td>
                          <td className="text-center">
                            <FontAwesomeIcon
                              style={{
                                color: post.type == "dash" ? "red" : "#eee",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                post.type == "dash" && deleteArticleApi(post.id)
                              }
                              icon={faTrash}
                            />
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>

              {!articles.length && fetchingFailMsg !== null && (
                <h3 className="mb-4">{fetchingFailMsg}</h3>
              )}

              {!articles.length && fetching && (
                <h3 className="mb-4">Loading..</h3>
              )}

              {articles.length ? (
                <Paginations context={ArticleProvider.Context} />
              ) : (
                ""
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <LoginModal context={ArticleProvider.Context} />
      </CRow>
    </>
  );
};

export default Dashboard;
