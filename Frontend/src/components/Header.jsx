import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../imgs/logo.png";
import {useLogout} from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Fragment } from "react";

function Header() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className="header navbar-expand-md navbar-light bg-light">
      <div className="siteBrand">
        <img className="mainLogo" src={logo} alt="openbill logo" />
        <Link
          className="siteName"
          style={{ textDecoration: "none", color: "black" }}
          to="/"
        >OpenBill SG
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

        {user && (
          <Fragment>
            <Link className="navItem" to="/Create">
              Create
            </Link>
            <Link className="navItem" to="ProposalsHome" onClick={logout}>
              Logout
            </Link>
          </Fragment>
        )}
        
        {!user && (
          <Fragment>
            <Link className="navItem" to="/Login">
              Login
            </Link>
            <Link className="navItem" to="/Signup">
              Sign up
            </Link>
        </Fragment>
        )}
      </div>
    </div>
  );
}

export default Header;
