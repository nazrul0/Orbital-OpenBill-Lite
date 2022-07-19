import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitFAQ.css";
import { projFirestore } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

function SubmitFAQ() {
  const [faqContent, setFaqContent] = useState("");
  const [faqs, setFaqs] = useState([]);
  const faqsCollectionRef = collection(projFirestore, "FAQs");

  // CREATE OpenQuestion document in database
  const createFaq = async () => {
    await addDoc(faqsCollectionRef, {
      Question: faqContent,
      OwnerID: "Test",
      Category: "Test",
    });
    console.log("Created!");
    alert("Submitted!");
  };

  // READ all OpenQuestions from database
  projFirestore
    .collection("FAQs")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        faqs.push({ Key: doc.id, Data: doc.data() });
        console.log(doc.id, " => ", doc.data());
        // console.log("DATA: " + questions[0].Data.Category);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  console.log(faqs);

  return (
    <div>
      <PageTitle title="Suggest an FAQ" />
      <div className="submitFaqContainer ">
        {/* <section className="questionSection">Category?</section> */}
        <section className="faqSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div className="faqContainer">
            <h3 className="faqHeader text-3xl md:text-4xl">
              What would you like to ask the team?
            </h3>
            <form>
              <textarea
                className="faqContentInput"
                maxLength="200"
                placeholder=""
                onChange={(event) => {
                  setFaqContent(event.target.value);
                }}
                required
              ></textarea>
            </form>
          </div>
        </section>

        <button
          type="submit"
          className="m-2 pl-8 p-1 pr-8 bg-indigo-500 text-white rounded-lg"
          onClick={createFaq}
        >
          Submit FAQ suggestion
        </button>
      </div>

      {/* <div className="faqbillTestArea">
        <p>TEST LOCATION</p>
        {faqs.map((faq) => {
          return (
            <div>
              <p>Content: {faq.Data.Question}</p>
            </div>
          );
        })}
        <p>TEST LOCATION</p>
      </div> */}
    </div>
  );
}

export default SubmitFAQ;
