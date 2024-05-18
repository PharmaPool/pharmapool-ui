import React, { useRef } from "react";

import CurrentRoomUser from "./CurrentRoomUser";
import OtherRoomUser from "./OtherRoomUser";

function RoomChat({ chatroom }) {
  const _id = localStorage.getItem("userId");
  const divRef = useRef(null);
  return (
    <div className="chat">
      {chatroom.map((chat, i) =>
        chat.user._id === _id ? (
          <CurrentRoomUser message={chat} />
        ) : (
          <OtherRoomUser message={chat} />
        )
      )}
      <div ref={divRef}></div>
    </div>
  );
}

export default RoomChat;
