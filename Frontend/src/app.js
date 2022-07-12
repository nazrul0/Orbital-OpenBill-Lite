import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProposalsHome from "./pages/ProposalsHome";
import Faq from "./pages/Faq";
import Column from "./pages/Column";
import Create from "./pages/Create";
import SubmitOpenQ from "./pages/SubmitOpenQ.js";
import SubmitOpenB from "./pages/SubmitOpenB.js";
import SubmitOpenM from "./pages/SubmitOpenM.js";
import SubmitArticle from "./pages/SubmitArticle.js";
import SubmitFAQ from "./pages/SubmitFAQ.js";
import Proposal from "./components/ParticularProposal.jsx";
//import ErrorPage from "./pages/ErrorPage.jsx";
import UserProfile from "./pages/UserProfile.js";
import UserSettings from "./pages/UserSettings.js";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <React.Fragment>
      {authIsReady && (
        <BrowserRouter>
          <Header />
          <Routes>
            {user && <Route path="/Create" element={<Create />} />}
            {!user && <Route path="/Signup" element={<Signup />} />}
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/ProposalsHome/" element={<ProposalsHome />} />
            <Route path="/ProposalsHome/:id" element={<Proposal />} />
            <Route path="/Faq" element={<Faq />} />
            <Route path="/Column" element={<Column />} />
            {user && (
              <Route path="/SubmitOpenQuestion/" element={<SubmitOpenQ />} />
            )}
            {user && <Route path="/SubmitOpenBill" element={<SubmitOpenB />} />}
            {user && (
              <Route path="/SubmitArticle" element={<SubmitArticle />} />
            )}
            {user && (
              <Route path="/UserProfile/:id" element={<UserProfile />} />
            )}
            {user && (
              <Route
                path="/UserProfile/:id/Settings"
                element={<UserSettings />}
              />
            )}
            <Route
              path="*"
              element={<Navigate to={user ? "/ProposalsHome" : "/Login"} />}
            />
            <Route path="/SubmitFAQ" element={<SubmitFAQ />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </React.Fragment>
  );
}

export default App;
