import React from "react";

import { useNavigate } from "react-router-dom";

function ChatRoomItem({ chatroom }) {
  const navigate = useNavigate();
  return (
    <div
      className="chat_item"
      onClick={() => navigate(`/chatroom/${chatroom._id}`)}
    >
      <div className="chat_image"></div>
      <div
        className="chat_title"
        style={{
          overflow: "hidden",
        }}
      >
        <h6
          style={{
            wordBreak: "break-word",
            lineClamp: "1",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {chatroom.title}
        </h6>
        {chatroom.messages.length > 0 ? (
          <p
            style={{
              wordBreak: "break-word",
              lineClamp: "1",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
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
