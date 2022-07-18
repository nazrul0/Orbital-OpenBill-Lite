import React from "react";
import { Link } from "react-router-dom";
import "./ProposalList.css";
import ProposalCard from "./ProposalCard";
import { useState } from "react";
import { useEffect } from "react";

function ProposalList({ proposals, filterOn, searchText}) {
  // Filtered data
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    // [1] .filter() is a js method taking a callback wherein there is one proposal
    // [2] .includes() is another js method
    const newFilter = proposals.filter( (oneProposal) => {
      return (
        oneProposal.Title.toLowerCase().includes(searchText.toLowerCase()) ||
        oneProposal.DisplayName.toLowerCase().includes(searchText.toLowerCase()) ||
        oneProposal.Category.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(newFilter);
  }, [searchText, proposals]);

  if(filterOn){
    return (
      <div className="proposal_list">
        {filteredData.map((proposal) => (
          <Link
            to={`/ProposalsHome/${proposal.ProposalType}/${proposal.id}`}
            key={proposal.id}
            state={{ curr: proposal }}
          >
            <ProposalCard
              title={proposal.Title}
              author={proposal.DisplayName}
              category={proposal.Category}
              proposal_id={proposal.id}
              type={proposal.ProposalType}
              curr_upvotes={proposal.Upvotes}
            />
          </Link>
        ))}
      </div>
    );
  }
  else{
    // 1. used map to create a series of <Link> objects 
    // 2. has to be proposals.Title (w caps) since defined as Title: in db
    // 3. PASSING THE CURRENT PROPOSAL AS A STATE to the link. subsequently fields like curr.Title can be accessed
    return (
      <div className="proposal_list">
        {/* {proposals.length === 0 && <p>No proposals found.</p>} */}
        {proposals.map((proposal) => (
          <Link
            to={`/ProposalsHome/${proposal.ProposalType}/${proposal.id}`}
            key={proposal.id}
            state={{ curr: proposal }}
          >
            <ProposalCard
              title={proposal.Title}
              author={proposal.DisplayName}
              category={proposal.Category}
              proposal_id={proposal.id}
              type={proposal.ProposalType}
              curr_upvotes={proposal.Upvotes}
            />
          </Link>
        ))}
      </div>
    );
  }
}

export default ProposalList;
