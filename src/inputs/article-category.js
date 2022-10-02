import React, { useContext } from "react";
import ArticleProvider from "../context/ArticleContext";
import {
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const ArticleCategory = () => {
  const { article, updateArticle } = useContext(ArticleProvider.Context);
  return (
    <>
      <div className="form-group">
        <label htmlFor="sel1">Category:</label>
        <select
          className="form-control"
          id="sel1"
          value={article.category}
          onChange={(e) => updateArticle("category", e.target.value)}
        >
          <option defaultValue="">Select</option>
          <option value="previous">Previous</option>
          <option value="ongoing">Ongoing</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
    </>
  );
};
export default ArticleCategory;
