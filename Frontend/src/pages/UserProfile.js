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

  const [userDocs, setDocs] = useState(null);
  const [error, setError] = useState(null);

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
          setDocs(results);
        },
        (error) => {
          console.log("Could not fetch.");
        }
      );

    return () => unsub();
  });

  // projFirestore
  //   .collection("OpenMotions")
  //   .where("OwnerID", "==", id)
  //   .get()
  //   .then((querySnapshot) => {
  //     let results = [];
  //     querySnapshot.forEach((doc) => {
  //       results.push({ ...doc.data(), id: doc.id });
  //     });
  //     setDocs(results);
  //   })
  //   .catch((error) => {
  //     console.log("Could not fetch.");
  //   });

  console.log(userDocs);

  return (
    <div className="profileMainContainer bg-slate-100">
      <div className="profileSubContainer">
        <PageTitle title="Profile" />
        <h2 className="userDisplayName">{disp}</h2>

        <section className="searchSection">
          <SearchBar type="text" placeholder="Search My Profile" />
          <Button text="Filter" />
          <Link className="navItem" to={`/UserProfile/${user.uid}/Settings`}>
            <Button text="Settings >" />
          </Link>
        </section>

        <section>
          <h2 className="profileSectionHeader">Proposals</h2>
          {userDocs && <ProposalList proposals={userDocs} />}
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
