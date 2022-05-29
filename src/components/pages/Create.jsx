import React from "react";
import PageTitle from "../PageTitle";
import CreateCard from "../CreateCard";
import "./Create.css";

function Create() {
  return (
    <div>
      <PageTitle title="Create" />
      <div className="createContainer">
        <div className="createBody">
          <CreateCard className="createType" type="OpenQuestion" />
          <CreateCard className="createType" type="OpenMotion" />
          <CreateCard className="createType" type="OpenBill" />
        </div>
      </div>
    </div>
  );
}

export default Create;
