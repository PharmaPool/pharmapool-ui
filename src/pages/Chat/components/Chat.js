import React from "react";

import CurrentUserChat from "./CurrentUserChat";
import OtherUserChat from "./OtherUserChat";

function Chat({ chat }) {
  const _id = localStorage.getItem("userId");
  return (
    <div className="chat">
      {chat.map((chat, i) =>
        chat.user._id === _id ? (
          <CurrentUserChat message={chat.message} />
        ) : (
          <OtherUserChat message={chat.message} />
        )
      )}
    </div>
  );
}

export default Chat;
