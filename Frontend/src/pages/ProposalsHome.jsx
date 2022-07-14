import React from "react";
import PageTitle from "../components/PageTitle";
//import ProposalCard from "../components/ProposalCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
//import "./ProposalHome.css";
import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import ProposalList from "../components/ProposalList";

function ProposalsHome() {
  const { docs, error } = useCollection("OpenBills");

  return (
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
        </div>
      </div>
      
      <div className="ml-10 mr-10">
        {docs && <ProposalList proposals={docs} />} 
        {error && <p>{error}</p>}
      </div>    
    </div>
  );
}

export default ProposalsHome;
