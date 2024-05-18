import React from "react";

import ChatRoomItem from "./ChatRoomItem";

function ChatRoomList({ chatrooms }) {
  return (
    <div className="chat_list">
      {chatrooms.map((chatroom, i) => (
        <ChatRoomItem chatroom={chatroom} key={i} />
      ))}
    </div>
  );
}

export default ChatRoomList;
