import React from "react";
//import "./LandingPage.css";
import constellation from "../imgs/constellation.png";
import map from "../imgs/map.png";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="md:w-2/3 w-10/12 my-6">
        <img src={constellation} alt="Openbill Constellation" className="mb-4"/>  
        <h2 className="pt-8 font-title center md:text-6xl mb-10">Legislative change that begins with you.</h2>
        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate("/ProposalsHome");
            }}
            type="button"
            className="mx-2 px-8 py-1 bg-black text-white text-xs font-semibold uppercase rounded-md"
          >See what's latest
          </button>
        </div>
        <div className="px-10 py-3">
          <img id="map" src={map} alt="map" />
        </div>
      </div>
      <div className="bg-black w-full -mt-24 drop-shadow-2xl">
        <div className="mt-12 mb-6 mx-10 py-2 bg-black uppercase tracking-widest rounded-lg drop-shadow-2xl text-teal-300 center font-title">
          <h3 className="md:text-4xl">Yes- you can make a real impact.</h3>
        </div>
        <div className="lg:landingExplainer1 text-white mx-20 mb-10 px-8 font-main font-medium text-center ">
          <p>
            What if there was a way for your thoughts on social and policy
            issues to have a more real impact- as ideas contributing to policy
            discourse? That's the question we set out to answer- and by building the only
            crowdsourced policy recommendation and feedback platform in
            Singapore, we're hoping to empower you to do just that.
          </p>
          <p className="mt-8">Get creating on Openbill today.</p>
        </div>
        <div className="center">
          <button
            onClick={() => {
              navigate("/faq");
            }}
            type="button"
            className="m-2 pl-8 p-1 pr-8 bg-white text-black text-sm font-semibold rounded-md"
          >
          Read the full FAQ
          </button>
          <button
            onClick={() => {
              navigate("/Signup");
            }}
            type="button"
            className="m-2 pl-10 p-1 pr-10 bg-white text-black text-sm font-semibold rounded-md"
          >
          Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
