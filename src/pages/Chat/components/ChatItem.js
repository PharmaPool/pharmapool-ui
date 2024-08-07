import React from "react";

import { useNavigate } from "react-router-dom";

function ChatItem({ chat }) {
  const navigate = useNavigate();
  return (
    <div className="chat_item" onClick={() => navigate(`/chat/${chat._id}`)}>
      <div className="chat_image">
        <img src={chat.users[0].userId.profileImage.imageUrl} alt="" />
      </div>
      {chat.messages.length > 0 ? (
        <div className="chat_title">
          <h5>
            {chat.users[0].userId.firstName} {chat.users[0].userId.lastName}
          </h5>
          <p
            style={{
              wordBreak: "break-word",
              lineClamp: "1",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {chat.messages[chat.messages.length - 1].message}
          </p>
        </div>
      ) : (
        <div>
          {" "}
          <h5>
            {chat.users[0].userId.firstName} {chat.users[0].userId.lastName}
          </h5>
        </div>
      )}
    </div>
  );
}

export default ChatItem;
