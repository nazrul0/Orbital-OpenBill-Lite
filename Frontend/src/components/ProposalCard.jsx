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
import upvote from "../imgs/upvote.png";

function ProposalCard(props) {
  const isNonZero = Boolean(props.upvotes !== 0)

  const upvoteHandler = (e) => {
    // prevents default redirect to viewing proposal when upvote button clicked
    e.preventDefault()
    console.log("i was clicked")


  }
  
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
      color = "bg-edu_pop-100";
      break;
    case "Economic":
      image = moneyImage;
      color = "bg-econ_pop-100";
      break;
    case "Social Welfare":
      image = socialImage;
      color = "bg-social_pop-100";
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
      color = "bg-health_pop-100";
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
        <div className="place-self-end">
          <div className="upvotesContainer flex flex-row p-0 mx-0">
            {isNonZero && (
              <h6 className="mr-1 text-white">{props.upvotes}</h6>
            )}
            <button onClick={upvoteHandler} className="hover:bg-black rounded-md p-1 ">
              <img src={upvote} alt="Upvote Icon" />
            </button>
          </div>
        </div>
      </div>
      <img src={image} alt="Proposal Icon" />
      <h5 className="lg:text-base text-white text-center">{props.title}</h5>
    </div>
  );
}

export default ProposalCard;
