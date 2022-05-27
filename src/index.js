import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import Login from "./components/Login";
import ProposalsHome from "./components/ProposalsHome";
import Faq from "./components/Faq";
import Column from "./components/Column";
import Create from "./components/Create";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/ProposalsHome" element={<ProposalsHome />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Column" element={<Column />} />
          <Route path="/Create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
