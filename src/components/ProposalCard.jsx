import React from "react";
import "./ProposalCard.css";
import logo from "./imgs/plus.png";

function ProposalCard(props) {
  return (
    <div className="cardContainer">
      <h4 className="author">By {props.author}</h4>
      <img src={logo} alt="Proposal Icon" />
      <h2 className="title">{props.title}</h2>
    </div>
  );
}

export default ProposalCard;
