import React, { useEffect, useState } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import ChatList from "./components/ChatList";

import useWindowDimensions from "../../components/useWindowDimensions";

function Chats() {
  const { width } = useWindowDimensions();
  const [chats, setChats] = useState([]);
  const _id = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user/messages/${_id}`)
      .then((response) => response.json())
      .then((json) => setChats(json.messages.singlechatcontent))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {width > 900 ? <PrivateHeader /> : <MediaHeader />}
      <div className="chats">
        <h4>Chats</h4>
        <ChatList chats={chats} />
      </div>
    </>
  );
}

export default Chats;
