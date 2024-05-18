import React, { useEffect, useState, useContext, useRef } from "react";

import RoomChat from "./components/RoomChat";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useWindowDimensions from "../../components/useWindowDimensions";
import { useParams, useNavigate } from "react-router-dom";

import { ValueContext } from "../../Context";

function SingleChatRoom() {
  const { height } = useWindowDimensions();
  const { id } = useParams();
  const { chatroom, setChatroom, socket } = useContext(ValueContext);
  const _id = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const divRef = useRef(null);
  const history = useNavigate();

  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("chatroom", (result) => {
    setChatroom(result.chatMade.messages);
    setMessage("");
  });

  const setScroll = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/singlechatroom/${id}`, {
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
        console.log(json);
        setChatroom(json.chat.messages);
        setTitle(json.chat.title);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMessage = () => {
    fetch(`http://127.0.0.1:8000/api/user/chatroom/${id}`, {
      method: "POST",
      body: JSON.stringify({
        userId: _id,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      // .then((json) => setScroll())
      .catch((err) => console.log(err));
  };
  return (
    <div className="single_chatroom">
      <div className="single_chat" style={{ height: `${height - 60}px` }}>
        <div className="chat_header">
          <div className="back" onClick={() => history(-1)}>
            <ArrowBackIosIcon />
          </div>
          <div className="chat_user_image">
            <img
              src="https://res.cloudinary.com/dex0mkckw/image/upload/v1713481897/92325970043_hzkfkj.png"
              alt=""
            />
          </div>
          <h3>{title}</h3>
        </div>
        <RoomChat chatroom={chatroom} title={title} />
        {/* <div ref={divRef}></div> */}
      </div>
      <div className="chat_input">
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleMessage}>Send</button>
      </div>
    </div>
  );
}

export default SingleChatRoom;
