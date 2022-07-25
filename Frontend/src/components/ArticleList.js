import React from "react";
import { Link } from "react-router-dom";
import "./ArticleList.css";
import ArticleRect from "./ArticleRect";

function ArticleList({ articles }) {
  // use map to create a series of <Link> objects using the collection data passed in
  // (!!) note- has to be proposals.Title (w caps) since we defined the field as Title: on firebase side
  return (
    <div className="article_list">
      {/* {articles.length === 0 && <p>no articles found.</p>} */}
      {articles.map((article) => (
        <Link
          to={`/Column/${article.id}`}
          key={article.id}
          state={{ curr: article }}
        >
          <ArticleRect
            title={article.Title}
            content={article.Content}
            // category={article.Category}
            author={article.DisplayName}
          />
        </Link>
      ))}
    </div>
  );
}

export default ArticleList;
