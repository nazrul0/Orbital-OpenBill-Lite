import React from "react";
import PageTitle from "../components/PageTitle";
import "./Column.css";
import ArticleRect from "../components/ArticleRect";

function Column() {
  return (
    <div>
      <PageTitle title="The Column" />
      <section className="columnBody">
        <h2 className="columnSubTitle">Latest in Articles</h2>
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
