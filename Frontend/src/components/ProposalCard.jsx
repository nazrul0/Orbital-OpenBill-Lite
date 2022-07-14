import React from "react";
import "./ProposalCard.css";
import treeImage from "../imgs/white-env.png";
import educationImage from "../imgs/white-edu.png";
import moneyImage from "../imgs/white-econ.png";
import socialImage from "../imgs/white-social.png";
import ringImage from "../imgs/white-gender.png";
import thumbprintImage from "../imgs/white-priv.png";
import plusImage from "../imgs/white-health.png";
import cityImage from "../imgs/white-housing.png";
import busImage from "../imgs/white-transport.png";
import OB from "../imgs/OB(logo).png";

function ProposalCard(props) {
  let image;
  let color;
  switch (props.category) {
    default:
      image = OB;
      break;
    case "Environment":
      image = treeImage;
      color = "bg-env_pop-100";
      break;
    case "Education":
      image = educationImage;
      color = "bg-purple-400";
      break;
    case "Economic":
      image = moneyImage;
      color = "bg-econ_pop-100";
      break;
    case "Social Welfare":
      image = socialImage;
      color = "bg-cyan-300";
      break;
    case "Gender":
      image = ringImage;
      color = "bg-violet-500";
      break;
    case "Privacy/Security":
      image = thumbprintImage;
      color = "bg-priv_pop-100";
      break;
    case "Health":
      image = plusImage;
      color = "bg-indigo-400";
      break;
    case "Housing":
      image = cityImage;
      color = "bg-housing_pop-100";
      break;
    case "Transport":
      image = busImage;
      color = "bg-transport_pop-100";
      break;
  }
  return (
    <div className={`cardContainer rounded-xl ${color}`}>
      <div className="grid grid-cols-2">
        <h6 className="text-white">By {props.author}</h6>
        <h6 className="justify-self-end">Up</h6>
      </div>
      <img src={image} alt="Proposal Icon" className=" mt-1"/>
      <h5 className="lg:text-base text-white text-center">{props.title}</h5>
      
    </div>
  );
}

export default ProposalCard;
