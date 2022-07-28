import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenQ.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";
import QuillEditor from "../components/QuillEditor";
import "react-quill/dist/quill.snow.css";
import constellation from "../imgs/constellation.png";
import { useNavigate } from "react-router-dom";

function SubmitOpenQ() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionCategory, setQuestionCategory] = useState("Environment");
  const [questionContent, setQuestionContent] = useState("");
  const [questionBackground, setQuestionBackground] = useState("");

  const { addDoc, state } = useCrud("OpenQuestions");
  const { user } = useAuthContext(); // importing user to get access to uid field on the user object

  const nav = useNavigate();
  // getting the Owner id
  const id = user.uid;
  const disp = user.displayName;

  const submitHandler = (event) => {
    event.preventDefault();
    
    if (
      questionTitle === "" ||
      questionContent === "" ||
      questionBackground === ""
    ) {
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
      Upvotes: 0,
    });
  };

  // refreshing form once submitted
  useEffect(() => {
    if (state.success) {
      setQuestionTitle("");
      setQuestionContent("");
      setQuestionBackground("");
      setQuestionCategory("Environment");
      // alert("Submitted!");
      // window.location.reload(false);
      nav(`/UserProfile/${id}`);
    }
  }, [state.success]); // will only fire when success property changes

  return (
    <div className="bg-slate-100 pb-6">
      <PageTitle title="Create an OpenQuestion" />
      <form>
        <div className="submitQuestionContainer font-main">
          <img
            src={constellation}
            alt="Openbill Constellation"
            className="lg:px-64 md:px-32 sm:px-12"
          />
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
                    <option value="Identity">Identity</option>
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

          <section className="questionSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 2xl:w-1/2">
            <div className="sectionContainer ">
              <h3 className="questionHeader text-3xl">Title</h3>
              <h5 className="md:text-lg">Give a brief title</h5>
              {!state.isPending && (
                <textarea
                  className="questionTitleInput text-lg"
                  maxlength="80"
                  placeholder="80-character limit"
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

          <section className="questionSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 2xl:w-1/2">
            <div className="sectionContainer">
              <h3 className="questionHeader text-3xl">
                Question content
              </h3>
              <h5 className=" md:text-lg">Elucidate the Question here:</h5>
              <QuillEditor
                sendUp={setQuestionContent}
                className="editor-style"
                readMode={false}
              />
            </div>
          </section>

          <section className="questionSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 2xl:w-1/2">
            <div className="sectionContainer">
              <h3 className="questionHeader text-3xl">
                Background
              </h3>
              <h5 className=" md:text-lg">
                What is the issue that the OpenQuestion highlights?
              </h5>
              <QuillEditor
                sendUp={setQuestionBackground}
                className="editor-style"
                readMode={false}
              />
            </div>
          </section>

          <div className="text-center bg-black px-20 py-2 text-white rounded-lg underline">
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
