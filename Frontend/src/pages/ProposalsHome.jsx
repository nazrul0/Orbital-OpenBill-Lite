import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
//import ProposalCard from "../components/ProposalCard";
import SearchBar from "../components/SearchBar";
// import Button from "../components/Button";
import "./ProposalsHome.css";
import { Link } from "react-router-dom";
// import { useCollection } from "../hooks/useCollection";
import ProposalList from "../components/ProposalList";
import Switch from "../components/Switch";
import { useViewport } from "../hooks/useViewport";
// import { projFirestore } from "../config/firebase";
import { usePaginate } from "../hooks/usePaginate";
import { usePaginateUpvotes } from "../hooks/usePaginateUpvotes";

function ProposalsHome() {
  // const { docs: docsBills, error: errorBills } = useCollection("OpenBills");
  // const { docs: docsQuestions, error: errorQuestions } =
  //   useCollection("OpenQuestions");
  const [isToggled, setIsToggled] = useState(false);

  const { width } = useViewport();

  // search filtering state
  const [inputText, setInputText] = useState("");
  const [isInput, setIsInput] = useState(false);
  const [orderBy, setOrderBy] = useState("CreatedAt");

  const searchInputHandler = (e) => {
    setInputText(e.target.value);
  };

  // logging inputText HAS to be outside the onChange handler since console.log would execute first
  useEffect(() => {
    //console.log(inputText);
    if (inputText !== "") {
      setIsInput(true);
    } else {
      setIsInput(false);
    }
  }, [inputText]);

  // paginate using hooks
  const { paginatedProposals: paginatedBills, getNextProposals: getNextBills } =
    usePaginate("OpenBills", null, 20, 10, "proposals");

  const {
    paginatedProposals: paginatedQuestions,
    getNextProposals: getNextQuestions,
  } = usePaginate("OpenQuestions", null, 20, 10, "proposals");

  const { paginatedPropsUpvotes: paginatedBillsUpvotes, getNextPropsUpvotes: getNextBillsUpvotes } =
    usePaginateUpvotes("OpenBills", null, 20, 10, "proposals");

  const {
    paginatedPropsUpvotes: paginatedQuestionsUpvotes,
    getNextPropsUpvotes: getNextQuestionsUpvotes,
  } = usePaginateUpvotes("OpenQuestions", null, 20, 10, "proposals");

  const toggleHandler = (e) => {
    e.preventDefault();
    if(orderBy === "CreatedAt"){
      setOrderBy("Upvotes")
    }
    else{
      setOrderBy("CreatedAt")
    }
  };

  return (
    <div className="bg-slate-100 pb-8">
      <div className="flex flex-col container mx-auto">
        <div className="grid justify-items-center">
          <PageTitle title="Proposals Home" />
          {/* <Link
            id="shareLink"
            className="navItem text-white rounded-lg px-5 py-2 h-4"
            to="/Create"
          >
            Have a proposal to share?
          </Link> */}
        </div>

        <div className="grid justify-center mt-6 mb-6">
          <div className="flex flex-row justify-center w-screen">
            <SearchBar
              type="text"
              placeholder={
                width > 1000
                  ? "Search by Proposal title, user or category"
                  : "Search"
              }
              sendUp={searchInputHandler}
              className="w-full"
            />
            <div className=" flex justify-center items-center gap-2">
              <Switch
                rounded={true}
                isToggled={isToggled}
                onToggle={() => {
                  setIsToggled(!isToggled);
                }}
              />

              {!isToggled && <h5>OpenBills</h5>}
              {isToggled && <h5>OpenQuestions</h5>}
            </div>
          </div>
        </div>

        <div className="grid">
          <button
            // type="submit"
            id="loadMore"
            onClick={toggleHandler}
            className="m-2 mt-4 px-6 py-1 bg-slate-200 text-black font-light font-main rounded-full justify-self-center hover:bg-slate-300"
          >
          Toggle sort by Upvotes/ Latest
          </button>
        </div>
        
        {!isToggled && (
          <div className="mx-11 -mt-3">
            {/* {docsBills && (
              <ProposalList
                proposals={docsBills}
                filterOn={isInput}
                searchText={inputText}
              />
            )}
            {errorBills && <p>{errorBills}</p>} */}

            {orderBy === "CreatedAt" && (
              <div className="paginateContainer">
                {/* <p>paginated</p> */}
                <div>
                  <ProposalList
                    proposals={paginatedBills}
                    filterOn={isInput}
                    searchText={inputText}
                  />
                </div>
                <button
                  // type="submit"
                  id="loadMore"
                  onClick={getNextBills}
                  className="m-2 px-8 py-1 bg-slate-200 text-black font-main font-light rounded-full hover:text-white hover:bg-black"
                >
                Load more
                </button>
              </div>
            )}

            {orderBy === "Upvotes" && (
              <div className="paginateContainer">
                {/* <p>paginated</p> */}
                <div>
                  <ProposalList
                    proposals={paginatedBillsUpvotes}
                    filterOn={isInput}
                    searchText={inputText}
                  />
                </div>
                <button
                  // type="submit"
                  id="loadMore"
                  onClick={getNextBillsUpvotes}
                  className="m-2 px-8 py-1 bg-slate-200 text-black font-main font-light rounded-full hover:text-white hover:bg-black"
                >
                Load more
                </button>
              </div>
            )}
            
          </div>
        )}

        {isToggled && (
          <div className="mx-11 -mt-3">
            {/* {docsQuestions && (
              <ProposalList
                proposals={docsQuestions}
                filterOn={isInput}
                searchText={inputText}
              />
            )}
            {errorQuestions && <p>{errorQuestions}</p>} */}

            {orderBy === "CreatedAt" && (
              <div className="paginateContainer">
                {/* <p>paginated</p> */}
                <ProposalList
                  proposals={paginatedQuestions}
                  filterOn={isInput}
                  searchText={inputText}
                />
                <button
                  // type="submit"
                  id="loadMore"
                  onClick={getNextQuestions}
                  className="m-2 px-8 py-1 bg-slate-200 text-black font-main font-light rounded-full hover:text-white hover:bg-black"
                >
                Load more
                </button>
              </div>
            )}

            {orderBy === "Upvotes" && (
              <div className="paginateContainer">
                {/* <p>paginated</p> */}
                <ProposalList
                  proposals={paginatedQuestionsUpvotes}
                  filterOn={isInput}
                  searchText={inputText}
                />
                <button
                  // type="submit"
                  id="loadMore"
                  onClick={getNextQuestionsUpvotes}
                  className="m-2 px-8 py-1 bg-slate-200 text-black font-main font-light rounded-full hover:text-white hover:bg-black"
                >
                Load more
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProposalsHome;
