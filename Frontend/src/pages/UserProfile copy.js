import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import PageTitle from "../components/PageTitle";
import { useAuthContext } from "../hooks/useAuthContext";
// import { projFirestore } from "../config/firebase";
import ProposalList from "../components/ProposalList";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import { useViewport } from "../hooks/useViewport";
import { useProfilePaginate } from "../hooks/useProfilePaginate";

function UserProfile() {
  const { user } = useAuthContext(); // importing user
  // const id = user.uid;
  const disp = user.displayName;
  const photo = user.photoURL;
  console.log("photoURL: " + photo);

  const { width } = useViewport();

  // const [userBills, setUserBills] = useState([]);
  // const [userQuestions, setUserQuestions] = useState([]);
  // const [userArticles, setUserArticles] = useState([]);

  // useEffect(() => {
  //   const unsubBills = projFirestore
  //     .collection("OpenBills")
  //     .where("OwnerID", "==", id)
  //     .onSnapshot(
  //       (querySnapshot) => {
  //         let results = [];
  //         querySnapshot.forEach((doc) => {
  //           results.push({ ...doc.data(), id: doc.id });
  //         });
  //         setUserBills(results);
  //       },
  //       (error) => {
  //         console.log("Could not fetch.");
  //       }
  //     );

  //   const unsubQuestions = projFirestore
  //     .collection("OpenQuestions")
  //     .where("OwnerID", "==", id)
  //     .onSnapshot(
  //       (querySnapshot) => {
  //         let results = [];
  //         querySnapshot.forEach((doc) => {
  //           results.push({ ...doc.data(), id: doc.id });
  //         });
  //         setUserQuestions(results);
  //       },
  //       (error) => {
  //         console.log("Could not fetch.");
  //       }
  //     );

  //   const unsubArticles = projFirestore
  //     .collection("Articles")
  //     .where("OwnerID", "==", id)
  //     .onSnapshot(
  //       (querySnapshot) => {
  //         let results = [];
  //         querySnapshot.forEach((doc) => {
  //           results.push({ ...doc.data(), id: doc.id });
  //         });
  //         setUserArticles(results);
  //       },
  //       (error) => {
  //         console.log("Could not fetch.");
  //       }
  //     );

  //   return () => {
  //     unsubBills();
  //     unsubQuestions();
  //     unsubArticles();
  //   };
  // }, []);

  //

  const [inputText, setInputText] = useState("");
  const [isInput, setIsInput] = useState(false);

  // const searchInputHandler = (e) => {
  //   setInputText(e.target.value);
  // };

  // logging inputText HAS to be outside the onChange handler since console.log would execute first
  useEffect(() => {
    console.log(inputText);
    if (inputText !== "") {
      setIsInput(true);
    } else {
      setIsInput(false);
    }
  }, [inputText]);

  const { paginatedProposals: paginatedBills, getNextProposals: getNextBills } =
    useProfilePaginate("OpenBills", null, 4, 4, "proposals");

  const {
    paginatedProposals: paginatedQuestions,
    getNextProposals: getNextQuestions,
  } = useProfilePaginate("OpenQuestions", null, 4, 4, "proposals");

  const {
    paginatedProposals: paginatedArticles,
    getNextProposals: getNextArticles,
  } = useProfilePaginate("Articles", null, 2, 2, "articles");

  return (
    <div className="profileMainContainer bg-slate-100 font-title">
      <div className="profileSubContainer">
        <PageTitle title="Profile" />
        <section className="flex justify-items-center self-start justify-between w-full ml-12">
          <div className="flex">
            <img src={photo} alt="Profile" className="rounded-full" />
            <h2 className="userDisplayName  self-center ">{disp}</h2>
          </div>

          {/* <Link
            className="navItem self-center justify-self-end "
            to={`/UserProfile/${user.uid}/Settings`}
          >
            <Button text="Settings >" className="bg-slate-300" />
          </Link> */}
        </section>

        <section className="searchSection">
          {/* <SearchBar
            type="text"
            placeholder={width > 1000 ? "Search My Profile" : "Search"}
          />
          {/* <Button text="Filter" /> */}
        </section>

        <section className="subSection">
          <h3 className="profileSectionHeader">Proposals</h3>
          <div className="proposalSubDivision">
            <h3 className="proposalTypeHeader">OpenBills</h3>
            <div className="proposalDisplayContainer">
              {paginatedBills.length > 0 && (
                <div className="paginateContainer">
                  <ProposalList
                    proposals={paginatedBills}
                    filterOn={isInput}
                    searchText={inputText}
                  />
                  <button
                    // type="submit"
                    id="loadMore"
                    onClick={getNextBills}
                    className="m-2 pl-8 p-1 pr-8 bg-indigo-500 text-white rounded-lg"
                  >
                    Load more OpenBills
                  </button>
                </div>
              )}
              {paginatedBills.length === 0 && (
                <p>This user has not submitted any OpenBills.</p>
              )}
            </div>
          </div>
          <div className="proposalSubDivision">
            <h4 className="proposalTypeHeader">OpenQuestions</h4>
            <div className="proposalDisplayContainer">
              {paginatedQuestions.length > 0 && (
                <div className="paginateContainer">
                  <ProposalList
                    proposals={paginatedQuestions}
                    filterOn={isInput}
                    searchText={inputText}
                  />
                  <button
                    // type="submit"
                    id="loadMore"
                    onClick={getNextQuestions}
                    className="m-2 pl-8 p-1 pr-8 bg-indigo-500 text-white rounded-lg"
                  >
                    Load more OpenQuestions
                  </button>
                </div>
              )}
              {paginatedQuestions.length === 0 && (
                <p>This user has not submitted any OpenQuestions.</p>
              )}
            </div>
          </div>
        </section>

        <section className="subSection">
          <h3 className="profileSectionHeader" id="articlesSectionHeader">
            Articles
          </h3>
          <div className="articleDisplayContainer">
            {paginatedArticles.length > 0 && (
              <div className="paginateContainer">
                <ArticleList articles={paginatedArticles} />
                <button
                  // type="submit"
                  id="loadMore"
                  onClick={getNextArticles}
                  className="m-2 pl-8 p-1 pr-8 bg-indigo-500 text-white rounded-lg"
                >
                  Load more Articles
                </button>
              </div>
            )}
            {paginatedArticles.length === 0 && (
              <p>This user has not submitted any articles.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
