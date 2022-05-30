import React from "react";
import "./ProposalCard.css";
import logo from "./imgs/plus.png";

function ProposalCard(props) {
  return (
    <div className="cardContainer">
      <h6 className="author">By {props.author}</h6>
      <img src={logo} alt="Proposal Icon" />
      <h4 className="title">{props.title}</h4>
    </div>
  );
}

export default ProposalCard;
