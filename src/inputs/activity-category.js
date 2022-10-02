import React, { useContext, useEffect } from "react";
import ActivityProvider from "../context/ActivityContext";
import ArticleProvider from "../context/ArticleContext";

const ActivityCategory = (props) => {
  const { activities, fetchSubActivityByActivityId } = useContext(
    ActivityProvider.Context
  );
  const { article, updateArticle, updateSubActivityPayload } = useContext(
    ArticleProvider.Context
  );

  useEffect(() => {
    //console.log("activities from activity component", activities);
  }, []);
  return (
    <>
      <div className="form-group">
        <label htmlFor="sel1">Activity Category:</label>
        <select
          className="form-control"
          id=""
          value={article.activity_id}
          onChange={(e) => {
            let activityId = e.target.value;
            updateArticle("activity_id", e.target.value);
            updateArticle("activity_sub_id", 0);
            fetchSubActivityByActivityId(activityId);
          }}
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
    </>
  );
};

export default ActivityCategory;
