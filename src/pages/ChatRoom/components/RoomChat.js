import React, { useRef } from "react";

import CurrentRoomUser from "./CurrentRoomUser";

function RoomChat({ chatroom }) {
  const divRef = useRef(null);
  return (
    <div className="chat">
      {chatroom.map((chat, i) => (
        <CurrentRoomUser message={chat} />
      ))}
      <div ref={divRef}></div>
    </div>
  );
}

export default RoomChat;
