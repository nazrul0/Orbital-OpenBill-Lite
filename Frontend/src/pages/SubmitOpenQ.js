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

    // destructured addDoc hence can be directly used
    // with passing in the document argument expected
    addDoc({
      Title: questionTitle,
      Content: questionContent,
      Category: 'test',
      OwnerID: id
    })
  }

  // refreshing form once submitted
  useEffect(()=> {
    if(state.success){
      setQuestionTitle('');
      setQuestionContent('');
    }
  }, [state.success]) // will only fire when success property changes


  return (
    <div>
      <PageTitle title="Submit an OpenQuestion" />
      <div className="submitQuestionContainer">
        <section className="questionSection">
          <div className="sectionContainer">
            <h3 className="questionHeader">OpenQuestion Title</h3>
            {!state.isPending &&
              <textarea
                className="questionTitleInput"
                maxLength="200"
                placeholder=""
                value={questionTitle}
                onChange={(event) => {
                  setQuestionTitle(event.target.value);
                }}
              ></textarea>
            }

            {state.isPending &&
              <textarea
                className="questionTitleInput"
                disabled
              ></textarea>
            }
          </div>
        </section>

        <section className="questionSection">
          <div className="sectionContainer">
            <h3 className="questionHeader">Elaboration</h3>
            {!state.isPending &&
              <textarea
                className="questionContentInput"
                maxLength="1000"
                placeholder=""
                value={questionContent}
                onChange={(event) => {
                  setQuestionContent(event.target.value);
                }}
              ></textarea>
            }

            {state.isPending &&
              <textarea
                className="questionContentInput"
                disabled
              ></textarea>
            }
          </div>
        </section>

        <button
          type="submit"
          className="submitQuestionTitle"
          onClick={submitHandler}
        >
        Submit OpenQuestion
        </button>

        <input
          onChange={(event) => {
            setQuestionContent(event.target.value);
          }}
          value={questionContent}
        ></input>

        <p className="text-3xl font-bold underline">TEST LOCATION</p>

      </div>
    </div>
  );
}

export default SubmitOpenQ;