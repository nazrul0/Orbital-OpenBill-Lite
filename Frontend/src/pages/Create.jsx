import React from "react";
import PageTitle from "../components/PageTitle";
import logo from "../imgs/plus.png";
import "./Create.css";
import { Link } from "react-router-dom";

function Create() {
  return (
    <div className="bg-slate-100 h-screen">
      <PageTitle title="Create" />
      <div className="createContainer">
        <div className="createBody">
          {/* <CreateCard
            className="createType"
            link="./SubmitOpenQ"
            type="OpenQuestion"
          />
          <CreateCard className="createType" type="OpenMotion" />
          <CreateCard className="createType" type="OpenBill" /> */}
          <div className="createCardContainer">
            <div className="createCardIconContainer">
              <img className="createCardIcon" src={logo} alt="Option Icon" />
            </div>
            <Link className="createType" to="/SubmitOpenQuestion">
              OpenQuestion
            </Link>
          </div>
          <div className="createCardContainer">
            <div className="createCardIconContainer">
              <img className="createCardIcon" src={logo} alt="Option Icon" />
            </div>
            <Link className="createType" to="/SubmitOpenBill">
              OpenBill
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
