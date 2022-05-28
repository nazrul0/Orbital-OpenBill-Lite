import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./components/pages/LandingPage.js";
import Login from "./components/pages/Login";
import ProposalsHome from "./components/pages/ProposalsHome";
import Faq from "./components/pages/Faq";
import Column from "./components/pages/Column";
import Create from "./components/pages/Create";
import ErrorPage from "./components/pages/ErrorPage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ProposalsHome" element={<ProposalsHome />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Column" element={<Column />} />
        <Route path="/Create" element={<Create />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
