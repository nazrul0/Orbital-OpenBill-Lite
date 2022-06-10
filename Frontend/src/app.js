import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProposalsHome from "./pages/ProposalsHome";
import Faq from "./pages/Faq";
import Column from "./pages/Column";
import Create from "./pages/Create";
import ErrorPage from "./pages/ErrorPage.jsx";
import { AuthContextProvider } from "./context/authcontext.js";

function App() {
    return (
      <React.Fragment>
            <AuthContextProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/ProposalsHome" element={<ProposalsHome />} />
                        <Route path="/Faq" element={<Faq />} />
                        <Route path="/Column" element={<Column />} />
                        <Route path="/Create" element={<Create />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthContextProvider>
      </React.Fragment>
    );
}
  
export default App