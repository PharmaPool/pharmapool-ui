import React from "react";

import { useNavigate } from "react-router-dom";

function ChatRoomItem({ chatroom }) {
  const navigate = useNavigate();
  return (
    <div
      className="chat_item"
      onClick={() => navigate(`/chatroom/${chatroom._id}`)}
    >
      <div className="chat_image">
        <img
          src="https://res.cloudinary.com/dex0mkckw/image/upload/v1713481897/92325970043_hzkfkj.png"
          alt=""
        />
      </div>
      <div className="chat_title">
        <h5>{chatroom.title}</h5>
        {chatroom.messages.length > 0 ? (
          <p style={{ wordBreak: "break-word", lineClamp: "1" }}>
            <b>
              {chatroom.messages[chatroom.messages.length - 1].user.firstName}:
              {"  "}
            </b>
            {chatroom.messages[chatroom.messages.length - 1].message}
          </p>
        ) : (
          <p>
            <b>
              {chatroom.admin.firstName}:{"  "}
            </b>
            <i>created this chatroom</i>
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatRoomItem;
