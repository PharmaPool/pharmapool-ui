import React from "react";

import PrivateHeader from "../components/PrivateHeader";
import ChatRoomList from "../components/ChatRoomList";

function ChatRoom() {
  return (
    <>
      <PrivateHeader />
      <div className="chatrooms">
        <h3>Chatrooms</h3>
        <ChatRoomList />
      </div>
    </>
  );
}

export default ChatRoom;
