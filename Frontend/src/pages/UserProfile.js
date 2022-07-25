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
  //console.log("photoURL: " + photo);

  const { width } = useViewport();

  const [inputText, setInputText] = useState("");
  const [isInput, setIsInput] = useState(false);

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
    <div className="bg-slate-100">
      <PageTitle title="My Profile" />
      <div className="grid grid-cols-6">
        <div className="col-start-2 col-span-4 bg-slate-100 mb-5 rounded-lg p-2">
          
          <img src={photo} alt="Profile" className="rounded-full" />
          <h3 className="rounded-lg font-title font-bold py-2 justify-self-left">{disp}</h3>
          
          <div className="grid mt-4 font-main font-bold rounded-lg bg-black text-white py-1">
            <h3 className="justify-self-center uppercase tracking-wider">OpenBills</h3>
          </div>
          
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
                  className="m-2 pl-8 p-1 pr-8 bg-slate-300 rounded-full"
                >
                Load more OpenBills
                </button>
              </div>
            )}
            {paginatedBills.length === 0 && (
              <p className="justify-self-center text-sm">This user has not submitted any OpenBills.</p>
            )}
          </div>

          <div className="grid mt-4 font-main font-bold rounded-lg bg-black text-white py-1 mt-10">
            <h3 className="justify-self-center uppercase tracking-wider">OpenQuestions</h3>
          </div>

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
                    className="m-2 pl-8 p-1 pr-8 bg-slate-300 rounded-full"
                  >
                    Load more OpenQuestions
                  </button>
                </div>
              )}
              {paginatedQuestions.length === 0 && (
                <p className="justify-self-center text-sm">This user has not submitted any OpenQuestions.</p>
              )}
          </div>

          <div className="grid mt-4 font-main font-bold rounded-lg bg-black text-white py-1 mt-10">
            <h3 className="justify-self-center uppercase tracking-wider">Articles</h3>
          </div>

          <div className="articleDisplayContainer">
            {paginatedArticles.length > 0 && (
              <div className="paginateContainer">
                <ArticleList articles={paginatedArticles} />
                <button
                  // type="submit"
                  id="loadMore"
                  onClick={getNextArticles}
                  className="m-2 pl-8 p-1 pr-8 bg-slate-300 rounded-full"
                >
                  Load more Articles
                </button>
              </div>
            )}
            {paginatedArticles.length === 0 && (
              <p className="justify-self-center text-sm">This user has not submitted any articles.</p>
            )}
          </div>
        
        </div>
      </div>  
    </div>
  );
}

export default UserProfile;
