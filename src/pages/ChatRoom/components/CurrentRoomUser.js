import React from "react";
import moment from "moment";

import { useNavigate } from "react-router-dom";

function CurrentRoomUser({ message }) {
  const navigate = useNavigate();
  return (
    <div className="current_room_user">
      <div
        className="room_user_image"
        onClick={() => navigate(`/profile/${message.user._id}`)}
      >
        <img src={message.user.profileImage.imageUrl} alt="" />
      </div>
      <div className="room_user_body">
        <div style={{ display: "flex" }}>
          <h6>{message.user.firstName}</h6>
          <p
            style={{
              wordBreak: "break-word",
              lineClamp: "1",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
            }}
          >
            {moment(message.date).format("h:mA, DD-MMM-YYYY")}
          </p>
        </div>
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {message.message}
        </pre>
      </div>
    </div>
  );
}

export default CurrentRoomUser;
