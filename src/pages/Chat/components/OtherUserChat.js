import React from "react";

function OtherUserChat({ message }) {
  return (
    <div>
      <div className="other_user">
        <div className="chat_body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default OtherUserChat;
