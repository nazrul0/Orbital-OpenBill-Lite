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
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCrud } from "../hooks/useCRUD";


function Proposal(props) {
  const location = useLocation();
  const { curr } = location.state || {};
  const { user } = useAuthContext();
  const isOwner = Boolean(curr.OwnerID === user.uid);

  const { deleteDoc, updateDoc, readSingleDoc, state } = useCrud(`${curr.ProposalType}s`);
  const nav = useNavigate()



  
  // only delete needs handler, update button is a Link to the update route
  const deleteHandler = (event) => {
    // //console.log(`${curr.ProposalType}s`);
    deleteDoc(curr.id);
    nav("/ProposalsHome");
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

  if(curr.ProposalType === "OpenQuestion")
  {
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

            {user && (isOwner && (
                <div className="flex place-self-end mt-2 font-semibold">
                  <button className={`py-1 px-6 mx-1 rounded-full bg-${colour}`} onClick={deleteHandler}>Delete</button>
                  <Link 
                    to={`/ProposalsHome/${curr.id}/editQ`}
                    key={curr.id}
                    state={{ curr: curr }}
                  >
                    <button className={`py-1 px-8 mx-1 rounded-full bg-${colour}`}>Edit</button>
                  </Link>
                </div>
              ))}
  
            <section className="proposalContent">
              <h3>Question</h3>
              <QuillEditor
                readMode={true}
                payload={JSON.parse(curr.Content)}
              /> 
            </section>

            <section className="proposalContent">
              <h3>Background</h3>
              <QuillEditor
                readMode={true}
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
          
              {user && (isOwner && (
                <div className="flex place-self-end mt-2 font-semibold">
                  {!state.isPending && (
                    <button className={`py-1 px-6 mx-1 rounded-full bg-${colour}`} onClick={deleteHandler}>Delete</button>
                  )}
                  {state.isPending && (
                    <button className={`py-1 px-6 mx-1 rounded-full bg-${colour}`} disabled>Delete</button>
                  )}
                  <Link 
                    to={`/ProposalsHome/${curr.id}/editB`}
                    key={curr.id}
                    state={{ curr: curr, action: "edit" }}
                  >
                    <button className={`py-1 px-8 mx-1 rounded-full bg-${colour}`}>Edit</button>
                  </Link>
                </div>
              ))}
                
            <section className="proposalContent">
              <h3>Related Laws</h3>
              <QuillEditor
                readMode={true}
                payload={JSON.parse(curr.RelatedLaws)}
              /> 
            </section>

            <section className="proposalContent">
              <h3>Current Problems</h3>
              <QuillEditor
                readMode={true}
                payload={JSON.parse(curr.CurrentProblems)}
              /> 
            </section>

            <section className="proposalContent">
              <h3>Summary of Recommendations</h3>
              <QuillEditor
                readMode={true}
                payload={JSON.parse(curr.Summary)}
              /> 
            </section>

            <section className="proposalContent">
              <h3>Elaboration: Implementation</h3>
              <QuillEditor
                readMode={true}
                payload={JSON.parse(curr.Elaboration1)}
              /> 
            </section>

            {!(curr.Elaboration2 === "") && (
              <section className="proposalContent">
                <h3>Elaboration: Part 2</h3>
                <QuillEditor
                  readMode={true}
                  payload={JSON.parse(curr.Elaboration2)}
                /> 
              </section>
            )}

            {!(curr.Bibliography === "") && (
              <section className="proposalContent">
                <h3>Bibliography</h3>
                <QuillEditor
                  readMode={true}
                  payload={JSON.parse(curr.Bibliography)}
                /> 
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }
  
}

export default Proposal;
