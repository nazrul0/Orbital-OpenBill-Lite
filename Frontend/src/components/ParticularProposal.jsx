import React from "react";
import { useLocation } from "react-router-dom";

function Proposal(props) {

  const location = useLocation();
  const {curr} = location.state;
  
  return (
    <div>
      <h4>{curr.Title}</h4>
      <h5>By {curr.DisplayName}</h5>
      <p>
        {curr.Content}
      </p>
    </div>
  );
}

export default Proposal;
