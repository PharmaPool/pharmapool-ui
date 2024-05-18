import React, { useState, useEffect } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";

import Logo from "../data/logo.png";
// import GoogleTrans from "./GoogleTrans";

const Header = () => {
  const [navBg, setNavSize] = useState(false);

  const changeNavSize = () => {
    window.innerWidth <= 700 || window.scrollY >= 50
      ? setNavSize(true)
      : setNavSize(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavSize);
    window.addEventListener("resize", changeNavSize);
    return () => {
      window.removeEventListener("scroll", changeNavSize);
      window.removeEventListener("resize", changeNavSize);
    };
  }, []);
  return (
    <header>
      <nav
        class="navbar navbar-expand-lg navbar-light scrolling-navbar fixed-top shadow-0"
        style={{ padding: "0px", backgroundColor: "white" }}
      >
        <div class="container">
          <a class="navbar-brand" href="/">
            <img
              src={Logo}
              alt="britishfx.org"
              width={50}
              style={{ margin: "0px" }}
              className="logoss"
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ color: "black" }}
          >
            <i class="fas fa-bars"></i>
          </button>
          <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ backgroundColor: navBg && "white" }}
          >
            <div style={{ width: "5rem" }}></div>
            <ul class="navbar-nav me-auto">
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/"
                  style={{
                    color: "#00695c",
                    margin: "0px 1rem",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Home
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/business"
                  style={{
                    color: "#00695c",
                    margin: "0px 1rem",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Business
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/about"
                  style={{
                    color: "#00695c",
                    margin: "0px 1rem",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  About us
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/contact"
                  style={{
                    color: "#00695c",
                    margin: "0px 1rem",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Contact
                </a>
              </li>
              <div className="liner"></div>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/signin"
                  style={{
                    color: "#00695c",
                    margin: "0px 0.5rem",
                    background: "none",
                    border: "none",
                    width: "7rem",
                    height: "2.5rem",
                    borderRadius: "2rem",
                    fontWeight: "bolder",
                  }}
                >
                  <i
                    class="fa-solid fa-circle-user"
                    style={{ marginRight: "0.7rem" }}
                  ></i>
                  Log in
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/signup"
                  style={{
                    color: "#00695c",
                    margin: "0px 0.5rem",
                    background: "rgba(0,0,0,0.1)",
                    border: "0.8px solid grey",
                    width: "7rem",
                    height: "2.5rem",
                    borderRadius: "2rem",
                    textAlign: "center",
                    fontWeight: "bolder",
                  }}
                >
                  Register
                </a>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </nav>
      <section></section>
    </header>
  );
};

export default Header;
