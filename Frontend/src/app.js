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
//import ErrorPage from "./pages/ErrorPage.jsx";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
    const {authIsReady, user} = useAuthContext();
    
    return (
        <React.Fragment>
                {authIsReady && (
                    <BrowserRouter>
                        <Header />
                        <Routes>
                            {user && (
                                <Route path="/Create" element={<Create />} />
                            )}
                            {!user && (
                                <Route path="/Signup" element={<Signup />} />
                            )}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/Login" element={<Login />} />
                            <Route path="/ProposalsHome" element={<ProposalsHome />} />
                            <Route path="/Faq" element={<Faq />} />
                            <Route path="/Column" element={<Column />} />
                            <Route path="*" element={ <Navigate to={user ? "/ProposalsHome" : "/Login"} />} />
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                )}
        </React.Fragment>
    );
}

export default App