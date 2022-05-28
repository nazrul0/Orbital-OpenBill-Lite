import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.js";
import Login from "./components/pages/Login";
import ProposalsHome from "./components/pages/ProposalsHome";
import Faq from "./components/pages/Faq";
import Column from "./components/pages/Column";
import Create from "./components/pages/Create";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ProposalsHome" element={<ProposalsHome />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Column" element={<Column />} />
        <Route path="/Create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
