import React, { useState, useEffect, useContext } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import ChatRoomList from "./components/ChatRoomList";
import NewChatRoomModal from "./components/NewChatRoomModal";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";
// import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

function ChatRoom() {
  const { width } = useWindowDimensions();
  const _id = localStorage.getItem("userId");
  const [chatrooms, setChatrooms] = useState([]);
  const { tokenChecker, setAlert } = useContext(ValueContext);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setAlert(
      true,
      "ALL TRANSACTIONS SHOULD BE DONE THROUGH PHARMAPOOL TO AVOID SCAM. ALL FINANCIAL TRANSACTIONS SHOULD BE DONE THROUGH PHARMAPOOL ACCOUNT FOR SECURITY REASONS",
      "Warning"
    );
    fetch(`http://127.0.0.1:8000/api/user/messages/${_id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate(`/verify/signin?redirectTo=${location.pathname}`);
          return;
        }
        setChatrooms(json.messages.chatroomcontent);
      })
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
