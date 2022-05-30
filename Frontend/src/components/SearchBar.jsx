import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
  return (
    <div>
      <input
        className="proposalSearch"
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default SearchBar;
