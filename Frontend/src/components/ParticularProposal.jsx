import React from "react";
import "./ParticularProposal.css";
import treeImage from "../imgs/OB(tree).png";
import educationImage from "../imgs/OB(education).png";
import moneyImage from "../imgs/OB(money).png";
import socialImage from "../imgs/OB(social).png";
import ringImage from "../imgs/OB(ring).png";
import thumbprintImage from "../imgs/OB(thumbprint).png";
import plusImage from "../imgs/OB(healthcare).png";
import cityImage from "../imgs/OB(city).png";
import busImage from "../imgs/OB(bus).png";
import OB from "../imgs/OB(logo).png";
import PageTitle from "./PageTitle";
import QuillEditor from "./QuillEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCrud } from "../hooks/useCRUD";
import { useDoc } from "../hooks/useDoc";
import { Link } from "react-router-dom";
import map from "../imgs/map.png";
import { projFirestore } from "../config/firebase";

function Proposal(props) {
  const { id, type } = useParams();
  const { user } = useAuthContext();
  const { deleteDoc } = useCrud(`${type}s`);
  const { currDoc } = useDoc(`${type}s`, id);
  const nav = useNavigate();

  // only render anything when currDoc not null
  if(user){
    if(currDoc !== null){
    
      let image;
      let colour;
      const isOwner = Boolean(currDoc.OwnerID === user.uid)
      
      const deleteHandler = async () => {
        // nav back FIRST. since after deleting, fields will become undefined/null. async function continues
        nav("/ProposalsHome");
        deleteDoc(id);

        // Cleanup: deleting particular doc's entry from user's UpvotedOn array, if exists
        let ref = projFirestore.collection("UserData");
        const snapshot = await ref.where('Uid', '==', user.uid).get();
        
        if(!snapshot.empty){
          snapshot.forEach( obtainedDoc => {
            const arr = obtainedDoc.get("UpvotedOn");
            
            if(arr.includes(id)){
              // javascript's filter() which runs a check function on each element and returns new arr
              // removes the current proposal
              const new_arr = arr.filter( (oneElement) => {
                return oneElement !== id;
              })
              
              ref.doc(obtainedDoc.id).update({
                UpvotedOn: new_arr
              })
            }
          })
        }
      
      };
  
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
          image = socialImage;
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
          colour = "transport_pop-100";
          break;
      }
  
      if(currDoc.ProposalType === "OpenQuestion")
      {
        return (
          <div className="font-main bg-slate-100">
            <PageTitle title={currDoc.ProposalType} />
      
            <div className="mainProposalContainer py-10">
              <div className="proposalContainer">
                <section className="proposalHeader bg-black text-white">
                  <h3 className="proposalTitle md:text-4xl">{currDoc.Title}</h3>
                  <h4 className="proposalOwner pt-2">By {currDoc.DisplayName}</h4>
                  <img src={image} alt="Category" className="categoryImage" />
                  <h5 className="proposalCategory md:text-base text-sm">{currDoc.Category}</h5>
                </section>
  
                {user && (isOwner && (
                  <div className="flex place-self-end mt-2 font-semibold">
                    <button className={`py-1 px-6 mx-1 rounded-full bg-${colour}`} onClick={deleteHandler}>Delete</button>
                    <Link 
                      to={`/ProposalsHome/OpenQuestion/${id}/editQ`}
                      key={currDoc.id}
                    >
                      <button className={`py-1 px-8 mx-1 rounded-full bg-${colour}`}>Edit</button>
                    </Link>
                  </div>
                ))}
      
                <section className="proposalContent">
                  <h3>Question</h3>
                  <QuillEditor
                    readMode={true}
                    payload={JSON.parse(currDoc.Content)}
                  /> 
                </section>
  
                <section className="proposalContent">
                  <h3>Background</h3>
                  <QuillEditor
                    readMode={true}
                    payload={JSON.parse(currDoc.Background)}
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
            <PageTitle title={currDoc.ProposalType} />
      
            <div className="mainProposalContainer py-10">
              <div className="proposalContainer">
                <section className="proposalHeader bg-black text-white">
                  <h3 className="proposalTitle md:text-4xl">{currDoc.Title}</h3>
                  <h4 className="proposalOwner pt-2">By {currDoc.DisplayName}</h4>
                  <img src={image} alt="Category" className="categoryImage" />
                  <h5 className="proposalCategory md:text-base text-sm">{currDoc.Category}</h5>
                </section>
  
                {user && (isOwner && (
                  <div className="flex place-self-end mt-2 font-semibold">
                    <button className={`py-1 px-6 mx-1 rounded-full bg-${colour}`} onClick={deleteHandler}>Delete</button>
                    <Link 
                      to={`/ProposalsHome/OpenBill/${id}/editB`}
                      key={currDoc.id}
                    >
                      <button className={`py-1 px-8 mx-1 rounded-full bg-${colour}`}>Edit</button>
                    </Link>
                  </div>
                ))}
      
                <section className="proposalContent">
                  <h3>Related Laws</h3>
                  <QuillEditor
                    readMode={true}
                    payload={JSON.parse(currDoc.RelatedLaws)}
                  /> 
                </section>
  
                <section className="proposalContent">
                  <h3>Current Problems</h3>
                  <QuillEditor
                    readMode={true}
                    payload={JSON.parse(currDoc.CurrentProblems)}
                  /> 
                </section>
  
                <section className="proposalContent">
                  <h3>Summary of Recommendations</h3>
                  <QuillEditor
                    readMode={true}
                    payload={JSON.parse(currDoc.Summary)}
                  /> 
                </section>
  
                <section className="proposalContent">
                  <h3>Elaboration: Implementation</h3>
                  <QuillEditor
                    readMode={true}
                    payload={JSON.parse(currDoc.Elaboration1)}
                  /> 
                </section>
  
                {!(currDoc.Elaboration2 === "") && (
                  <section className="proposalContent">
                    <h3>Elaboration: Part 2</h3>
                    <QuillEditor
                      readMode={true}
                      payload={JSON.parse(currDoc.Elaboration2)}
                    /> 
                  </section>
                )}
  
                {!(currDoc.Bibliography === "") && (
                  <section className="proposalContent">
                    <h3>Bibliography</h3>
                    <QuillEditor
                      readMode={true}
                      payload={JSON.parse(currDoc.Bibliography)}
                    /> 
                  </section>
                )}
              </div>
            </div>
          </div>
        );
      }
      
    }
    else{
      return(
        <div className="py-20 w-full text-center bg-slate-100 font-title">
          <h3>Retrieving data</h3>
        </div>
      )
    }
  }
  else{
    return(
      <div className="py-20 w-full text-center bg-slate-100 z-0">
        <div className="flex flex-row"> 
          <img src={map} alt="Openbill_pic" className="-ml-64 lg:w-1/2 md:w-2/3"/>
          <div className="flex flex-col">
            <div className="bg-black text-white font-title py-12 px-10 text-center">
              <h3 className="mb-8">Hey.</h3> 
              <h4 className="">Nice to see you here.</h4>
              <h4>Log in to view the contents of this Proposal.</h4>
              <button className="mt-6 py-1 px-8 bg-indigo-500 text-white font-semibold rounded-full">
                  <Link to={"/Signup"}>Log in/ Sign up</Link>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
  

}

export default Proposal;
