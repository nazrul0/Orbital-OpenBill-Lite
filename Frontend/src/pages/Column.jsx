import React from "react";
import PageTitle from "../components/PageTitle";
import "./Column.css";
import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import ArticleList from "../components/ArticleList";
import { useAuthContext } from "../hooks/useAuthContext";

function Column() {
  const { docs, error } = useCollection("Articles");
  const { user, privileged } = useAuthContext();
  
  return (
    <div className="bg-slate-100">
      <PageTitle title="The Column" />
      <section className="columnBody pb-8">
        <h3 className="columnSubTitle">Latest in Articles</h3>
        {user && (privileged && ( 
          <Link id="shareLink" className="navItem" to="/SubmitArticle">
            Post new article
          </Link>
        ))}
        <section className="articleList">
          <div>
            {error && <p>{error}</p>}
            {docs && <ArticleList articles={docs} />}
          </div>

        </section>
      </section>
    </div>
  );
}

export default Column;
