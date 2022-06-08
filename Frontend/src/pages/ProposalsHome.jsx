import React from "react";
import PageTitle from "../components/PageTitle";
import ProposalCard from "../components/ProposalCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import "./ProposalHome.css";

function ProposalsHome() {
  return (
    <div>
      <PageTitle title="Proposals Home" />
      <section className="proposalsBody">
        <section className="searchSection">
          <SearchBar type="text" placeholder="Search Proposals or Users" />
          <Button text="Filter" />
        </section>
        <section className="gridContainer">
          <div className="proposalGrid">
            <ProposalCard author="Author Name" title="Proposal Title" />
            <ProposalCard author="Author Name" title="Proposal Title" />
            <ProposalCard author="Author Name" title="Proposal Title" />
            <ProposalCard author="Author Name" title="Proposal Title" />
            <ProposalCard author="Author Name" title="Proposal Title" />
            <ProposalCard author="Author Name" title="Proposal Title" />
            <ProposalCard author="Author Name" title="Proposal Title" />
            <ProposalCard author="Author Name" title="Proposal Title" />
          </div>
        </section>
      </section>
    </div>
  );
}

export default ProposalsHome;
