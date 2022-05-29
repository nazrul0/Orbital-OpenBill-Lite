import React from "react";
import PageTitle from "../PageTitle";
import ProposalCard from "../ProposalCard";
import SearchBar from "../SearchBar";
import Button from "../Button";
import "./ProposalHome.css";

function ProposalsHome() {
  return (
    <div className="">
      <PageTitle title="Proposals Home" />
      <section className="proposalsBody">
        <section className="searchSection">
          <SearchBar type="text" placeholder="Search Proposals or Users" />
          <Button text="Filter" />
        </section>
        <section className="gridContainer">
          <div className="proposalGrid">
            <ProposalCard author="Sample Name" title="Sample Title" />
            <ProposalCard author="Sample Name" title="Sample Title" />
            <ProposalCard author="Sample Name" title="Sample Title" />
            <ProposalCard author="Sample Name" title="Sample Title" />
            <ProposalCard author="Sample Name" title="Sample Title" />
            <ProposalCard author="Sample Name" title="Sample Title" />
          </div>
        </section>
      </section>
    </div>
  );
}

export default ProposalsHome;
