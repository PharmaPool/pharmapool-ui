import React, { useState, useEffect } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import ChatRoomList from "./components/ChatRoomList";
import NewChatRoomModal from "./components/NewChatRoomModal";

import useWindowDimensions from "../../components/useWindowDimensions";

function ChatRoom() {
  const { width } = useWindowDimensions();
  const _id = localStorage.getItem("userId");
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/messages/${_id}`)
      .then((response) => response.json())
      .then((json) => setChatrooms(json.messages.chatroomcontent))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {width > 900 ? <PrivateHeader /> : <MediaHeader />}
      <div className="chatrooms">
        <div className="chatroom_title">
          <h4>Chatrooms</h4>{" "}
          <div>
            <NewChatRoomModal />
          </div>
        </div>
        <ChatRoomList chatrooms={chatrooms} />
      </div>
    </>
  );
}

export default ChatRoom;
