import React from "react";
import "./PageTitle.css";

function PageTitle(props) {
  return (
    <div>
      <h1 className="titleHeader">{props.title}</h1>
    </div>
  );
}

export default PageTitle;
