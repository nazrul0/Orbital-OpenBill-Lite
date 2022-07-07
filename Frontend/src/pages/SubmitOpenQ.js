import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenQ.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";

function SubmitOpenQ() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questionCategory, setQuestionCategory] = useState("Environment");
  const { addDoc, state } = useCrud("OpenQuestions");
  const { user } = useAuthContext(); // importing user to get access to uid field on the user object

  const submitHandler = (event) => {
    event.preventDefault();
    // getting the Owner id
    const id = user.uid;

    // destructured addDoc hence can be directly used
    // by passing in the doc argument expected
    addDoc({
      Title: questionTitle,
      Content: questionContent,
      Category: questionCategory,
      OwnerID: id,
    });
  };

  // refreshing form once submitted
  useEffect(() => {
    if (state.success) {
      setQuestionTitle("");
      setQuestionContent("");
      setQuestionCategory("Environment");
      alert("Submitted!");
    }
  }, [state.success]); // will only fire when success property changes

  return (
    <div>
      <PageTitle title="Submit an OpenQuestion" />
      <form>
        <div className="submitQuestionContainer">
          <section className="categorySelect">
            <h4>Choose a Category:</h4>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                {!state.isPending && (
                  <select
                    className="categoryMenu"
                    value={questionCategory}
                    onChange={(event) => {
                      setQuestionCategory(event.target.value);
                    }}
                    aria-label="Select Category"
                  >
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Economic">Economic</option>
                    <option value="Financial">Financial</option>
                    <option value="Social Welfare">Social Welfare</option>
                    <option value="Gender">Gender</option>
                    <option value="Privacy/Security">Privacy/Security</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Transport">Transport</option>
                  </select>
                )}

                {state.isPending && (
                  <select disabled>
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Economic">Economic</option>
                    <option value="Financial">Financial</option>
                    <option value="Social Welfare">Social Welfare</option>
                    <option value="Gender">Gender</option>
                    <option value="Privacy/Security">Privacy/Security</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Transport">Transport</option>
                  </select>
                )}
              </div>
            </div>
          </section>

          <section className="questionSection">
            <div className="sectionContainer">
              <h3 className="questionHeader">OpenQuestion Title</h3>
              {!state.isPending && (
                <textarea
                  className="questionTitleInput"
                  maxLength="200"
                  placeholder=""
                  value={questionTitle}
                  onChange={(event) => {
                    setQuestionTitle(event.target.value);
                  }}
                  required
                ></textarea>
              )}

              {state.isPending && (
                <textarea className="questionTitleInput" disabled></textarea>
              )}
            </div>
          </section>

          <section className="questionSection">
            <div className="sectionContainer">
              <h3 className="questionHeader">Elaboration</h3>
              {!state.isPending && (
                <textarea
                  className="questionContentInput"
                  maxLength="1000"
                  placeholder=""
                  value={questionContent}
                  onChange={(event) => {
                    setQuestionContent(event.target.value);
                  }}
                  required
                ></textarea>
              )}

              {state.isPending && (
                <textarea className="questionContentInput" disabled></textarea>
              )}
            </div>
          </section>

          <button
            type="submit"
            className="submitQuestionTitle"
            onClick={submitHandler}
          >
            Submit OpenQuestion
          </button>

          {/* <p className="text-3xl underline">TEST LOCATION</p> */}
        </div>
      </form>
    </div>
  );
}

export default SubmitOpenQ;
