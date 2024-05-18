import React from "react";

import { useNavigate } from "react-router-dom";

function CurrentRoomUser({ message }) {
  const navigate = useNavigate();
  return (
    <div className="current_room_user">
      {/* <div
        className="room_user_image"
        onClick={() => navigate(`/profile/${message.user._id}`)}
      >
        <img src={message.user.profileImage.imageUrl} alt="" />
      </div> */}
      <div className="room_user_body">
        {/* <h6>{message.user.fullName}</h6> */}
        <p>{message.message}</p>
      </div>
    </div>
  );
}

export default CurrentRoomUser;
