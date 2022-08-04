import React from "react";
import { useLocation } from "react-router-dom";
import PageTitle from "./PageTitle";
import QuillEditor from "./QuillEditor";
import "./ParticularArticle.css";

function ParticularArticle() {
  const location = useLocation();
  const { curr } = location.state;

  return (
    <div className="bg-slate-100">
      <PageTitle title="Article" />
      <div className="grid grid-cols-6">
        <div className="col-start-2 col-span-4">
          <section className="particularArticleHeader bg-white mb-6 mt-2">
            <h2 className="particularArticleTitle">{curr.Title}</h2>
            <h4 className="particularArticleOwner pt-4">By {curr.DisplayName}</h4>
          </section>

          <section className="particularArticleContent bg-white mb-10">
            <QuillEditor readMode={true} payload={JSON.parse(curr.Content)} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default ParticularArticle;
