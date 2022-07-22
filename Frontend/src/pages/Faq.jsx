import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import Data from "../components/FaqData";
import "./Faq.css";
import { Link } from "react-router-dom";
import indra from "../imgs/About1.png";
import naz from "../imgs/About2.png";
import linkedin from "../imgs/linkedin.png";

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
      <div className="bg-black w-full text-white flex flex-col items-center">
        <div className="pt-6 font-title mt-4 mb-10">
          <h2>About the team</h2>
        </div>

        <div className="grid lg:grid-cols-5 sm:grid-cols-3 mx-12">
          <div className="lg:col-start-2 sm:col-start-1 col-span-1 my-4">
            <img
              src={indra}
              alt="Indraneel Paranjape"
            />
          </div>

          <div className="lg:col-start-3 sm:col-start-2 lg:col-span-2 sm:col-span-2 my-8 ml-16">
            <h4 className="font-title">
              Indraneel Paranjape
            </h4>
            <h5 className="font-title font-light">
              Founder, Software Development Co-Lead
            </h5>
            <h5 className="font-main font-light mt-6 text-sm tracking-wide">
              Prefers his apps like his pancakes: fully stacked
            </h5>
            <a href="https://www.linkedin.com/in/indraneel-p/">
              <img
                src={linkedin}
                alt="Linkedin"
                className="mt-8 w-8"
              />
            </a>
          </div>

          <div className="lg:col-start-2 sm:col-start-1 col-span-1 my-8">
            <img
              src={naz}
              alt="Nazrul Syahmi"
            />
          </div>

          <div className="lg:col-start-3 sm:col-start-2 lg:col-span-2 sm:col-span-2 mt-12 ml-16">
            <h4 className="font-title">
              Nazrul Syahmi
            </h4>
            <h5 className="font-title font-light">
              Software Development Co-Lead
            </h5>
            <h5 className="font-main font-light text-sm mt-6 tracking-wide">
              Console.log("Only speaks in javascript")
            </h5>
            <a href="https://www.linkedin.com/in/nazrulsyahmi/">
              <img
                src={linkedin}
                alt="Linkedin"
                className="mt-8 w-8"
              />
            </a>

            
          </div>

        </div>

        <div className="pb-10 pt-10">
          <Link
            id=""
            className="bg-slate-300 text-black py-1 px-5 rounded-full mb-6 font-main font-light justify-self-center"
            to="/SubmitFAQ"
          >
          Further queries? Ask here.
          </Link>
          <Link
            id=""
            className="bg-slate-300 text-black py-1 px-5 rounded-full mb-6 font-main font-light justify-self-cente mx-4"
            to="/SubmitFAQ"
          >
          View privacy policy.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Faq;
