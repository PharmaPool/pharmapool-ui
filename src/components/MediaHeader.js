import React from "react";

import Logo from "../data/logo.png";

import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import NotificationsIcon from "@mui/icons-material/Notifications";

import AccountMenu from "./ProfileIcon";

function MediaHeader() {
  return (
    <div className="media_header">
      <div className="media_header_image">
        <img src={Logo} alt="" width={25} />
      </div>
      <div className="media_navs">
        <a href="/posts">
          <HomeIcon style={{ fontSize: "2rem" }} />
        </a>
        <a href="/private_business">
          <StoreIcon style={{ fontSize: "2rem" }} />
        </a>
        <a href="/chatrooms">
          <GroupsIcon style={{ fontSize: "2rem" }} />
        </a>
        <a href="/chats">
          <ChatIcon style={{ fontSize: "2rem" }} />
        </a>
        <a href="/requests">
          <PersonAddAlt1Icon style={{ fontSize: "2rem" }} />
        </a>
        <a href="/notifications">
          <NotificationsIcon style={{ fontSize: "2rem" }} />
        </a>
        <AccountMenu />
      </div>
    </div>
  );
}

export default MediaHeader;
