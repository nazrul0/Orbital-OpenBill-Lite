import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenQ.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";

function SubmitOpenQ() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questionCategory, setQuestionCategory] = useState("");
  const { addDoc, state } = useCrud('OpenQuestions');
  const { user } = useAuthContext();  // importing user to get access to uid field on the user object

  const submitHandler = (event) => {
    event.preventDefault();
    // getting the Owner id
    const id = user.uid;
    
    // destructured the addDoc therefore it can simply be used here
    addDoc({
      Title: questionTitle,
      Content: questionContent,
      Category: 'test',
      OwnerID: id
    })
  }

  return (
    <div>
      <PageTitle title="Submit an OpenQuestion" />
      <div className="submitQuestionContainer">
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
          onClick={submitHandler}
        >
          Submit OpenQuestion
        </button>

        <p className="text-3xl font-bold underline">TEST LOCATION</p>

      </div>
    </div>
  );
}

export default SubmitOpenQ;