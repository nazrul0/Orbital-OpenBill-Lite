import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenB.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";
import QuillEditor from "../components/QuillEditor";
import "react-quill/dist/quill.snow.css";
import constellation from "../imgs/constellation.png";
import { useNavigate } from "react-router-dom";

function SubmitOpenB() {
  const [billCategory, setBillCategory] = useState("Environment");
  const [billTitle, setBillTitle] = useState("");
  const [relatedLaws, setRelatedLaws] = useState("");
  const [currentProbs, setCurrentProbs] = useState("");
  const [summary, setSummary] = useState("");
  const [elabHow, setElabHow] = useState("");
  const [elabWhy, setElabWhy] = useState("");
  const [bibliography, setBibliography] = useState("");

  const { addDoc, state } = useCrud("OpenBills");
  const { user } = useAuthContext(); // importing user to get access to uid field on the user object

  const nav = useNavigate();
  // getting the Owner id
  const id = user.uid;
  const disp = user.displayName;

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      billTitle === "" ||
      relatedLaws === "" ||
      currentProbs === "" ||
      summary === "" ||
      elabHow === ""
    ) {
      alert(
        "Required fields: Title, related laws, current problem, summary, elaboration section 1"
      );
      return;
    }

    // destructured addDoc hence can be directly used
    // by passing in the doc argument expected
    addDoc({
      Category: billCategory,
      Title: billTitle,
      RelatedLaws: relatedLaws,
      CurrentProblems: currentProbs,
      Summary: summary,
      Elaboration1: elabHow,
      Elaboration2: elabWhy,
      Bibliography: bibliography,
      ProposalType: "OpenBill",
      OwnerID: id,
      DisplayName: disp,
      Upvotes: 0,
    });
  };

  // refreshing form once submitted
  useEffect(() => {
    if (state.success) {
      setBillTitle("");
      setRelatedLaws("");
      setCurrentProbs("");
      setSummary("");
      setElabHow("");
      setElabWhy("");
      setBibliography("");
      setBillCategory("Environment");
      //alert("Submitted!");
      //window.location.reload(false);
      nav(`/UserProfile/${id}`);
    }
  }, [state.success]); // will only fire when success property changes

  // useEffect(() => {
  //   console.log(elabHow)
  // }, [elabHow])

  if (state.isPending === false) {
    return (
      <div className="bg-slate-100 font-main pb-8">
        <PageTitle title="Create an OpenBill" />
        <form>
          <div className="submitBillContainer">
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
                      value={billCategory}
                      onChange={(event) => {
                        setBillCategory(event.target.value);
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
              <div className="sectionContainer">
                <h3 className="questionHeader text-3xl">Title</h3>
                <h5 className="md:text-lg">Write a brief title</h5>
                {!state.isPending && (
                  <textarea
                    className="questionTitleInput text-lg"
                    maxlength="80"
                    placeholder="80-character limit"
                    value={billTitle}
                    onChange={(event) => {
                      setBillTitle(event.target.value);
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
                  Related laws
                </h3>
                <h5 className="md:text-lg">
                  Which acts/policies/laws are likely to be affected?
                </h5>
                <QuillEditor
                  sendUp={setRelatedLaws}
                  className="editor-style"
                  readMode={false}
                />
              </div>
            </section>

            <section className="questionSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 2xl:w-1/2">
              <div className="sectionContainer">
                <h3 className="questionHeader text-3xl">
                  Current Problems
                </h3>
                <h5 className="md:text-lg">
                  What’s wrong? How are current policies insufficient/
                  ineffective?
                </h5>
                <QuillEditor
                  sendUp={setCurrentProbs}
                  className="editor-style"
                  readMode={false}
                />
              </div>
            </section>

            <section className="questionSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 2xl:w-1/2">
              <div className="sectionContainer">
                <h3 className="questionHeader text-3xl">
                  Summary of Recommendations
                </h3>
                <h5 className="md:text-lg">
                  First summarise your recommendations, ideally in less than 50
                  words per point :)
                </h5>
                <QuillEditor
                  sendUp={setSummary}
                  className="editor-style"
                  readMode={false}
                />
              </div>
            </section>

            <section className="questionSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 2xl:w-1/2">
              <div className="sectionContainer">
                <h3 className="questionHeader text-3xl">
                  Elaboration: Part 1
                </h3>
                <h5 className="md:text-lg">
                  Now provide details on how these recommendations would be
                  implemented
                </h5>
                <QuillEditor
                  sendUp={setElabHow}
                  className="editor-style"
                  readMode={false}
                />
              </div>
            </section>

            <section className="questionSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 2xl:w-1/2">
              <div className="sectionContainer">
                <h3 className="questionHeader text-3xl">
                  Elaboration: Part 2
                </h3>
                <h5 className="md:text-lg">
                  Why do these measures work? If you have theoretical
                  explanations/ supporting data, present these arguments here
                  (Optional)
                </h5>
                <QuillEditor
                  sendUp={setElabWhy}
                  className="editor-style"
                  readMode={false}
                />
              </div>
            </section>

            <section className="questionSection bg-white w-5/6 sm:w-4/5 md:w-3/4 lg:w-3/5 2xl:w-1/2">
              <div className="sectionContainer">
                <h3 className="questionHeader text-3xl">
                  Bibliography
                </h3>
                <h5 className="md:text-lg">
                  Optional, but highly recommended!
                </h5>
                <QuillEditor
                  sendUp={setBibliography}
                  className="editor-style"
                  readMode={false}
                />
              </div>
            </section>

            <div className="text-center bg-black px-20 py-2 text-white rounded-lg">
              <p>See a past bill or report considered in Parliament</p>
              <a
                href="https://sso.agc.gov.sg/Act/CPA2018?ProvIds=P18-#pr45-"
                className="underline m-2"
              >
                Bill
              </a>
              <a
                href="https://sso.agc.gov.sg/Act/CPA2018?ProvIds=P18-#pr45-"
                className="underline m-2"
              >
                Report
              </a>
            </div>

            <button
              type="submit"
              onClick={submitHandler}
              className="m-2 pl-8 p-1 pr-8 bg-indigo-500 text-white rounded-lg"
            >
              Publish OpenBill
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <h4 className="text-center m-9">Publishing...</h4>;
  }
}
export default SubmitOpenB;
