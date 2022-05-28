import React from "react";
import "./LandingPage.css";
import constellation from "../imgs/constellation.png";
import map from "../imgs/map.png";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="containerFluid">
        {/* Landing Title
        Contains title, as well as the 2 carousels (proposals and articles) [todo] */}
        <section className="title">
          <img src={constellation} alt="Openbill Constellation" />

          <div>
            <h1 className="SpaceG">Legislative change that begins with you.</h1>
            <div className="buttons">
              <button
                onClick={() => {
                  navigate("/faq");
                }}
                type="button"
                className="rounded-black-btn"
              >
                Learn how
              </button>
              <button
                onClick={() => {
                  navigate("/ProposalsHome");
                }}
                type="button"
                className="rounded-black-btn"
              >
                See what's latest
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
            <p className="action-text">
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

            <button type="button">Read the full FAQ</button>
            <button type="button">Sign up</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
