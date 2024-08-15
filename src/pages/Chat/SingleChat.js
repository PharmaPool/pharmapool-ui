import React, { useEffect, useState, useContext, useRef } from "react";

// import PrivateHeader from "../components/PrivateHeader";
import Chat from "./components/Chat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useWindowDimensions from "../../components/useWindowDimensions";
import { useParams, useNavigate } from "react-router-dom";
import { ValueContext } from "../../Context";
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

  // socket.on("connect", () => {
  //   console.log("chat connected");
  // });

  socket.on("chat", (result) => {
    setChat(result.chatMade.messages);
    setMessage("");
  });

  useEffect(() => {
    const token = tokenChecker();
    if (!token) {
      history("/signin");
    }
    fetch(`https://www.pharmapoolserver.com/api/user/singlechat/${id}`, {
      method: "POST",
      body: JSON.stringify({
        userId: _id,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.chat.users);
        setTitle(json.chat.users[0].userId.fullName);
        setProfileImage(json.chat.users[0].userId.profileImage.imageUrl);
        setFriendId(json.chat.users[0].userId._id);
        setChat(json.chat.messages);
        setUsers(json.chat.users);
      })
      .catch((err) => console.log(err));
  }, [_id, id, history, setChat, tokenChecker]);

  const handleMessage = () => {
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
            <h6
              style={{
                wordBreak: "break-word",
                lineClamp: "1",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </h6>
          </div>
          <div className="chat_profile">
            <ChatProfile users={users} title={title} id={id} />
          </div>
        </div>
        <Chat chat={chat} />
        <div ref={divReff}></div>
      </div>
      <div className="chat_input">
        <input
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
