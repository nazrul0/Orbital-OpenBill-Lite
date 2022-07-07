import React from "react";
import { Link } from "react-router-dom";
import "./ProposalList.css";
import ProposalCard from "./ProposalCard";

function ProposalList({ proposals }) {
  // use map to create a series of <Link> objects using the collection data passed in
  // (!!) note- has to be proposals.Title (w caps) since we defined the field as Title: on firebase side
  return (
    <div className="proposal_list">
      {proposals.length === 0 && <p>no proposals found.</p>}
      {proposals.map((proposal) => (
        <Link to={`/ProposalsHome/${proposal.id}`}>
          <ProposalCard
            title={proposal.Title}
            author="user0"
            category={proposal.Category}
          />
        </Link>
      ))}
    </div>
  );
}

export default ProposalList;
