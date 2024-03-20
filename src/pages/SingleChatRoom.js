import React from 'react'

import RoomChat from '../components/RoomChat'
import PrivateHeader from '../components/PrivateHeader';

function SingleChatRoom() {
  return (
    <>
      <PrivateHeader />
      <div className="single_chat">
        <RoomChat />
      </div>
      <div className="chat_input">
        <input type="text" />
        <button>Send</button>
      </div>
    </>
  );
}

export default SingleChatRoom
