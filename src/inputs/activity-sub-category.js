import React, { useContext, useEffect } from "react";
import ActivityProvider from "../context/ActivityContext";
import ArticleProvider from "../context/ArticleContext";

const ActivitySubCategory = (props) => {
  const { activities, subActivities, fetchSubActivityByActivityId } =
    useContext(ActivityProvider.Context);
  const { article, updateArticle, updateSubActivityPayload } = useContext(
    ArticleProvider.Context
  );

  useEffect(() => {
    // Check if article has activity and sub activity then load sub activities based on activity id
    article.activity_sub_id !== 0 &&
      article.activity_id !== 0 &&
      fetchSubActivityByActivityId(article.activity_id);
  }, [article.id]);
  return (
    <>
      <div className="form-group">
        <label htmlFor="sel1">Sub Activity:</label>
        <select
          className="form-control"
          id=""
          value={article.activity_sub_id}
          onChange={(e) => updateArticle("activity_sub_id", e.target.value)}
        >
          <option defaultValue="">Select</option>
          {subActivities.length &&
            subActivities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
        </select>
      </div>
      {/* <span>{!subActivities.length && "Loading"}</span> */}
    </>
  );
};

export default ActivitySubCategory;
