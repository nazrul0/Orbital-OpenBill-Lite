import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useEffect } from "react";
import { useState } from "react";
import { useCrud } from "../hooks/useCRUD";

function EditProposalQ(props) {
  const location = useLocation();
  const nav = useNavigate();

  // on load, checks whether you got to this route legally
  useEffect(() => {
    if(!location.state){
      nav("/ProposalsHome")
    }
  }, []); 

  //openQUES RELATED STATES TO UPDATE
  const [questionContent, setQuestionContent] = useState("");
  const [questionBackground, setQuestionBackground] = useState("");

  // CRUD hook
  const { updateDoc, state } = useCrud("OpenQuestions");

  // to only render if there is a location.state
  if(location.state !== null){
    const { curr } = location.state;

    const edits = {
      Content: questionContent,
      Background: questionBackground,
    }

    // CRUD update function
    const updateHandlerQ = (event) => {
      //console.log("test");
      updateDoc(curr.id, edits);
      nav(-1);
    };
    
    let image;
    let colour;
    switch (curr.Category) {
      default:
        image = OB;
        break;
      case "Environment":
        image = treeImage;
        colour = "env_pop-100";
        break;
      case "Education":
        image = educationImage;
        colour = "edu_pop-100";
        break;
      case "Economic":
        image = moneyImage;
        colour = "econ_pop-100";
        break;
      case "Social Welfare":
        image = mailImage;
        colour = "social_pop-100";
        break;
      case "Gender":
        image = ringImage;
        colour = "gender_pop-100";
        break;
      case "Privacy/Security":
        image = thumbprintImage;
        colour = "priv_pop-100";
        break;
      case "Health":
        image = plusImage;
        colour = "health_pop-100";
        break;
      case "Housing":
        image = cityImage;
        colour = "housing_pop-100";
        break;
      case "Transport":
        image = busImage;
        colour = "housing_pop-100";
        break;
    }

    return (
      <div className="font-main bg-slate-100">
        <PageTitle title={curr.ProposalType} />
  
        <div className="mainProposalContainer py-10">
          <div className="proposalContainer">
            <section className="proposalHeader bg-black text-white">
              <h2 className="proposalTitle">{curr.Title}</h2>
              <h4 className="proposalOwner">By {curr.DisplayName}</h4>
              <img src={image} alt="Category" className="categoryImage" />
              <h5 className="proposalCategory ">{curr.Category}</h5>
            </section>

            {!state.isPending &&
              <button className={`py-1 px-6 mx-1 rounded-full place-self-end bg-${colour}`} onClick={updateHandlerQ}>Update</button>
            }
  
            <section className="proposalContent">
              <h3>Question</h3>
              <QuillEditor
                readMode={false}
                payload={JSON.parse(curr.Content)}
                sendUp={setQuestionContent}
              /> 
            </section>

            <section className="proposalContent">
              <h3>Background</h3>
              <QuillEditor
                readMode={false}
                payload={JSON.parse(curr.Background)}
                sendUp={setQuestionBackground}
              /> 
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProposalQ;
