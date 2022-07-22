import React from "react";
//import "./LandingPage.css";
import constellation from "../imgs/constellation.png";
import map from "../imgs/map.png";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-slate-100">
      <div className="md:w-2/3 w-10/12 my-6">
        <img
          src={constellation}
          alt="Openbill Constellation"
          className="mb-4"
        />
        <h2 className="pt-8 font-title text-center md:text-6xl mb-10">
          Legislative change that begins with you.
        </h2>
        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate("/ProposalsHome");
            }}
            type="button"
            className="mx-2 px-8 py-1 bg-black text-white text-xs font-semibold uppercase rounded-md"
          >
            See what's latest
          </button>
        </div>
        <div className="px-10 py-3">
          <img id="map" src={map} alt="map" />
        </div>
      </div>
      <div className="bg-black w-full -mt-24 drop-shadow-2xl">
        <div className="mt-12 mb-6 mx-10 py-2 bg-black uppercase tracking-widest rounded-lg drop-shadow-2xl text-teal-300 text-center font-title">
          <h3 className="md:text-4xl">Yes- you can make a real impact.</h3>
        </div>
        <div className="lg:landingExplainer1 leading-loose text-white sm:mx-20 mx-8 mb-10 px-8 font-main font-medium text-center ">
          <p>
            What if there existed a way, far more real than spreading awareness
            on social media, for you to constructively impact the social and
            policy issues that matter to you? What if there existed a platform
            to facilitate the expression of such ideas? These were, and remain, 
            the central questions that undergirded the genesis of OpenBill. Today, by building the first crowdsourced
            policy recommendation and feedback platform in Singapore, we're
            hoping to answer those two questions- and empower you to do the
            same.
          </p>
          <p className="mt-8">Get creating on Openbill today.</p>
        </div>
        <div className="text-center">
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
