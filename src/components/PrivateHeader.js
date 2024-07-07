import React, { useEffect, useState } from "react";
import images from "../data/images";

import AccountMenu from "./ProfileIcon";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import NotificationsIcon from "@mui/icons-material/Notifications";

function PrivateHeader() {
  const [navBg, setNavSize] = useState(false);

  const changeNavSize = () => {
    window.innerWidth <= 1070 || window.scrollY >= 50
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
        style={{
          padding: "0px",
          backgroundColor: "white",
        }}
      >
        <div class="container">
          <a class="navbar-brand" href="/">
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
            style={{ color: "black" }}
          >
            <i class="fas fa-bars"></i>
          </button>
          <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ backgroundColor: "white" }}
          >
            <div style={{ width: "7rem" }}></div>
            <ul class="navbar-nav me-auto">
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/posts"
                  style={{
                    color: "#004d40",
                    margin: "0px 0.5rem",
                    textShadow: navBg ? "none" : "0.5px 1px 0px white",
                    fontWeight: "bold",
                  }}
                >
                  <HomeIcon fontSize="1rem" />
                  Posts
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/private_business"
                  style={{
                    color: "#004d40",
                    margin: "0px 0.5rem",
                    textShadow: navBg ? "none" : "0.5px 1px 0px white",
                    fontWeight: "bold",
                  }}
                >
                  <StoreIcon />
                  Business
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/chatrooms"
                  style={{
                    color: "#004d40",
                    margin: "0px 0.5rem",
                    textShadow: navBg ? "none" : "0.5px 1px 0px white",
                    fontWeight: "bold",
                  }}
                >
                  <GroupsIcon />
                  Chatrooms
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/chats"
                  style={{
                    color: "#004d40",
                    margin: "0px 0.5rem",
                    textShadow: navBg ? "none" : "0.5px 1px 0px white",
                    fontWeight: "bold",
                  }}
                >
                  <ChatIcon />
                  Chats
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/requests"
                  style={{
                    color: "#004d40",
                    margin: "0px 0.5rem",
                    textShadow: navBg ? "none" : "0.5px 1px 0px white",
                    fontWeight: "bold",
                  }}
                >
                  <PersonAddAlt1Icon />
                  Requests
                </a>
              </li>
              <li class="nav-item me-3 me-lg-0">
                <a
                  class="nav-link"
                  href="/notifications"
                  style={{
                    color: "#004d40",
                    margin: "0px 0.5rem",
                    textShadow: navBg ? "none" : "0.5px 1px 0px white",
                    fontWeight: "bold",
                  }}
                >
                  <NotificationsIcon />
                  Notifications
                </a>
              </li>
              <div style={{ width: "3rem" }}></div>
              <li class="nav-item me-3 me-lg-0">
                <AccountMenu />
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default PrivateHeader;
