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
  // console.log("Print" + questionsCollectionRef);
  // const questionsCollectionRef = projFirestore.collection("Questions");

  // CREATE OpenQuestion document in database
  const createOpenQuestion = async () => {
    await addDoc(questionsCollectionRef, {
      Title: questionTitle,
      Content: questionContent,
      OwnerID: "Test",
      Category: "Test",
    });
    console.log("Created!");
  };

  // READ all OpenQuestions from database
  projFirestore
    .collection("Questions")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        questions.push(doc);
        // console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  // DISPLAY database items
  const [dataToShow, setData] = useState([]);
  projFirestore.collection("Users").onSnapshot(function (querySnapshot) {
    const data = [];
    querySnapshot.forEach((doc) => {
      console.log("Title: " + doc.data().Title);
      console.log("Content: " + doc.data().Content);
      data.push({ title: doc.data().Title, content: doc.data().Content });
    });
    setData(data);
  });

  // console.log(questions);
  // useEffect(function () {
  //   const getQuestions = async () => {
  //     const data = getDocs(questionsCollectionRef);
  //     console.log(data.docs);
  //     console.log("Got!");
  //     setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getQuestions();
  // });

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
        {/* {questions.map((question) => {
          return (
            <div>
              <h1>Title: {question.Title}</h1>
              <h2>Content: {question.Content}</h2>
            </div>
          );
        })} */}
        {/* <p>{console.log(dataToShow)}</p> */}
        <p>
          {dataToShow.map(
            (data) => "Title: " + data.title + " Content: " + data.content
          )}
        </p>
        <p>TEST LOCATION</p>
      </div>
      {/* <div>{console.log({ questions })}</div> */}
    </div>
  );
}

export default SubmitOpenQ;
