import React, { useState } from "react";
import PageTitle from "../PageTitle";
import Data from "../FaqData";
import "./Faq.css";

function Faq() {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <div>
      <PageTitle title="Frequently Asked Questions" />
      <div className="accordionContainer">
        {Data.map((item, index) => {
          return (
            <div className="questionSet">
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
    </div>
  );
}

export default Faq;
