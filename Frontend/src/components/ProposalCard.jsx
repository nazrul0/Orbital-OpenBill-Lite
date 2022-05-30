import React from "react";
import "./ProposalCard.css";
import logo from "./imgs/plus.png";

function ProposalCard(props) {
  return (
    <div className="cardContainer">
      <h5 className="author">By {props.author}</h5>
      <img src={logo} alt="Proposal Icon" />
      <h3 className="title">{props.title}</h3>
    </div>
  );
}

export default ProposalCard;
