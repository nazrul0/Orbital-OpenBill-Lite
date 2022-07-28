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
import { projFirestore } from "../config/firebase";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCrud } from "../hooks/useCRUD";
import { useState } from "react";
import { useDoc } from "../hooks/useDoc";
import { useEffect } from "react";

function ProposalCard(props) {
  const { user } = useAuthContext();
  const {updateDoc} = useCrud(`${props.type}s`)
  const [isUpvoted, setIsUpvoted] = useState(false);
  const { currDoc } = useDoc(`${props.type}s`, props.proposal_id);
  var str = props.author.substring(0,11);

  useEffect(() => {
    // fetches all the proposals on page load that are upvoted by user
    async function fetchUpvoted() {
      let ref = projFirestore.collection("UserData");
      const snapshot = await ref.where('Uid', '==', user.uid).get();
      snapshot.forEach( obtainedDoc => {
          const arr = obtainedDoc.get("UpvotedOn");
          if(arr.includes(props.proposal_id)){
            setIsUpvoted(true);
          }
          else{
            setIsUpvoted(false);
          }
        }
      ); 
    }
    fetchUpvoted();
  }, []);

  const addUpvote = async (e) => {
    // prevents default redirect to viewing proposal when upvote button clicked
    e.preventDefault()

    let ref = projFirestore.collection("UserData");
    const snapshot = await ref.where('Uid', '==', user.uid).get();
    
    if(!snapshot.empty){
      snapshot.forEach( obtainedDoc => {
        const arr = obtainedDoc.get("UpvotedOn");
        
        if(!arr.includes(props.proposal_id)){
          console.log("upvoting");
          
          updateDoc(props.proposal_id, {
            Upvotes: currDoc.Upvotes + 1,
          })
          
          ref.doc(obtainedDoc.id).update({
            UpvotedOn: [...obtainedDoc.data().UpvotedOn, props.proposal_id],
          })
          
          setIsUpvoted(true);
        }
        else{
          setIsUpvoted(false)
          console.log("not upvoting");
        }
      })
    }
  }

  const removeUpvote = async (e) => {
    // prevents default redirect to viewing proposal when upvote button clicked
    e.preventDefault()

    let ref = projFirestore.collection("UserData");
    const snapshot = await ref.where('Uid', '==', user.uid).get();
    
    if(!snapshot.empty){
      snapshot.forEach( obtainedDoc => {
        const arr = obtainedDoc.get("UpvotedOn");
        
        if(arr.includes(props.proposal_id)){
          console.log("removing upvote");
          
          updateDoc(props.proposal_id, {
            Upvotes: currDoc.Upvotes - 1,
          })

          // javascript's filter() which runs a check function on each element and returns new arr
          // removes the current proposal
          const new_arr = arr.filter( (oneElement) => {
            return oneElement !== props.proposal_id;
          })
          
          ref.doc(obtainedDoc.id).update({
            UpvotedOn: new_arr
          })
          
          setIsUpvoted(false);
        }
        else{
          setIsUpvoted(true)
          console.log("upvote remains");
        }
      })
    }
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
    case "Identity":
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
  if(currDoc !== null){
    return (
      <div className={`cardContainer rounded-xl ${color}`}>
        <div className="grid grid-cols-6">
          <h6 className="text-white col-start-1 col-span-3">By {str}</h6>
          <div className="col-start-4 col-span-3 justify-self-end">
            <div className="upvotesContainer flex flex-row">
              <h6 className="mr-1 text-white py-1 -mt-1">{currDoc.Upvotes}</h6>
              {user && (!isUpvoted && (
                <button onClick={addUpvote} className="hover:bg-slate-700 rounded-md p-1 -mt-1 -mr-1">
                  <img src={upvote} alt="Upvote Icon" />
                </button>
              ))}
              {user && (isUpvoted && (
                <button onClick={removeUpvote} className="hover:bg-transparent bg-slate-700 rounded-md p-1 -mt-1 -mr-1">
                  <img src={upvote} alt="Upvote Icon" />
                </button>
              ))}
              {!user && (
                <div className="rounded-md p-1 ">
                  <img src={upvote} alt="Upvote Icon" />
                </div>
              )}
            </div>
          </div>
        </div>
        <img src={image} alt="Proposal Icon" />
        <h5 className="lg:text-base text-white text-center">{currDoc.Title}</h5>
      </div>
    );
  } else {
    return(
      <div className="py-20 w-full text-center bg-slate-100 font-main">
        <h5>Retrieving data</h5>
      </div>
    )
  }
  
}

export default ProposalCard;
