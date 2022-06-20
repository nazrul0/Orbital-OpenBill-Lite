import React from "react";
import PageTitle from "../components/PageTitle";
import "./Column.css";
import ArticleRect from "../components/ArticleRect";
import { Link } from "react-router-dom";

function Column() {
  return (
    <div>
      <PageTitle title="The Column" />
      <section className="columnBody">
        <h2 className="columnSubTitle">Latest in Articles</h2>
        <Link id="shareLink" className="navItem" to="/SubmitArticle">
          Have an article to share?
        </Link>
        <section className="articleList">
          <ArticleRect />
          <ArticleRect />
          <ArticleRect />
          <ArticleRect />
          <ArticleRect />
        </section>
      </section>
    </div>
  );
}

export default Column;
