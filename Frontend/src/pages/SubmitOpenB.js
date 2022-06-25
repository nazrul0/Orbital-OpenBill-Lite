import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenB.css";
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

function SubmitOpenB() {
  const [billTitle, setBillTitle] = useState("");
  const [billContent, setBillContent] = useState("");
  const [bills, setBills] = useState([]);
  const billsCollectionRef = collection(projFirestore, "OpenBills");

  // CREATE OpenQuestion document in database
  const createOpenBill = async () => {
    await addDoc(billsCollectionRef, {
      Title: billTitle,
      Content: billContent,
      OwnerID: "Test",
      Category: "Test",
    });
    console.log("Created!");
    alert("Submitted!");
  };

  // READ all OpenQuestions from database
  projFirestore
    .collection("OpenBills")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        bills.push({ Key: doc.id, Data: doc.data() });
        console.log(doc.id, " => ", doc.data());
        // console.log("DATA: " + questions[0].Data.Category);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  console.log(bills);

  return (
    <div>
      <PageTitle title="Submit an OpenBill" />
      <div className="submitBillContainer">
        {/* <section className="questionSection">Category?</section> */}
        <section className="billSection">
          <div className="billContainer">
            <h3 className="billHeader">OpenBill Title</h3>
            <textarea
              className="billTitleInput"
              maxLength="200"
              placeholder=""
              onChange={(event) => {
                setBillTitle(event.target.value);
              }}
            ></textarea>
          </div>
        </section>

        <section className="billSection">
          <div className="billContainer">
            <h3 className="billHeader">Elaboration</h3>
            <textarea
              className="billContentInput"
              maxLength="1000"
              placeholder=""
              onChange={(event) => {
                setBillContent(event.target.value);
              }}
            ></textarea>
          </div>
        </section>

        <button
          type="submit"
          className="submitBillTitle"
          onClick={createOpenBill}
        >
          Submit OpenQuestion
        </button>
      </div>

      {/* <div className="billTestArea">
        <p>TEST LOCATION</p>
        {bills.map((bill) => {
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

export default SubmitOpenB;
