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
import { useParams } from "react-router-dom";
import { projFirestore } from "../config/firebase";
import { useDoc } from "../hooks/useDoc";
import { useEffect } from "react";
import { useState } from "react";


function ParticularProposal(props) {

  // getting the proposalID from the URL parameters we have defined
  const { id, type } = useParams();

  // getting document fields of particular doc from the db.
  const { deleteDoc, state } = useCrud(`${type}s`);
  const { currDoc } = useDoc(`${type}s`, id);
  console.log(currDoc);
  
  if(currDoc !== null){
    return (
      <div>
        <h3>{currDoc.Title}</h3>
        <button className="p-3 bg-indigo-500">BUTTon</button>
      </div>
    );
  }
  
}

export default ParticularProposal;
