import React from "react";

import CurrentRoomUser from "./CurrentRoomUser";
import OtherRoomUser from "./OtherRoomUser";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function RoomChat() {
  return (
    <div className="chat">
      <div className="chat_header">
        <ArrowBackIosIcon />
        <div className="chat_user_image"></div>
        <h3>Enugu Joint Purchase</h3>
      </div>
      <OtherRoomUser />
      <CurrentRoomUser />
      <OtherRoomUser />
      <CurrentRoomUser />
      <OtherRoomUser />
      <CurrentRoomUser />
      <OtherRoomUser />
      <CurrentRoomUser />
      <OtherRoomUser />
      <CurrentRoomUser />
    </div>
  );
}

export default RoomChat;
