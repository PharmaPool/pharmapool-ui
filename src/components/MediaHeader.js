import React from "react";

import images from "../data/images";

import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useNavigate } from "react-router-dom";

import AccountMenu from "./ProfileIcon";

function MediaHeader() {
  const navigate = useNavigate();
  return (
    <div className="media_header">
      <div className="media_navs">
        <div className="media_header_image" onClick={() => navigate("/")}>
          <img src={images.logo} alt="" width={30} />
        </div>
        <a href="/posts">
          <HomeIcon style={{ fontSize: "1.5rem" }} />
        </a>
        <a href="/private_business">
          <StoreIcon style={{ fontSize: "1.5rem" }} />
        </a>
        <a href="/chatrooms">
          <GroupsIcon style={{ fontSize: "1.5rem" }} />
        </a>
        <a href="/chats">
          <ChatIcon style={{ fontSize: "1.5rem" }} />
        </a>
        <a href="/requests">
          <PersonAddAlt1Icon style={{ fontSize: "1.5rem" }} />
        </a>
        <a href="/notifications">
          <NotificationsIcon style={{ fontSize: "1.5rem" }} />
        </a>
        <AccountMenu />
      </div>
    </div>
  );
}

export default MediaHeader;
