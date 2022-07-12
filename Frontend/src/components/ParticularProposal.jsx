import React from "react";
import { useLocation } from "react-router-dom";
import "./ParticularProposal.css";
import treeImage from "../imgs/OB(tree).png";
import educationImage from "../imgs/OB(education).png";
import moneyImage from "../imgs/OB(money).png";
import mailImage from "../imgs/OB(mail).png";
import ringImage from "../imgs/OB(ring).png";
import thumbprintImage from "../imgs/OB(thumbprint).png";
import plusImage from "../imgs/OB(plus).png";
import cityImage from "../imgs/OB(city).png";
import busImage from "../imgs/OB(bus).png";
import OB from "../imgs/OB(logo).png";
import PageTitle from "./PageTitle";
import QuillEditor from "./QuillEditor";

function Proposal(props) {
  const location = useLocation();
  const { curr } = location.state;

  let image;
  switch (curr.Category) {
    default:
      image = OB;
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
    case "Social Welfare":
      image = mailImage;
      break;
    case "Gender":
      image = ringImage;
      break;
    case "Privacy/Security":
      image = thumbprintImage;
      break;
    case "Health":
      image = plusImage;
      break;
    case "Housing":
      image = cityImage;
      break;
    case "Transport":
      image = busImage;
      break;
  }

  if(curr.ProposalType === "OpenQuestion")
  {
    return (
      <div>
        <PageTitle title={curr.ProposalType} />
  
        <div className="mainProposalContainer">
          <div className="proposalContainer">
            <section className="proposalHeader">
              <h2 className="proposalTitle">{curr.Title}</h2>
              <h4 className="proposalOwner">By {curr.DisplayName}</h4>
              <img src={image} alt="Category" className="categoryImage" />
              <h4 className="proposalCategory">{curr.Category}</h4>
            </section>
  
            <section className="proposalContent">
              <h3>Question</h3>
              <QuillEditor
                readMode="true"
                payload={JSON.parse(curr.Content)}
              /> 
            </section>

            <section className="proposalContent">
              <h3>Background</h3>
              <QuillEditor
                readMode="true"
                payload={JSON.parse(curr.Background)}
              /> 
            </section>
          </div>
        </div>
      </div>
    );
  }
  else{
    return (
      <h3>
        An openbill- TBD
      </h3>
    );
  }
  
}

export default Proposal;
