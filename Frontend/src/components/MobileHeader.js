import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MobileHeader.css";
import logo from "../imgs/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import MobNavLinks from "./MobNavLinks";

function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }
  const hamburgerIcon = (
    <GiHamburgerMenu
      className="hamburgerIcon"
      size="30px"
      color="black"
      onClick={() => {
        handleMenuClick();
      }}
    />
  );

  const closeIcon = (
    <AiOutlineClose
      className="hamburgerIcon"
      size="30px"
      color="black"
      onClick={() => {
        handleMenuClick();
      }}
    />
  );

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="bg-slate-50 ">
      <div className="mobile_header backdrop-blur-sm">
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

        <nav className="hamburgerMenu">
          {menuOpen ? closeIcon : hamburgerIcon}
          {menuOpen && (
            <MobNavLinks
              className="mobileLinks"
              isMobile={true}
              closeMobileMenu={closeMobileMenu}
              menuOpen={menuOpen}
            />
          )}
        </nav>
      </div>
    </div>
  );
}

export default MobileHeader;
