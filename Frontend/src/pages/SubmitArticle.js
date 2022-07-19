import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitArticle.css";
import QuillEditor from "../components/QuillEditor";
import "react-quill/dist/quill.snow.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";
import { timestamp } from "../config/firebase";

function SubmitArticle() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  // const [articleCategory, setArticleCategory] = useState("Environment");
  const { addDoc, state } = useCrud("Articles");
  const { user } = useAuthContext();

  const submitHandler = (event) => {
    event.preventDefault();
    // getting the Owner id
    const id = user.uid;
    const disp = user.displayName;

    if (articleContent === "" || articleTitle === "") {
      alert("All fields are required");
      return;
    }

    // destructured addDoc hence it can be directly used
    addDoc({
      Title: articleTitle,
      Content: articleContent,
      //Category: articleCategory,
      OwnerID: id,
      DisplayName: disp,
      CreatedAt: timestamp.now().toDate(),
    });
  };

  // refreshing form once submitted
  useEffect(() => {
    if (state.success) {
      setArticleTitle("");
      setArticleContent("");
      //setArticleCategory("Environment");
      alert("Submitted!");
      window.location.reload(false);
    }
  }, [state.success]); // will only fire when success property changes

  // // CREATE OpenQuestion document in database
  // const createArticle = async () => {
  //   await addDoc(articlesCollectionRef, {
  //     Title: articleTitle,
  //     Content: articleContent,
  //     OwnerID: "Test",
  //     Category: articleCategory,
  //   });
  //   console.log("Created!");
  //   alert("Submitted!");
  // };

  // useEffect(() => {
  //   console.log(articleContent);
  // });

  return (
    <div>
      <PageTitle title="Submit an Article" />

      <div className="submitArticleContainer">
        <section className="categorySelect">
          {/* <h4>Choose a Category:</h4> */}
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              {/*
                <select
                  className="categoryMenu"
                  value={articleCategory}
                  onChange={(event) => {
                    setArticleCategory(event.target.value);
                  }}
                  aria-label="Select Category"
                >
                <option value="Environment">Environment</option>
                <option value="Education">Education</option>
                <option value="Economic">Economic</option>
                <option value="Social Welfare">Social Welfare</option>
                <option value="Gender">Gender</option>
                <option value="Privacy/Security">Privacy/Security</option>
                <option value="Health">Health</option>
                <option value="Housing">Housing</option>
                <option value="Transport">Transport</option>
              </select>
              */}
            </div>
          </div>
        </section>

        <section className="articleSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div className="articleContainer">
            <h3 className="articleHeader text-3xl md:text-4xl">
              Article Title
            </h3>
            {!state.isPending && (
              <textarea
                className="articleTitleInput"
                maxLength="100"
                placeholder=""
                value={articleTitle}
                onChange={(event) => {
                  setArticleTitle(event.target.value);
                }}
                required
              ></textarea>
            )}

            {state.isPending && (
              <textarea className="articleTitleInput" disabled></textarea>
            )}
          </div>
        </section>

        <section className="articleSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div className="articleContainer">
            <h3 className="articleHeader text-3xl md:text-4xl">Content</h3>
            <QuillEditor
              sendUp={setArticleContent}
              className="editor-style"
              readMode={false}
            />
          </div>
        </section>

        <button
          type="submit"
          className="m-2 pl-8 p-1 pr-8 bg-indigo-500 text-white rounded-lg"
          onClick={submitHandler}
        >
          Submit Article
        </button>
      </div>
    </div>
  );
}

export default SubmitArticle;
