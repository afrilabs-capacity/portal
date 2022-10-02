import React, { useContext, useEffect } from "react";
import ActivityProvider from "../context/ActivityContext";
import ArticleProvider from "../context/ArticleContext";

const ActivityCategoryNew = (props) => {
  const { validation } = props;
  const { activities, subActivityPayload, updateSubActivityPayload } =
    useContext(ActivityProvider.Context);
  const { article, updateArticle } = useContext(ArticleProvider.Context);

  useEffect(() => {
    //console.log("activities from activity component", activities);
    //alert(JSON.stringify(validation.values, null, 2));
  }, [validation.values]);
  return (
    <>
      <div className="form-group">
        <label htmlFor="sel1">Activity Category:</label>
        <select
          className="form-control"
          id="activity_id"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.activity_id}
        >
          <option defaultValue="">Select</option>
          {activities.length &&
            activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
        </select>
      </div>
      <span>{!activities.length && "Loading"}</span>
      {validation.touched.activity_id && validation.errors.activity_id ? (
        <>
          <div style={{ color: "red" }}>{validation.errors.activity_id}</div>
          <br />
        </>
      ) : null}
    </>
  );
};

export default ActivityCategoryNew;
