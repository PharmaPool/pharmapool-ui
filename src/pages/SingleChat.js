import React from "react";

import PrivateHeader from "../components/PrivateHeader";
import Chat from "../components/Chat";

function SingleChat() {
  return (
    <>
      <PrivateHeader />
      <div className="single_chat">
        <Chat />
      </div>
      <div className="chat_input">
        <input type="text" placeholder="Type a message" />
        <button>Send</button>
      </div>
    </>
  );
}

export default SingleChat;
