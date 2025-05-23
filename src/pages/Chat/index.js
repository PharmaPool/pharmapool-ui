import React, { useEffect, useState, useContext } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import ChatList from "./components/ChatList";
import NewChatModal from "./components/NewChatModal";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

function Chats() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [chats, setChats] = useState([]);
  const _id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { tokenChecker, setAlert } = useContext(ValueContext);
  const location = useLocation();

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
        setChats(json.messages.singlechatcontent);
      })
      .catch((err) => console.log(err));
  }, [_id, navigate, tokenChecker]);
  return (
    <>
      {width > 1200 ? <PrivateHeader /> : <MediaHeader />}
      <div className="chats">
        <div className="chatroom_title">
          <h5>Chats</h5>
          <div>
            <NewChatModal />
          </div>
        </div>
        <ChatList chats={chats} />
      </div>
    </>
  );
}

export default Chats;
