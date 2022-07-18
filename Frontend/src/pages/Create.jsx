import React from "react";
import PageTitle from "../components/PageTitle";
import constellation from "../imgs/constellation.png";
import gavel from "../imgs/OB(gavel).png";
import mic from "../imgs/OB(mic).png";
import "./Create.css";
import { Link } from "react-router-dom";

function Create() {
  return (
    <div className="bg-slate-100 h-100 min-h-screen">  
      <div className="flex flex-col justify-center items-center pb-20">
        <PageTitle title="Create" />
        <div className="grid lg:grid-cols-3 grid-cols-5 justify-items-center mx-auto">
          
          <div className="mt-8 lg:col-span-3 lg:col-start-1 lg:mx-48 cols-start-1 col-span-5 mx-8">
            <img src={constellation} alt="Openbill Constellation" className="w-full -mb-64"/>
          </div>
          
          <div className="lg:col-start-2 lg:col-span-1 col-start-2 col-span-3 mb-4">
            <Link className="grid grid-cols-2 bg-black text-white place-items-center rounded shadow-xl" to="/SubmitOpenBill">
              <h3 className="font-main">OpenBill</h3>
              <img className="object-fit col-start-2 col-span-1 bg-indigo-400 rounded" src={gavel} alt="Option Icon" />
            </Link>
          </div>
{/*
          <div className="mt-8 lg:col-start-2 lg:col-span-2 col-start-2 col-span-4">
            <img src={constellation} alt="Openbill Constellation" className="w-full -mb-60"/>
          </div>
  */}
          <div className="lg:col-start-2 lg:col-span-1 col-start-2 col-span-3 mt-4">
            <Link className="grid grid-cols-2 bg-black text-white place-items-center rounded shadow-xl" to="/SubmitOpenQuestion">
              <h3 className="font-main">OpenQuestion</h3>
              <img className="object-fit col-start-2 col-span-1 bg-indigo-400 rounded" src={mic} alt="Option Icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
