import React from "react";
import { useLocation } from "react-router-dom";
import PageTitle from "./PageTitle";
import QuillEditor from "./QuillEditor";
import "./ParticularArticle.css";

function ParticularArticle() {
  const location = useLocation();
  const { curr } = location.state;

  return (
    <div>
      <PageTitle title="Article" />
      <div className="mainArticleContainer">
        <div className="articleContainer">
          <section className="articleHeader">
            <h2 className="articleTitle">{curr.Title}</h2>
            <h4 className="articleOwner">By {curr.DisplayName}</h4>
          </section>

          <section className="articleContent">
            <h3>Header for article content</h3>
            <QuillEditor readMode={true} payload={JSON.parse(curr.Content)} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default ParticularArticle;
