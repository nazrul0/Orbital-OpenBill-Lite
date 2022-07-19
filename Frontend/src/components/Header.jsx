import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../imgs/logo.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Fragment } from "react";

function Header() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const menuOpen = false;

  return (
    <div className="bg-slate-50">
      <div className="header backdrop-blur-sm">
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

          {user && (
            <Fragment>
              <Link className="navItem" to="/Create">
                Create
              </Link>
              <Link className="navItem" to={`/UserProfile/${user.uid}`}>
                Profile
              </Link>
              <Link className="navItem" to="ProposalsHome" onClick={logout}>
                Logout
              </Link>
            </Fragment>
          )}

          {!user && (
            <Fragment>
              <Link className="navItem" to="/Login" menuOpen={menuOpen}>
                Login
              </Link>
              <Link className="navItem" to="/Signup" menuOpen={menuOpen}>
                Sign up
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
