import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
//import ProposalCard from "../components/ProposalCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
//import "./ProposalHome.css";
import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import ProposalList from "../components/ProposalList";
import Switch from "../components/Switch";

function ProposalsHome() {
  // pagination limit value
  const [limitVal, setLimitVal] = useState(2);

  // retrieving the documents
  const { docs: docsBills, error: errorBills } = useCollection("OpenBills", limitVal);
  const { docs: docsMotions, error: errorMotions } = useCollection("OpenQuestions", limitVal);
  const [isToggled, setIsToggled] = useState(false);

  // search filtering state
  const [inputText, setInputText] = useState("");
  const [isInput, setIsInput] = useState(false);

  const searchInputHandler = (e) => {
    setInputText(e.target.value);
  };

  // logging inputText HAS to be outside the onChange handler since console.log would execute first
  useEffect(() => {
    //console.log(inputText);
    if(inputText !== ""){
      setIsInput(true);
    }else{
      setIsInput(false);
    }
  }, [inputText]);

  useEffect(() => {
    //console.log(inputText);
    setLimitVal(2)
  }, []);

  const loadHandler= (e) => {
    setLimitVal(limitVal + 2);
    console.log(limitVal)
  }


  return (
    <div className="bg-slate-100">
      <div className="flex flex-col container mx-auto">
        <div className="grid justify-items-center">
          <PageTitle title="Proposals Home" />
          <Link id="shareLink" className="navItem" to="/Create">
            Have a proposal to share?
          </Link>
        </div>

        <div className="grid justify-center">
          <div className="flex flex-row">
            <SearchBar type="text" placeholder="Search by Proposal title, user or category" sendUp={searchInputHandler} />
            <div className=" flex justify-center items-center gap-2">
              <Switch
                rounded={true}
                isToggled={isToggled}
                onToggle={() => {
                  setIsToggled(!isToggled);
                }}
              />

              {!isToggled && <h5>OpenBills</h5>}
              {isToggled && <h5>OpenQuestions</h5>}
            </div>
          </div>
        </div>

        {!isToggled && (
          <div className="mx-11">
            {docsBills && <ProposalList proposals={docsBills} filterOn={isInput} searchText={inputText} />}
            {errorBills && <p>{errorBills}</p>}
          </div>
        )}

        {isToggled && (
          <div className="mx-11">
            {docsMotions && <ProposalList proposals={docsMotions} filterOn={isInput} searchText={inputText} />}
            {errorMotions && <p>{errorMotions}</p>}
          </div>
        )}
        <div className="grid justify-items-center">
          <button className="my-8 py-1 px-6 rounded-full bg-black text-white font-main" onClick={loadHandler}>Load more</button>
        </div>
      </div>
    </div>
  );
}

export default ProposalsHome;
