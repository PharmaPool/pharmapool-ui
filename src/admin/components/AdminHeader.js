import React, { useState, useEffect } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";

import images from "../../data/images";
// import GoogleTrans from "./GoogleTrans";

const AdminHeader = () => {
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
          <a class="navbar-brand" href="/admin/overview">
            <img
              src={images.logo}
              alt="pharmapool_logo"
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
            style={{ color: "#004d40", outline: "none", border: "none" }}
          >
            <i class="fas fa-bars"></i>
          </button>
          <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ backgroundColor: navBg && "white" }}
          >
            <div style={{ width: "8vw" }}></div>
            <ul class="navbar-nav me-auto">
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/admin/overview"
                  style={{
                    color: "#004d40",
                    margin: "0px 1rem",
                    fontWeight: "bold",
                  }}
                >
                  Home
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/admin/users"
                  style={{
                    color: "#004d40",
                    margin: "0px 1rem",
                    fontWeight: "bold",
                  }}
                >
                  Users
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/admin/businesses"
                  style={{
                    color: "#004d40",
                    margin: "0px 1rem",
                    fontWeight: "bold",
                  }}
                >
                  Businesses
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/admin/wallets"
                  style={{
                    color: "#004d40",
                    margin: "0px 1rem",
                    fontWeight: "bold",
                  }}
                >
                  Wallets
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  // href="/admin/posts"
                  style={{
                    color: "#004d40",
                    margin: "0px 1rem",
                    fontWeight: "bold",
                  }}
                >
                  Posts
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  // href="/admin/pharmacies"
                  style={{
                    color: "#004d40",
                    margin: "0px 1rem",
                    fontWeight: "bold",
                  }}
                >
                  Pharmacies
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  // href="/admin/inventories"
                  style={{
                    color: "#004d40",
                    margin: "0px 1rem",
                    fontWeight: "bold",
                  }}
                >
                  Inventories
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  // href="/admin/transactions"
                  style={{
                    color: "#004d40",
                    margin: "0px 1rem",
                    fontWeight: "bold",
                  }}
                >
                  Transactions
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

export default AdminHeader;
