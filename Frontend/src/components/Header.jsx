import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../imgs/logo.png";

function Header() {
  return (
    <div className="header navbar-expand-md navbar-light bg-light">
      <div className="siteBrand">
        <img className="mainLogo" src={logo} alt="openbill logo" />
        <Link
          className="siteName"
          style={{ textDecoration: "none", color: "black" }}
          to="/"
        >
          OpenBill SG
        </Link>
      </div>
      <div className="navBar">
        <Link className="navItem" to="/ProposalsHome">
          Proposals Home
        </Link>
        <Link className="navItem" to="/Column">
          The Column
        </Link>
        <Link className="navItem" to="/Faq">
          FAQ
        </Link>
        <Link className="navItem" to="/Login">
          Login
        </Link>
        <Link className="navItem" to="/Create">
          Create
        </Link>
      </div>
    </div>
  );
}

export default Header;
