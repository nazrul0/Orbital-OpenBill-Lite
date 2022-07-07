import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitArticle.css";
import { projFirestore } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocsFromServer,
  getDocsFromCache,
} from "firebase/firestore";
import QuillEditor from "../components/QuillEditor";
import "react-quill/dist/quill.snow.css";

function SubmitArticle() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleCategory, setArticleCategory] = useState("Environment");
  const [articles, setArticles] = useState([]);
  const articlesCollectionRef = collection(projFirestore, "Articles");

  // CREATE OpenQuestion document in database
  const createArticle = async () => {
    await addDoc(articlesCollectionRef, {
      Title: articleTitle,
      Content: articleContent,
      OwnerID: "Test",
      Category: articleCategory,
    });
    console.log("Created!");
    alert("Submitted!");
  };

  // READ all OpenQuestions from database
  projFirestore
    .collection("Articles")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        articles.push({ Key: doc.id, Data: doc.data() });
        // console.log(doc.id, " => ", doc.data());
        // console.log("DATA: " + questions[0].Data.Category);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  console.log(articles);

  useEffect(() => {
    console.log(articleTitle);
  });

  return (
    <div>
      <PageTitle title="Submit an Article" />

      <div className="submitArticleContainer">
        <section className="categorySelect">
          <h4>Choose a Category:</h4>
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <select
                className="categoryMenu"
                value={articleCategory}
                onChange={(event) => {
                  setArticleCategory(event.target.value);
                }}
                aria-label="Default select example"
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
            </div>
          </div>
        </section>

        <section className="articleSection">
          <div className="articleContainer">
            <h3 className="articleHeader">Article Title</h3>

            <QuillEditor
              value={articleTitle}
              onChange={(event) => {
                setArticleTitle(event.target.value);
              }}
              className="ql-editor"
              theme="snow"
            />

            {/* <textarea
              className="articleTitleInput"
              maxLength="100"
              placeholder=""
              onChange={(event) => {
                setArticleTitle(event.target.value);
              }}
              required
            ></textarea> */}
          </div>
        </section>

        <section className="articleSection">
          <div className="articleContainer">
            <h3 className="articleHeader">Content</h3>

            <QuillEditor
              value={articleContent}
              onChange={(event) => {
                setArticleContent(event.target.value);
              }}
              className="ql-editor"
              theme="snow"
            />

            {/* <textarea
              className="articleContentInput"
              maxLength="2000"
              placeholder=""
              onChange={(event) => {
                setArticleContent(event.target.value);
              }}
              required
            ></textarea> */}
          </div>
        </section>

        <button
          type="submit"
          className="submitArticleTitle"
          onClick={createArticle}
        >
          Submit Article
        </button>
      </div>

      {/* <div className="articleTestArea">
        <p>TEST LOCATION</p>
        {articles.map((bill) => {
          return (
            <div>
              <p>Title: {bill.Data.Title}</p>
              <p>Content: {bill.Data.Content}</p>
            </div>
          );
        })}
        <p>TEST LOCATION</p>
      </div> */}
    </div>
  );
}

export default SubmitArticle;
