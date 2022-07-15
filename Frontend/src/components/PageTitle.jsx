import React from "react";
import "./PageTitle.css";

function PageTitle(props) {
  return (
    <div>
      <h2 className="sm:text-5xl font-bold font-title titleHeader">{props.title}</h2>
    </div>
  );
}

export default PageTitle;
