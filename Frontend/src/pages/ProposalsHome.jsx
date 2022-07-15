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
  const { docs: docsBills, error: errorBills } = useCollection("OpenBills");
  const { docs: docsMotions, error: errorMotions } =
    useCollection("OpenQuestions");
  const [isToggled, setIsToggled] = useState(false);

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
            <SearchBar type="text" placeholder="Search Proposals or Users" />
            <Button text="Filter" />

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
            {docsBills && <ProposalList proposals={docsBills} />}
            {errorBills && <p>{errorBills}</p>}
          </div>
        )}

        {isToggled && (
          <div className="mx-11">
            {docsMotions && <ProposalList proposals={docsMotions} />}
            {errorMotions && <p>{errorMotions}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProposalsHome;
