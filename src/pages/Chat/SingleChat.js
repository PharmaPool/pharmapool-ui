import React, { useEffect, useState, useContext, useRef } from "react";

// import PrivateHeader from "../components/PrivateHeader";
import Chat from "./components/Chat";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useWindowDimensions from "../../components/useWindowDimensions";
import { useParams, useNavigate } from "react-router-dom";
import { ValueContext } from "../../Context";

function SingleChat() {
  const { height } = useWindowDimensions();
  const { id } = useParams();
  const { chat, setChat, socket } = useContext(ValueContext);
  const _id = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [friendId, setFriendId] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const divReff = useRef(null);
  const history = useNavigate();

  // socket.on("connect", () => {
  //   console.log("chat connected");
  // });

  socket.on("chat", (result) => {
    setChat(result.chatMade.messages);
    setMessage("");
    setTimeout(
      () => divReff.current.scrollIntoView({ behavior: "instant" }),
      1
    );
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user/singlechat/${id}`, {
      method: "POST",
      body: JSON.stringify({
        userId: _id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.chat.users[0].userId.fullName);
        setProfileImage(json.chat.users[0].userId.profileImage.imageUrl);
        setFriendId(json.chat.users[0].userId._id);
        setChat(json.chat.messages);
      })
      .catch((err) => console.log(err));
    setTimeout(
      () => divReff.current.scrollIntoView({ behavior: "instant" }),
      10
    );
  }, []);

  const handleMessage = () => {
    socket.emit("chatss", { userId: _id, message, friendId });
  };
  return (
    <>
      <div className="single_chat" style={{ height: `${height - 60}px` }}>
        <div className="chat_header">
          <div className="back" onClick={() => history(-1)}>
            <ArrowBackIosIcon />
          </div>
          <div className="chat_user_image">
            <img src={profileImage} alt="" />
          </div>
          <h3>{title}</h3>
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
        />
        <button onClick={handleMessage}>Send</button>
      </div>
    </>
  );
}

export default SingleChat;
