import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import PageTitle from "../components/PageTitle";
import { useAuthContext } from "../hooks/useAuthContext";
import { projFirestore } from "../config/firebase";
import ProposalList from "../components/ProposalList";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function UserProfile() {
  const { user } = useAuthContext(); // importing user
  const id = user.uid;
  const disp = user.displayName;

  const [userProposals, setUserProposals] = useState(null);

  useEffect(() => {
    const unsub = projFirestore
      .collection("OpenBills")
      .where("OwnerID", "==", id)
      .onSnapshot(
        (querySnapshot) => {
          let results = [];
          querySnapshot.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setUserProposals(results);
        },
        (error) => {
          console.log("Could not fetch.");
        }
      );

    return () => unsub();
  }, []);

  return (
    <div className="profileMainContainer">
      <div className="profileSubContainer">
        <PageTitle title="Profile" />
        <h1 className="userDisplayName">{disp}</h1>

        <section className="searchSection">
          <SearchBar type="text" placeholder="Search My Profile" />
          <Button text="Filter" />
          <Link className="navItem" to={`/UserProfile/${user.uid}/Settings`}>
            <Button text="Settings >" />
          </Link>
        </section>

        <section>
          <h2 className="profileSectionHeader">Proposals</h2>
          {userProposals && <ProposalList proposals={userProposals} />}
          {!userProposals && <p>This user has not submitted any proposals.</p>}
        </section>

        <section>
          <h2 className="profileSectionHeader">Articles</h2>
          {/* {userProposals && <ProposalList proposals={userProposals} />}
          {!userProposals && <p>This user has not submitted any proposals.</p>} */}
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
