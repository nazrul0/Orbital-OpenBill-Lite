import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
  return (
    <div className="mx-5">
      <input
        className="proposalSearch bg-slate-200 rounded-full "
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.sendUp}
      />
    </div>
  );
}

export default SearchBar;
