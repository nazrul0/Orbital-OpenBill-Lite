import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import Data from "../components/FaqData";
import "./Faq.css";
import { Link } from "react-router-dom";

function Faq() {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <div className="faqPage bg-slate-100">
      <PageTitle title="Frequently Asked Questions" />
      <div className="accordionContainer">
        {Data.map((item, index) => {
          return (
            <div className="questionSet bg-white">
              <div
                className="faqQuestion"
                onClick={() => toggle(index)}
                key={index}
              >
                <h3>{item.question}</h3>
              </div>
              {clicked === index ? (
                <div className="faqAnswer">
                  <p>{item.answer}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <Link id="shareLink" className="navItem" to="/SubmitFAQ">
        Have a question for the OpenBill team?
      </Link>
    </div>
  );
}

export default Faq;
