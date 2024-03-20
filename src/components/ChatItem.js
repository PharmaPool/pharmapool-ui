import React from "react";

import { useNavigate } from "react-router-dom";

function ChatItem() {
  const navigate = useNavigate();
  return (
    <div className="chat_item" onClick={() => navigate("/chat")}>
      <div className="chat_image"></div>
      <div className="chat_title">
        <h5>Chat title</h5>
        <p>Last message of group</p>
      </div>
    </div>
  );
}

export default ChatItem;
