import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import "./MobNavLinks.css";

const MobNavLinks = (props) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  function handleMobileLinkClick() {
    props.isMobile && props.closeMobileMenu();
  }

  return (
    <div>
      <div className="mobNavBar">
        <section className="mobLinks">
          <Link
            className="mobNavItem"
            to="/ProposalsHome"
            onClick={() => {
              handleMobileLinkClick();
            }}
          >
            Proposals Home
          </Link>
          <Link
            className="mobNavItem"
            to="/Column"
            onClick={() => {
              handleMobileLinkClick();
            }}
          >
            The Column
          </Link>
          <Link
            className="mobNavItem"
            to="/Faq"
            onClick={() => {
              handleMobileLinkClick();
            }}
          >
            FAQ
          </Link>

          {user && (
            <Fragment>
              <Link
                className="mobNavItem"
                to="/Create"
                onClick={() => {
                  handleMobileLinkClick();
                }}
              >
                Create
              </Link>
              <Link
                className="mobNavItem"
                to={`/UserProfile/${user.uid}`}
                onClick={() => {
                  handleMobileLinkClick();
                }}
              >
                Profile
              </Link>
              <Link
                className="mobNavItem"
                to="ProposalsHome"
                onClick={() => {
                  logout();
                  handleMobileLinkClick();
                }}
              >
                Logout
              </Link>
            </Fragment>
          )}

          {!user && (
            <Fragment>
              <Link
                className="mobNavItem"
                to="/Login"
                onClick={() => {
                  handleMobileLinkClick();
                }}
                state={{ curr: this }}
              >
                Login
              </Link>
              <Link
                className="mobNavItem"
                to="/Signup"
                onClick={() => {
                  handleMobileLinkClick();
                }}
                state={{ curr: this }}
              >
                Sign up
              </Link>
            </Fragment>
          )}
        </section>
      </div>
    </div>
  );
};

export default MobNavLinks;
