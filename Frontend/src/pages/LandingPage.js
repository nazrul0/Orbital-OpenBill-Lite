import React from "react";
import "./LandingPage.css";
import constellation from "../imgs/constellation.png";
import map from "../imgs/map.png";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="containerFluid">
        {/* Landing Title
        Contains title, as well as the 2 carousels (proposals and articles) [todo] */}
        <section className="title">
          <img src={constellation} alt="Openbill Constellation" />

          <div className="center">
            <h1 className="pt-6 pb-6">Legislative change that begins with you.</h1>
            <div>
              <button
                onClick={() => {
                  navigate("/faq");
                }}
                type="button"
                className="m-2 pl-10 p-1 pr-10 bg-black text-white text-xs font-semibold uppercase rounded-md"
              >Learn how
              </button>
              <button
                onClick={() => {
                  navigate("/ProposalsHome");
                }}
                type="button"
                className="m-2 pl-8 p-1 pr-8 bg-black text-white text-xs font-semibold uppercase rounded-md"
              >See what's latest
              </button>
            </div>
          </div>

          <div>
            <img id="map" src={map} alt="map" />
          </div>
        </section>
      </div>

      <div>
        {/* Call to action section */}
        <section id="call-to-action">
          <div className="col">
            <h2 className="action_header">Yes- you can make a real impact</h2>
          </div>

          <div className="col">
            <p className="action-text left">
              What if there was a way for your thoughts on social and policy
              issues to have a more real impact- as ideas contributing to policy
              discourse?
            </p>

            <p className="action-text">
              That's the question we set out to answer- and by building the only
              crowdsourced policy recommendation and feedback platform in
              Singapore, we're hoping to empower you to do just that.
            </p>

            <p className="action-text">Get creating on Openbill today.</p>

            <button
              onClick={() => {
                navigate("/faq");
              }}
              type="button"
              className="m-2 pl-8 p-1 pr-8 bg-white text-black text-xs font-semibold rounded-md"
            >
              Read the full FAQ
            </button>
            <button
              onClick={() => {
                navigate("/Signup");
              }}
              type="button"
              className="m-2 pl-10 p-1 pr-10 bg-white text-black text-xs font-semibold rounded-md"
            >
              Sign up
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
