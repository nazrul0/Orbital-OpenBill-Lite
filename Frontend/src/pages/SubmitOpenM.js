import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenM.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";

function SubmitOpenM() {
  const [motionTitle, setMotionTitle] = useState("");
  const [motionContent, setMotionContent] = useState("");
  const [motionCategory, setMotionCategory] = useState("");
  const { addDoc, state } = useCrud("OpenMotions");
  const { user } = useAuthContext(); // importing user to get access to uid field on the user object

  const submitHandler = (event) => {
    event.preventDefault();
    // getting the Owner id
    const id = user.uid;

    // destructured addDoc hence can be directly used
    // by passing in the doc argument that is expected
    addDoc({
      Title: motionTitle,
      Content: motionContent,
      Category: motionCategory,
      OwnerID: id,
    });
  };

  // refreshing form once submitted
  useEffect(() => {
    if (state.success) {
      setMotionTitle("");
      setMotionContent("");
      setMotionCategory("Environment");
      alert("Submitted!");
    }
  }, [state.success]); // will only fire when success property changes

  return (
    <div>
      <PageTitle title="Submit an OpenMotion" />
      <form>
        <div className="submitMotionContainer">
          {/* <section className="motionSection">Category?</section> */}

          <section className="categorySelect">
            <h4>Choose a Category:</h4>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                {!state.isPending && (
                  <select
                    className="categoryMenu"
                    value={motionCategory}
                    onChange={(event) => {
                      setMotionCategory(event.target.value);
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

          <section className="motionSection">
            <div className="sectionContainer">
              <h3 className="motionHeader">OpenMotion Title</h3>
              {!state.isPending && (
                <textarea
                  className="motionTitleInput"
                  maxLength="200"
                  placeholder=""
                  value={motionTitle}
                  onChange={(event) => {
                    setMotionTitle(event.target.value);
                  }}
                  required
                ></textarea>
              )}

              {state.isPending && (
                <textarea className="motionTitleInput" disabled></textarea>
              )}
            </div>
          </section>

          <section className="motionSection">
            <div className="sectionContainer">
              <h3 className="motionHeader">Elaboration</h3>
              {!state.isPending && (
                <textarea
                  className="motionContentInput"
                  maxLength="1000"
                  placeholder=""
                  onChange={(event) => {
                    setMotionContent(event.target.value);
                  }}
                  required
                ></textarea>
              )}

              {state.isPending && (
                <textarea className="motionContentInput" disabled></textarea>
              )}
            </div>
          </section>

          <button
            type="submit"
            className="submitMotionTitle"
            onClick={submitHandler}
          >
            Submit OpenMotion
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitOpenM;
