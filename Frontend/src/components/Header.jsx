import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../imgs/logo.png";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Fragment } from "react";
import userprofileicon from "../imgs/userprofileicon.png";
import createnew from "../imgs/createnew.png";
import faq from "../imgs/faq.png";
import home from "../imgs/home.png";
import logouticon from "../imgs/logout.png";
import columnicon from "../imgs/column.png";


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
            <img
              src={home}
              alt="proposals home"
              className="w-7 mr-1"
            />
          </Link>
          <Link className="navItem" to="/Column">
            <img
              src={columnicon}
              alt="column"
              className="w-7 mr-1"
            />
          </Link>
          <Link className="navItem" to="/Faq">
            <img
              src={faq}
              alt="faq"
              className="w-7 mr-1"
            />
          </Link>

          {user && (
            <Fragment>
              <Link className="navItem" to="/Create">
              <img
                src={createnew}
                alt="user profile"
                className="w-7 mr-2"
              />
              </Link>
              <Link className="navItem" to={`/UserProfile/${user.uid}`}>
                <img
                  src={userprofileicon}
                  alt="user profile"
                  className="w-7 mr-2"
                />
              </Link>
              
              <Link className="navItem" to="ProposalsHome" onClick={logout}>
                <img
                  src={logouticon}
                  alt="user profile"
                  className="w-7 mr-6"
                />
              </Link>
            </Fragment>
          )}

          {!user && (
            <Fragment>
              <Link className="navItem px-3 pt-2 rounded-full bg-slate-600 text-white font-light text-xs tracking-widest" to="/Login" menuOpen={menuOpen}>
                Login
              </Link>
              <Link className="navItem px-3 pt-2 rounded-full bg-slate-600 text-white font-light text-xs tracking-widest" to="/Signup" menuOpen={menuOpen}>
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
