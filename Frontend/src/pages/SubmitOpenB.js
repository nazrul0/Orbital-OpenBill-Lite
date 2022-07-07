import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenB.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";

function SubmitOpenB() {
  const [billTitle, setBillTitle] = useState("");
  const [billContent, setBillContent] = useState("");
  //const [billCategory, setBillCategory] = useState("");
  const { addDoc, state } = useCrud("OpenBills");
  const { user } = useAuthContext(); // importing user to get access to uid field on the user object

  const submitHandler = (event) => {
    event.preventDefault();
    // getting the Owner id
    const id = user.uid;

    // destructured addDoc hence can be directly used
    // by passing in the doc argument expected
    addDoc({
      Title: billTitle,
      Content: billContent,
      Category: "test",
      OwnerID: id,
    });
  };

  // refreshing form once submitted
  useEffect(() => {
    if (state.success) {
      setBillTitle("");
      setBillContent("");
      alert("Submitted!");
    }
  }, [state.success]); // will only fire when success property changes


  return (
    <div>
      <PageTitle title="Submit an OpenBill" />
      <form>
        <div className="submitBillContainer">
          {/* <section className="questionSection">Category?</section> */}
          <section className="billSection">
            <div className="billContainer">
              <h3 className="billHeader">OpenBill Title</h3>
              {!state.isPending && (
                <textarea
                  className="billTitleInput"
                  maxLength="200"
                  placeholder=""
                  value={billTitle}
                  onChange={(event) => {
                    setBillTitle(event.target.value);
                  }}
                  required
                ></textarea>
              )}

              {state.isPending && (
                <textarea className="billTitleInput" disabled></textarea>
              )}
            </div>
          </section>

          <section className="billSection">
            <div className="billContainer">
              <h3 className="billHeader">Elaboration</h3>
              {!state.isPending && (
                <textarea
                  className="billContentInput"
                  maxLength="1000"
                  placeholder=""
                  value={billContent}
                  onChange={(event) => {
                    setBillContent(event.target.value);
                  }}
                  required
                ></textarea>
              )}

              {state.isPending && (
                <textarea className="billContentInput" disabled></textarea>
              )}
            </div>
          </section>

          <button
            type="submit"
            className="submitBillTitle"
            onClick={submitHandler}
          >
            Submit OpenBill
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitOpenB;
