import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenM.css";
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

function SubmitOpenM() {
  const [motionTitle, setMotionTitle] = useState("");
  const [motionContent, setMotionContent] = useState("");
  const [motions, setMotions] = useState([]);
  const motionsCollectionRef = collection(projFirestore, "OpenMotions");

  // CREATE OpenQuestion document in database
  const createOpenMotion = async () => {
    await addDoc(motionsCollectionRef, {
      Title: motionTitle,
      Content: motionContent,
      OwnerID: "Test",
      Category: "Test",
    });
    console.log("Created!");
  };

  // READ all OpenQuestions from database
  projFirestore
    .collection("OpenMotions")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        motions.push({ Key: doc.id, Data: doc.data() });
        console.log(doc.id, " => ", doc.data());
        // console.log("DATA: " + questions[0].Data.Category);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  console.log(motions);

  return (
    <div>
      <PageTitle title="Submit an OpenMotion" />
      <div className="submitMotionContainer">
        {/* <section className="motionSection">Category?</section> */}
        <section className="motionSection">
          <div className="sectionContainer">
            <h3 className="motionHeader">OpenMotion Title</h3>
            <textarea
              className="motionTitleInput"
              maxLength="200"
              placeholder=""
              onChange={(event) => {
                setMotionTitle(event.target.value);
              }}
            ></textarea>
          </div>
        </section>

        <section className="motionSection">
          <div className="sectionContainer">
            <h3 className="motionHeader">Elaboration</h3>
            <textarea
              className="motionContentInput"
              maxLength="1000"
              placeholder=""
              onChange={(event) => {
                setMotionContent(event.target.value);
              }}
            ></textarea>
          </div>
        </section>

        <button
          type="submit"
          className="submitMotionTitle"
          onClick={createOpenMotion}
        >
          Submit OpenMotion
        </button>
      </div>

      <div className="motionTestArea">
        <p>TEST LOCATION</p>
        {motions.map((motion) => {
          return (
            <div>
              <p>Title: {motion.Data.Title}</p>
              <p>Content: {motion.Data.Content}</p>
            </div>
          );
        })}
        <p>TEST LOCATION</p>
      </div>
    </div>
  );
}

export default SubmitOpenM;
