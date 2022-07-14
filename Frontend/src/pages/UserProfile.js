import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import PageTitle from "../components/PageTitle";
import { useAuthContext } from "../hooks/useAuthContext";
import { projFirestore } from "../config/firebase";
import ProposalList from "../components/ProposalList";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";

function UserProfile() {
  const { user } = useAuthContext(); // importing user
  const id = user.uid;
  const disp = user.displayName;

  const [userBills, setUserBills] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [userArticles, setUserArticles] = useState([]);

  useEffect(() => {
    const unsubBills = projFirestore
      .collection("OpenBills")
      .where("OwnerID", "==", id)
      .onSnapshot(
        (querySnapshot) => {
          let results = [];
          querySnapshot.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setUserBills(results);
        },
        (error) => {
          console.log("Could not fetch.");
        }
      );

    const unsubQuestions = projFirestore
      .collection("OpenQuestions")
      .where("OwnerID", "==", id)
      .onSnapshot(
        (querySnapshot) => {
          let results = [];
          querySnapshot.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setUserQuestions(results);
        },
        (error) => {
          console.log("Could not fetch.");
        }
      );

    const unsubArticles = projFirestore
      .collection("Articles")
      .where("OwnerID", "==", id)
      .onSnapshot(
        (querySnapshot) => {
          let results = [];
          querySnapshot.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setUserArticles(results);
        },
        (error) => {
          console.log("Could not fetch.");
        }
      );

    return () => {
      unsubBills();
      unsubQuestions();
      unsubArticles();
    };
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

        <section className="subSection">
          <h2 className="profileSectionHeader">Proposals</h2>
          <div className="proposalSubDivision">
            <h3 className="proposalTypeHeader">OpenBills</h3>
            {userBills.length > 0 && <ProposalList proposals={userBills} />}
            {userBills.length === 0 && (
              <p>This user has not submitted any OpenBills.</p>
            )}
          </div>
          <div className="proposalSubDivision">
            <h3 className="proposalTypeHeader">OpenQuestions</h3>
            {userQuestions && <ProposalList proposals={userQuestions} />}
            {!userQuestions && (
              <p>This user has not submitted any OpenQuestions.</p>
            )}
          </div>
        </section>

        <section className="subSection">
          <h2 className="profileSectionHeader">Articles</h2>
          {userArticles && <ArticleList articles={userArticles} />}
          {!userArticles && <p>This user has not submitted any articles.</p>}
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
