import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenQ.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";
import QuillEditor from "../components/QuillEditor";
import "react-quill/dist/quill.snow.css";

function SubmitOpenQ() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionCategory, setQuestionCategory] = useState("Environment");
  const [questionContent, setQuestionContent] = useState("");
  const [questionBackground, setQuestionBackground] = useState("");

  const { addDoc, state } = useCrud("OpenQuestions");
  const { user } = useAuthContext(); // importing user to get access to uid field on the user object

  const submitHandler = (event) => {
    event.preventDefault();
    // getting the Owner id
    const id = user.uid;
    const disp = user.displayName;

    if(questionTitle === "" || questionContent === "" || questionBackground === ""){
      alert("All fields are required");
      return;
    }

    // destructured addDoc hence can be directly used
    addDoc({
      Title: questionTitle,
      Content: questionContent,
      Background: questionBackground,
      Category: questionCategory,
      OwnerID: id,
      DisplayName: disp,
      ProposalType: "OpenQuestion",
    });
  };

  // refreshing form once submitted
  useEffect(() => {
    if (state.success) {
      setQuestionTitle("");
      setQuestionContent("");
      setQuestionBackground("");
      setQuestionCategory("Environment");
      //alert("Submitted!");
      window.location.reload(false);
    }
  }, [state.success]); // will only fire when success property changes

  return (
    <div className="bg-slate-100">
      <PageTitle title="Create an OpenQuestion" />
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
                    <option value="Social Welfare">Social Welfare</option>
                    <option value="Gender">Gender</option>
                    <option value="Privacy/Security">Privacy/Security</option>
                    <option value="Health">Health</option>
                    <option value="Housing">Housing</option>
                    <option value="Transport">Transport</option>
                  </select>
                )}

                {state.isPending && <select disabled></select>}
              </div>
            </div>
          </section>

          <section className="questionSection bg-white">
            <div className="sectionContainer">
              <h3 className="questionHeader">Title</h3>
              <h5>Give a brief title</h5>
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

          <section className="questionSection bg-white">
            <div className="sectionContainer">
              <h3 className="questionHeader">Question content</h3>
              <h5>Elucidate the Question here:</h5>
                <QuillEditor
                  sendUp={setQuestionContent}
                  className="editor-style"
                  readMode={false}
                />
            </div>
          </section>

          <section className="questionSection bg-white">
            <div className="sectionContainer">
              <h3 className="questionHeader">Background</h3>
              <h5>What is the issue that the OpenQuestion highlights?</h5>
                <QuillEditor
                  sendUp={setQuestionBackground}
                  className="editor-style"
                  readMode={false}
                />
            </div>
          </section>

          <div className="center underline">
            <a href="https://www.mof.gov.sg/news-publications/parliamentary-replies/response-to-parliamentary-questions-on-inflation-and-cost-of-living">
            See a past Parliamentary Question
            </a>
          </div>

          <button
            type="submit"
            onClick={submitHandler}
            className="m-2 pl-8 p-1 pr-8 bg-indigo-500 text-white rounded-lg"
          >
            Publish OpenQuestion
          </button>

        </div>
      </form>
      
    </div>
  );
}

export default SubmitOpenQ;
