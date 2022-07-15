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
        <div className="particularArticleContainer">
          <section className="particularArticleHeader">
            <h2 className="particularArticleTitle">{curr.Title}</h2>
            <h4 className="particularArticleOwner">By {curr.DisplayName}</h4>
          </section>

          <section className="particularArticleContent">
            <h3>Header for article content</h3>
            <QuillEditor readMode={true} payload={JSON.parse(curr.Content)} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default ParticularArticle;
