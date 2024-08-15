import React, { useState, useEffect, useContext } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import ChatRoomList from "./components/ChatRoomList";
import NewChatRoomModal from "./components/NewChatRoomModal";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";
import { useNavigate } from "react-router-dom";

function ChatRoom() {
  const { width } = useWindowDimensions();
  const _id = localStorage.getItem("userId");
  const [chatrooms, setChatrooms] = useState([]);
  const { tokenChecker } = useContext(ValueContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }
    fetch(`https://www.pharmapoolserver.com/api/user/messages/${_id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => setChatrooms(json.messages.chatroomcontent))
      .catch((err) => console.log(err));
  }, [_id, navigate, tokenChecker]);
  return (
    <>
      {width > 1200 ? <PrivateHeader /> : <MediaHeader />}
      <div className="chatrooms">
        <div className="chatroom_title">
          <h5>Chatrooms</h5>
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
