import React from "react";

import PrivateHeader from "../components/PrivateHeader";
import ChatList from "../components/ChatList";

function Chats() {
  return (
    <>
      <PrivateHeader />
      <div className="chats">
        <h3>Chats</h3>
        <ChatList />
      </div>
    </>
  );
}

export default Chats;
