import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import PageTitle from "../components/PageTitle";
import { useAuthContext } from "../hooks/useAuthContext";
import { projFirestore } from "../config/firebase";
import ProfileProposalList from "../components/ProfileProposalList";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import { useViewport } from "../hooks/useViewport";

function UserProfile() {
  const { user } = useAuthContext(); // importing user
  const id = user.uid;
  const disp = user.displayName;

  const { width } = useViewport();

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
    <div className="profileMainContainer bg-slate-100">
      <div className="profileSubContainer">
        <PageTitle title="Profile" />
        <h2 className="userDisplayName">{disp}</h2>

        <section className="searchSection">
          <SearchBar
            type="text"
            placeholder={width > 1000 ? "Search My Profile" : "Search"}
          />
          {/* <Button text="Filter" /> */}
          <Link className="navItem" to={`/UserProfile/${user.uid}/Settings`}>
            <Button text="Settings >" />
          </Link>
        </section>

        <section className="subSection">
          <h2 className="profileSectionHeader">Proposals</h2>
          <div className="proposalSubDivision">
            <h3 className="proposalTypeHeader">OpenBills</h3>
            <div className="proposalDisplayContainer">
              {userBills.length > 0 && (
                <ProfileProposalList proposals={userBills} />
              )}
              {userBills.length === 0 && (
                <p>This user has not submitted any OpenBills.</p>
              )}
            </div>
          </div>
          <div className="proposalSubDivision">
            <h3 className="proposalTypeHeader">OpenQuestions</h3>
            <div className="proposalDisplayContainer">
              {userQuestions.length > 0 && (
                <ProfileProposalList proposals={userQuestions} />
              )}
              {userQuestions.length === 0 && (
                <p>This user has not submitted any OpenQuestions.</p>
              )}
            </div>
          </div>
        </section>

        <section className="subSection">
          <h2 className="profileSectionHeader" id="articlesSectionHeader">
            Articles
          </h2>
          <div className="articleDisplayContainer">
            {userArticles.length > 0 && <ArticleList articles={userArticles} />}
            {userArticles.length === 0 && (
              <p>This user has not submitted any articles.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
