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
import { useAuthContext } from "../hooks/useAuthContext";

function EditProposalB(props) {
  const location = useLocation();
  const nav = useNavigate();
  const { curr } = location.state || {};
  const { user } = useAuthContext();
  const { updateDoc, state } = useCrud("OpenBills");

  // openBILL RELATED STATES TO UPDATE
  const [relatedLaws, setRelatedLaws] = useState(curr.relatedLaws);
  const [currentProbs, setCurrentProbs] = useState(curr.CurrentProblems);
  const [summary, setSummary] = useState(curr.Summary);
  const [elabHow, setElabHow] = useState(curr.elabHow);
  const [elabWhy, setElabWhy] = useState(curr.elabWhy);
  const [bibliography, setBibliography] = useState(curr.Bibliography);

  //on load, checks whether you got to this route legally
  useEffect(() => {
    if(!location.state){
      nav("/ProposalsHome")
    }
  }, []); 

  // useEffect(() => {
  //   console.log(relatedLaws);
  // }, [relatedLaws]);

  const hi = (event) => {
    
  }

  const updateHandlerB = (event) => {
    event.preventDefault();
    console.log(currentProbs);
    
    // if(relatedLaws === "" || currentProbs === "" || summary=== "" || elabHow === ""){
    //   alert("Required fields: Title, related laws, current problem, summary, elaboration section 1");
    //   return;
    // }
    // console.log(relatedLaws);
    return updateDoc(curr.id, {
      CurrentProblems: currentProbs,
      Summary: summary,
    });
    //nav(-1);
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

  if(!(curr.OwnerID === user.uid)){
    return (
      <div className="text-center m-3">
        <h3>Unauthorised.</h3>
      </div>
    );
  }else{
    return (
      <div className="font-main bg-slate-100">
        <PageTitle title={curr.ProposalType} />
        <button className="transparent center" onClick={hi}>
          <div className="bg-cyan-300 p-4 m-4">
            <h4>hi</h4>
          </div>
        </button>
       
       <div className="mainProposalContainer py-10">
          <div className="proposalContainer">
            <section className="proposalHeader bg-black text-white">
              <h2 className="proposalTitle">{curr.Title}</h2>
              <h4 className="proposalOwner">By {curr.DisplayName}</h4>
              <img src={image} alt="Category" className="categoryImage" />
              <h5 className="proposalCategory ">{curr.Category}</h5>
            </section>
  
            {!state.isPending &&
              <button className={`py-1 px-6 mx-1 rounded-full place-self-end bg-${colour}`} onClick={updateHandlerB}>Update</button>
            }
                
            <section className="proposalContent">
              <h3>Related Laws</h3>
              <QuillEditor
                readMode={false}
                payload={JSON.parse(curr.RelatedLaws)}
                sendUp={setRelatedLaws}
              /> 
            </section>
  
            <section className="proposalContent">
              <h3>Current Problems</h3>
              <QuillEditor
                readMode={false}
                payload={JSON.parse(curr.CurrentProblems)}
                sendUp={setCurrentProbs}
              /> 
            </section>
  
            <section className="proposalContent">
              <h3>Summary of Recommendations</h3>
              <QuillEditor
                readMode={false}
                payload={JSON.parse(curr.Summary)}
                sendUp={setSummary}
              /> 
            </section>
  
            <section className="proposalContent">
              <h3>Elaboration: Implementation</h3>
              <QuillEditor
                readMode={false}
                payload={JSON.parse(curr.Elaboration1)}
                sendUp={setElabHow}
              /> 
            </section>
  
            {curr.Elaboration2 !== "" && (
              <section className="proposalContent">
                <h3>Elaboration: Part 2</h3>
                <QuillEditor
                  readMode={false}
                  payload={JSON.parse(curr.Elaboration2)}
                  sendUp={setElabWhy}
                /> 
              </section>
            )}
  
            {curr.Elaboration2 === "" && (
              <section className="proposalContent">
                <h3>Elaboration: Part 2</h3>
                <QuillEditor
                  readMode={false}
                  payload={""}
                  sendUp={setElabWhy}
                /> 
              </section>
            )}
  
            {curr.Bibliography !== "" && (
              <section className="proposalContent">
                <h3>Elaboration: Part 2</h3>
                <QuillEditor
                  readMode={false}
                  payload={JSON.parse(curr.Elaboration2)}
                  sendUp={setBibliography}
                /> 
              </section>
            )}
  
            {curr.Bibliography === "" && (
              <section className="proposalContent">
                <h3>Elaboration: Part 2</h3>
                <QuillEditor
                  readMode={false}
                  payload={""}
                  sendUp={setBibliography}
                /> 
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EditProposalB;
