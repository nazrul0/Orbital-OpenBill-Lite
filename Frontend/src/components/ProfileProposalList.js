import React from "react";
import { Link } from "react-router-dom";
import "./ProfileProposalList.css";
import ProposalCard from "./ProposalCard";

function ProfileProposalList({ proposals }) {
  // use map to create a series of <Link> objects using the collection data passed in
  // (!!) note- has to be proposals.Title (w caps) since we defined the field as Title: on firebase side

  // PASSING THE CURRENT PROPOSAL AS A STATE to the link
  // but in order to do that, need to create a key- i.e curr, and then attach the proposal obj to it
  // ParticularProposal.jsx will obtain this from uselocation and destructure curr
  // subsequently will be able to access the respective fields eg curr.Title, curr.Content
  return (
    <div className="profile_proposal_list">
      {/* {proposals.length === 0 && <p>No proposals found.</p>} */}
      {proposals.map((proposal) => (
        <Link
          to={`/ProposalsHome/${proposal.id}`}
          key={proposal.id}
          state={{ curr: proposal }}
        >
          <ProposalCard
            title={proposal.Title}
            author={proposal.DisplayName}
            category={proposal.Category}
          />
        </Link>
      ))}
    </div>
  );
}

export default ProfileProposalList;
