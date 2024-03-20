import React from "react";

import CurrentUserChat from "./CurrentUserChat";
import OtherUserChat from "./OtherUserChat";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Chat() {
  return (
    <div className="chat">
      <div className="chat_header">
        <ArrowBackIosIcon />
        <div className="chat_user_image"></div>
        <h3>Wilson Zimthamaha</h3>
      </div>
      <OtherUserChat />
      <CurrentUserChat />
      <OtherUserChat />
      <CurrentUserChat />
      <OtherUserChat />
      <CurrentUserChat />
      <OtherUserChat />
      <CurrentUserChat />
      <OtherUserChat />
      <CurrentUserChat />
    </div>
  );
}

export default Chat;
