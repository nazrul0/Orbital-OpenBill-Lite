import React from "react";
import PageTitle from "../components/PageTitle";
import ProposalCard from "../components/ProposalCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import "./ProposalHome.css";
import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import ProposalList from "../components/ProposalList";

function ProposalsHome() {
  const { docs, error } = useCollection("OpenQuestions");

  return (
    <div className="proposalsHomeContainer">
      <PageTitle title="Proposals Home" />
      <Link id="shareLink" className="navItem" to="/Create">
        Have a proposal to share?
      </Link>
      <section className="proposalsBody">
        <section className="searchSection">
          <SearchBar type="text" placeholder="Search Proposals or Users" />
          <Button text="Filter" />
        </section>
        <section>
          <div>
            {error && <p>{error}</p>}
            {docs && <ProposalList proposals={docs} />}
          </div>
        </section>
      </section>
    </div>
  );
}

export default ProposalsHome;
