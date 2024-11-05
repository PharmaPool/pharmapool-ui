import React, { useEffect, useState, useContext, useRef } from "react";

// import PrivateHeader from "../components/PrivateHeader";
import Chat from "./components/Chat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useWindowDimensions from "../../components/useWindowDimensions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ValueContext } from "../../Context";
import { jwtDecode } from "jwt-decode";
import ChatProfile from "./components/ChatProfile";

function SingleChat() {
  const { height } = useWindowDimensions();
  const { id } = useParams();
  const { chat, setChat, socket, tokenChecker } = useContext(ValueContext);
  const _id = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [friendId, setFriendId] = useState("");
  const [users, setUsers] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const divReff = useRef(null);
  const history = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  socket.on("chat", (result) => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      history(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    setChat(result.chatMade.messages);
    setMessage("");
  });

  useEffect(() => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      history(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch(`http://127.0.0.1:8000/api/user/singlechat/${id}`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          history(`/verify/signin?redirectTo=${location.pathname}`);
          return;
        }
        const friend = json.chat.users.filter(
          (user) => user.userId._id !== _id
        );
        setTitle(friend[0].userId.fullName);
        setProfileImage(friend[0].userId.profileImage.imageUrl);
        setFriendId(friend[0].userId._id);
        setChat(json.chat.messages);
        setUsers(json.chat.users);
      })
      .catch((err) => console.log(err));
  }, [_id, id, history, setChat, tokenChecker]);

  const handleMessage = () => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      history(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    socket.emit("chat", { userId: _id, message, friendId });
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };
  return (
    <>
      <div className="single_chat" style={{ height: `${height - 60}px` }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="chat_header">
            <div className="back" onClick={() => history(-1)}>
              <ArrowBackIcon />
            </div>
            <div>
              <div className="chat_user_image">
                <img src={profileImage} alt="" />
              </div>
            </div>
            <div
              className="chat_titl"
              style={{
                overflow: "hidden",
              }}
            >
              <h5
                style={{
                  wordBreak: "break-word",
                  lineClamp: "1",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </h5>
            </div>
            <div className="chat_profile">
              <ChatProfile users={users} title={title} id={id} />
            </div>
          </div>
          <div
            style={{
              position: "relative",
              top: "3.5rem",
              textAlign: "center",
              width: "100%",
            }}
          >
            <p
              style={{ fontWeight: "bold", textAlign: "center", width: "100%" }}
            >
              ALL TRANSACTIONS SHOULD BE DONE THROUGH PHARMAPOOL TO AVOID SCAM{" "}
              <br />
              ALL FINANCIAL TRANSACTIONS SHOULD BE DONE THROUGH PHARMAPOOL
              ACCOUNT FOR SECURITY REASONS
            </p>
          </div>
        </div>
        <Chat chat={chat} />
        <div ref={divReff}></div>
      </div>
      <div className="chat_input">
        <textarea
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeydown}
          autoFocus
        />
        <button onClick={handleMessage}>Send</button>
      </div>
    </>
  );
}

export default SingleChat;
