import React from "react";
// import { Link } from "react-router-dom";
import "./ArticleList.css";
import ArticleRect from "./ArticleRect";

function ArticleList({ articles }) {
  // use map to create a series of <Link> objects using the collection data passed in
  // (!!) note- has to be proposals.Title (w caps) since we defined the field as Title: on firebase side
  return (
    <div className="article_list">
      {articles.length === 0 && <p>no articles found.</p>}
      {articles.map((article) => (
        <ArticleRect
          title={article.Title}
          content={article.Content}
          author="testuser"
        />
      ))}
    </div>
  );
}

export default ArticleList;
