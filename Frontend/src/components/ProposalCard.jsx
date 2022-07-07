import React from "react";
import "./ProposalCard.css";
import treeImage from "../imgs/OB(tree).png";
import educationImage from "../imgs/OB(education).png";
import moneyImage from "../imgs/OB(money).png";
import mailImage from "../imgs/OB(mail).png";
import ringImage from "../imgs/OB(ring).png";
import thumbprintImage from "../imgs/OB(thumbprint).png";
import plusImage from "../imgs/OB(plus).png";
import cityImage from "../imgs/OB(city).png";
import busImage from "../imgs/OB(bus).png";

function ProposalCard(props) {
  let image;
  switch (props.category) {
    default:
      break;
    case "Environment":
      image = treeImage;
      break;
    case "Education":
      image = educationImage;
      break;
    case "Economic":
      image = moneyImage;
      break;
    case "Financial":
      image = moneyImage;
      break;
    case "Social Welfare":
      image = mailImage;
      break;
    case "Gender":
      image = ringImage;
      break;
    case "Privacy/Security":
      image = thumbprintImage;
      break;
    case "Healthcare":
      image = plusImage;
      break;
    case "Infrastructure":
      image = cityImage;
      break;
    case "Transport":
      image = busImage;
      break;
  }
  return (
    <div className="cardContainer">
      <h6 className="author">By {props.author}</h6>
      <h5 className="proposalCategory">{props.category}</h5>
      <img src={image} alt="Proposal Icon" />
      <h4 className="title">{props.title}</h4>
    </div>
  );
}

export default ProposalCard;
