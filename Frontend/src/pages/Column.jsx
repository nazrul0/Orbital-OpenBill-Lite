import React from "react";
import PageTitle from "../components/PageTitle";
import "./Column.css";
import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import ArticleList from "../components/ArticleList";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePaginate } from "../hooks/usePaginate";

function Column() {
  const { error } = useCollection("Articles");
  const { user, privileged } = useAuthContext();

  console.log(privileged)

  const {
    paginatedProposals: paginatedArticles,
    getNextProposals: getNextArticles,
  } = usePaginate("Articles", null, 6, 6, "articles");

  return (
    <div className="bg-slate-100">
      <PageTitle title="The Column" />
      <section className="columnBody pb-8">
        {/*<h3 className="columnSubTitle">Latest in Articles</h3>*/}
        {user && privileged && (
          <Link
            id="shareLink"
            className="navItem bg-indigo-200 text-white rounded-lg px-5 py-2 h-4"
            to="/SubmitArticle"
          >
            Post new article
          </Link>
        )}
        <section className="articleList">
          <div>
            {error && <p>{error}</p>}
            {paginatedArticles && (
              <div className="paginateContainer">
                <ArticleList articles={paginatedArticles} />
                <button
                  // type="submit"
                  id="loadMore"
                  onClick={getNextArticles}
                  className="m-2 px-8 py-1 bg-indigo-500 text-white font-main rounded-full"
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}

export default Column;
