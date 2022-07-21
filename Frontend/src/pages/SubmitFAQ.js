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
    <div className="bg-slate-100">
      <PageTitle title="Suggest an FAQ" />
      <div className="submitFaqContainer">
        {/* <section className="questionSection">Category?</section> */}
        <section className="faqSection bg-white lg:mx-20 sm:mx-8">
          <div className="faqContainer">
            <h5 className="faqHeader text-2xl">
              What would you like to ask the team?
            </h5>
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
          className="m-2 pl-8 p-1 pr-8 bg-slate-300 text-black rounded-lg font-main"
          onClick={createFaq}
        >
          Submit FAQ suggestion
        </button>
      </div>

      <div className="bg-black w-full text-white flex flex-col items-center pb-16 pt-10 mt-10">
        <h3 className="font-title">
          Privacy Policy
        </h3>
        <p className="font-main text-base lg:mx-60 md:mx-32 mx-16 mt-6">
          OpenBill SG takes your privacy and security very seriously. The following lists the measures taken by OpenBill SG and its administrators to ensure this. 1. All data is kept exclusively with OpenBill SG. (a) Personal data is encrypted and kept secure by Google Firebase services (b) No user data is or will be shared with advertising companies. 2. We are transparent with the data we collect. (a) Email and password data is collected for you to register an account with us. Your credentials are never shared with any other parties (b) Data created by you on OpenBill remains within the OpenBill database. 3. We comply by Personal Data Protect Act (PDPA) laws.
        </p>
      </div>
    </div>
  );
}

export default SubmitFAQ;
