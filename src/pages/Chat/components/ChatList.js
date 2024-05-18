import React from "react";

import ChatItem from "./ChatItem";

function ChatList({ chats }) {
  return (
    <div className="chat_list">
      {chats.map((chat, i) => (
        <ChatItem chat={chat} key={i} />
      ))}
    </div>
  );
}

export default ChatList;
