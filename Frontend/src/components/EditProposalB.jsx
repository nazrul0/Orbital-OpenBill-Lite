import React from "react";
import { useNavigate } from "react-router-dom";
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
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDoc } from "../hooks/useDoc";
import { useCrud } from "../hooks/useCRUD";
import { useState } from "react";
import { useEffect } from "react";

function EditProposalB(props) {
  const { id, type } = useParams();
  const { user } = useAuthContext();
  const { currDoc } = useDoc(`${type}s`, id);
  const { updateDoc } = useCrud(`${type}s`);
  const nav = useNavigate();

  // STATE OF ALL THE OPENB FIELDS
  const [relatedLaws, setRelatedLaws] = useState("");
  const [currentProbs, setCurrentProbs] = useState("");
  const [summary, setSummary] = useState("");
  const [elabHow, setElabHow] = useState("");
  const [elabWhy, setElabWhy] = useState("");
  const [bibliography, setBibliography] = useState("");

  // Update Handler Function
  const updateHandlerB = () => {
    
    if(relatedLaws === ""){
      alert("Related laws is a required field");
      return;
    }

    if(currentProbs === ""){
      alert("currentProb is a required field");
      return;
    }

    if(summary === ""){
      alert("summary is a required field");
      return;
    }

    if(elabHow === ""){
      alert("Elaboration part 1 is a required field");
      return;
    }

    //console.log(relatedLaws);
    updateDoc(id, {
      RelatedLaws: relatedLaws,
      CurrentProblems: currentProbs,
      Summary: summary,
      Elaboration1: elabHow,
      Elaboration2: elabWhy,
      Bibliography: bibliography
    })
    
    nav(-1);
  };

  // run at start to initialise the states
  useEffect(() => {
    if(currDoc !== null){
      setRelatedLaws(currDoc.RelatedLaws);
      setCurrentProbs(currDoc.CurrentProblems);
      setSummary(currDoc.Summary);
      setElabHow(currDoc.Elaboration1);
      setElabWhy(currDoc.Elaboration2);
      setBibliography(currDoc.Bibliography);
    }
  }, [currDoc]);

  // testing relic
  // useEffect(() => {
  //   console.log(relatedLaws);
  // }, [relatedLaws]);


  // ------------------------------------------
  // only render anything when currDoc not null
  if(currDoc !== null){

    // Declaring the colours
    let image;
    let colour;

    switch (currDoc.Category) {
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
      case "Identity":
        image = ringImage;
        colour = "violet-500";
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

    // block non-owners of proposal from accessing route
    if (currDoc.OwnerID === user.uid) {
      return (
        <div className="font-main bg-slate-100">
          <PageTitle title={currDoc.ProposalType} />
          <div className="mainProposalContainer py-10">
            <div className="proposalContainer">
              <section className="proposalHeader bg-black text-white">
                <h2 className="proposalTitle">{currDoc.Title}</h2>
                <h4 className="proposalOwner">By {currDoc.DisplayName}</h4>
                <img src={image} alt="Category" className="categoryImage" />
                <h5 className="proposalCategory ">{currDoc.Category}</h5>
              </section>

              <button className={`py-1 px-6 mx-1 text-black rounded-full place-self-end font-semibold bg-${colour}`} onClick={updateHandlerB}>Update</button>
                  
              <section className="proposalContent">
                <h3>Related Laws</h3>
                <QuillEditor
                  readMode={false}
                  payload={JSON.parse(currDoc.RelatedLaws)}
                  sendUp={setRelatedLaws}
                /> 
              </section>
    
              <section className="proposalContent">
                <h3>Current Problems</h3>
                <QuillEditor
                  readMode={false}
                  payload={JSON.parse(currDoc.CurrentProblems)}
                  sendUp={setCurrentProbs}
                /> 
              </section>
    
              <section className="proposalContent">
                <h3>Summary of Recommendations</h3>
                <QuillEditor
                  readMode={false}
                  payload={JSON.parse(currDoc.Summary)}
                  sendUp={setSummary}
                /> 
              </section>
    
              <section className="proposalContent">
                <h3>Elaboration: Implementation</h3>
                <QuillEditor
                  readMode={false}
                  payload={JSON.parse(currDoc.Elaboration1)}
                  sendUp={setElabHow}
                /> 
              </section>
    
              {currDoc.Elaboration2 !== "" && (
                <section className="proposalContent">
                  <h3>Elaboration: Part 2</h3>
                  <QuillEditor
                    readMode={false}
                    payload={JSON.parse(currDoc.Elaboration2)}
                    sendUp={setElabWhy}
                  /> 
                </section>
              )}
    
              {currDoc.Elaboration2 === "" && (
                <section className="proposalContent">
                  <h3>Elaboration: Part 2</h3>
                  <QuillEditor
                    readMode={false}
                    payload={""}
                    sendUp={setElabWhy}
                  /> 
                </section>
              )}
    
              {currDoc.Bibliography !== "" && (
                <section className="proposalContent">
                  <h3>Bibliography</h3>
                  <QuillEditor
                    readMode={false}
                    payload={JSON.parse(currDoc.Elaboration2)}
                    sendUp={setBibliography}
                  /> 
                </section>
              )}
    
              {currDoc.Bibliography === "" && (
                <section className="proposalContent">
                  <h3>Bibliography</h3>
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
    else {
      return (
        <div className="py-20 text-center bg-slate-100 font-title">
          <h3>Unauthorised.</h3>
        </div>
      );
    }
  }
  else{
    return(
      <div className="py-20 w-full text-center bg-slate-100 font-title">
        <h3>Retreieving data...</h3>
      </div>
    )
  }
  
}
export default EditProposalB;
