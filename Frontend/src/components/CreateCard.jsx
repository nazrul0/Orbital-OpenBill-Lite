import React from "react";
import "./CreateCard.css";
import logo from "../imgs/plus.png";

const CreateCard = (props) => {
  return (
    <div className="createCardContainer">
      <div className="createCardIconContainer">
        <img className="createCardIcon" src={logo} alt="Option Icon" />
      </div>
      <button className="createType">{props.type}</button>
    </div>
  );
};

export default CreateCard;
