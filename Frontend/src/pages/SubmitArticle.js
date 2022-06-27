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

function SubmitArticle() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articles, setArticles] = useState([]);
  const articlesCollectionRef = collection(projFirestore, "Articles");

  // CREATE OpenQuestion document in database
  const createArticle = async () => {
    await addDoc(articlesCollectionRef, {
      Title: articleTitle,
      Content: articleContent,
      OwnerID: "Test",
      Category: "Test",
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
        console.log(doc.id, " => ", doc.data());
        // console.log("DATA: " + questions[0].Data.Category);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  console.log(articles);

  return (
    <div>
      <PageTitle title="Submit an Article" />

      <div className="submitArticleContainer">
        {/* <section className="questionSection">Category?</section> */}
        <section className="articleSection">
          <div className="articleContainer">
            <h3 className="articleHeader">Article Title</h3>

            <textarea
              className="articleTitleInput"
              maxLength="200"
              placeholder=""
              onChange={(event) => {
                setArticleTitle(event.target.value);
              }}
              required
            ></textarea>
          </div>
        </section>

        <section className="articleSection">
          <div className="articleContainer">
            <h3 className="articleHeader">Content</h3>

            <textarea
              className="articleContentInput"
              maxLength="1000"
              placeholder=""
              onChange={(event) => {
                setArticleContent(event.target.value);
              }}
              required
            ></textarea>
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
