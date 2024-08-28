import React, { useEffect, useState, useContext } from "react";

import RoomChat from "./components/RoomChat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useWindowDimensions from "../../components/useWindowDimensions";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { ValueContext } from "../../Context";
import ChatProfile from "./components/ChatroomProfile";
import { jwtDecode } from "jwt-decode";

function SingleChatRoom() {
  const { height } = useWindowDimensions();
  const { id } = useParams();
  const { chatroom, setChatroom, socket, tokenChecker } =
    useContext(ValueContext);
  const _id = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  // const divRef = useRef(null);
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState("");
  const token = localStorage.getItem("token");
  const location = useLocation();

  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("chatroom", (result) => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      history(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    setChatroom(result.chatMade.messages);
    setMessage("");
  });

  useEffect(() => {
    fetch(`https://www.pharmapoolserver.com/api/user/singlechatroom/${id}`, {
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
        if (json.error) {
          history(`/signin?`);
          return;
        }
        setAdmin(json.chat.admin);
        setChatroom(json.chat.messages);
        setTitle(json.chat.title);
        setUsers(json.chat.users);
      })
      .catch((err) => console.log(err));
  }, [_id, id, history, setChatroom, tokenChecker]);

  const handleMessage = () => {
    socket.emit("chatroom", { userId: _id, message, _id: id });
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };

  return (
    <div className="single_chatroom">
      <div className="single_chat" style={{ height: `${height - 60}px` }}>
        <div>
          <div className="chat_header">
            <div className="back" onClick={() => history("/chatroom")}>
              <ArrowBackIcon />
            </div>
            <div>
              <div className="chat_user_image">
                <img
                  src="https://res.cloudinary.com/dex0mkckw/image/upload/v1713481897/92325970043_hzkfkj.png"
                  alt=""
                />
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
              <ChatProfile title={title} users={users} id={id} admin={admin} />
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
        <RoomChat chatroom={chatroom} title={title} />
        {/* <div ref={divRef}></div> */}
      </div>
      <div className="chat_input">
        <textarea
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeydown}
          autoFocus
          rows={1}
        />
        <button onClick={handleMessage}>Send</button>
      </div>
    </div>
  );
}

export default SingleChatRoom;
