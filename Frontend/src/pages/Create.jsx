import React from "react";
import PageTitle from "../components/PageTitle";
import logo from "../imgs/plus.png";
import gavel from "../imgs/OB(gavel).png";
import mic from "../imgs/OB(mic).png";
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

          <div>
            <Link className="createCardContainer" to="/SubmitOpenQuestion">
              <h3 className="createType">OpenQuestion</h3>
              <img className="createCardIcon" src={mic} alt="Option Icon" />
            </Link>
          </div>

          <div>
            <Link className="createCardContainer" to="/SubmitOpenBill">
              <h3 className="createType">OpenBill</h3>
              <img className="createCardIcon" src={gavel} alt="Option Icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
