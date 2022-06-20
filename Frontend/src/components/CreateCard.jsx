import React from "react";
import "./CreateCard.css";
import logo from "../imgs/plus.png";
import { Link } from "react-router-dom";

const CreateCard = (props) => {
  return (
    <div className="createCardContainer">
      <div className="createCardIconContainer">
        <img className="createCardIcon" src={logo} alt="Option Icon" />
      </div>
      <button
        className="createType"
        onClick={() => this.nextPath("./SubmitOpenQuestion")}
      >
        {props.type}
      </button>
    </div>
  );
};

export default CreateCard;
