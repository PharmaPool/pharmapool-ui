import React from "react";

import CurrentUserChat from "./CurrentUserChat";

function Chat({ chat }) {
  return (
    <div className="chat">
      {chat.map((chat, i) => (
        <CurrentUserChat message={chat} />
      ))}
    </div>
  );
}

export default Chat;
