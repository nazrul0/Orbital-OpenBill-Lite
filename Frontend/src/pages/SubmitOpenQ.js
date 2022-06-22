import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenQ.css";
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

function SubmitOpenQ() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questions, setQuestions] = useState([]);
  const questionsCollectionRef = collection(projFirestore, "OpenQuestions");

  // CREATE OpenQuestion document in database
  const createOpenQuestion = async () => {
    await addDoc(questionsCollectionRef, {
      Title: questionTitle,
      Content: questionContent,
      OwnerID: "Test",
      Category: "Test",
    });
    console.log("Created!");
    alert("Submitted!");
  };

  // READ all OpenQuestions from database
  projFirestore
    .collection("OpenQuestions")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        questions.push({ Key: doc.id, Data: doc.data() });
        console.log(doc.id, " => ", doc.data());
        // console.log("DATA: " + questions[0].Data.Category);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  console.log(questions);

  return (
    <div>
      <PageTitle title="Submit an OpenQuestion" />
      <div className="submitQuestionContainer">
        {/* <section className="questionSection">Category?</section> */}
        <section className="questionSection">
          <div className="sectionContainer">
            <h3 className="questionHeader">OpenQuestion Title</h3>
            <textarea
              className="questionTitleInput"
              maxLength="200"
              placeholder=""
              onChange={(event) => {
                setQuestionTitle(event.target.value);
              }}
            ></textarea>
          </div>
        </section>

        <section className="questionSection">
          <div className="sectionContainer">
            <h3 className="questionHeader">Elaboration</h3>
            <textarea
              className="questionContentInput"
              maxLength="1000"
              placeholder=""
              onChange={(event) => {
                setQuestionContent(event.target.value);
              }}
            ></textarea>
          </div>
        </section>

        <button
          type="submit"
          className="submitQuestionTitle"
          onClick={createOpenQuestion}
        >
          Submit OpenQuestion
        </button>
      </div>

      <div className="questionTestArea">
        <p>TEST LOCATION</p>
        {questions.map((question) => {
          return (
            <div>
              <p>Title: {question.Data.Title}</p>
              <p>Content: {question.Data.Content}</p>
            </div>
          );
        })}
        <p className="text-3xl font-bold underline">TEST LOCATION</p>
      </div>
    </div>
  );
}

export default SubmitOpenQ;
