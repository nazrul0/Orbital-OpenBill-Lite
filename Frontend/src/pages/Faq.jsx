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
      <PageTitle title="Frequently asked questions " className="text-center" />
      <div className="accordionContainer w-screen mt-4">
        {Data.map((item, index) => {
          return (
            <div className="questionSet bg-white w-4/5 md:w-3/4 lg:w-2/3 ">
              <div
                className="faqQuestion "
                onClick={() => toggle(index)}
                key={index}
              >
                <h3 className="text-xl md:text-2xl">{item.question}</h3>
              </div>
              {clicked === index ? (
                <div className="faqAnswer ">
                  <p className="text-base md:text-lg lg:text-xl">
                    {item.answer}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <Link
        id="shareLink"
        className="navItem bg-indigo-200 text-white rounded-lg px-5 py-2 h-4 mb-3"
        to="/SubmitFAQ"
      >
        Have further queries for the OpenBill team?
      </Link>
    </div>
  );
}

export default Faq;
