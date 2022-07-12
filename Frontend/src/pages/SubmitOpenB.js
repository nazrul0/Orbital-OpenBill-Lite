import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenB.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";

function SubmitOpenB() {
  const [billTitle, setBillTitle] = useState("");
  const [billContent, setBillContent] = useState("");
  const [billCategory, setBillCategory] = useState("Environment");
  const { addDoc, state } = useCrud("OpenBills");
  const { user } = useAuthContext(); // importing user to get access to uid field on the user object

  const submitHandler = (event) => {
    event.preventDefault();
    // getting the Owner id
    const id = user.uid;
    const disp = user.displayName;

    // destructured addDoc hence can be directly used
    // by passing in the doc argument expected
    addDoc({
      Title: billTitle,
      Content: billContent,
      Category: billCategory,
      OwnerID: id,
      DisplayName: disp,
      ProposalType: "OpenBill",
    });
  };

  // refreshing form once submitted
  useEffect(() => {
    if (state.success) {
      setBillTitle("");
      setBillContent("");
      setBillCategory("Environment");
      alert("Submitted!");
    }
  }, [state.success]); // will only fire when success property changes

  return (
    <div>
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

          <section className="questionSection">
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

          <section className="questionSection">
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

          <section className="questionSection">
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

export default SubmitOpenB;
