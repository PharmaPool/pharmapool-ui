import React from "react";

import { useNavigate } from "react-router-dom";

function ChatItem({ chat }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const user = chat.users.filter((user) => user.userId._id !== userId);
  console.log(chat)
  return (
    <div className="chat_itm" onClick={() => navigate(`/chat/${chat._id}`)}>
      <div className="chat_imag">
        <img src={user[0].userId.profileImage.imageUrl} alt="" />
      </div>
      {chat.messages.length > 0 ? (
        <div className="chat_title">
          <h6>
            {user[0].userId.firstName} {user[0].userId.lastName}
          </h6>
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
            {user[0].userId.firstName} {user[0].userId.lastName}
          </h5>
        </div>
      )}
    </div>
  );
}

export default ChatItem;
