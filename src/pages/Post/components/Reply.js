import React, { useState } from "react";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Reply({ comment }) {
  const [reply, setReply] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
    <div>
      <div className="comment_shade">
        <div className="comment_user">
          <div className="comment_image">
            <img src={comment.user.profileImage.imageUrl} alt="" />
          </div>
          <p>{comment.user.fullName}</p>
        </div>
        <div className="comment_body">
          <p>{comment.content}</p>
        </div>
      </div>
      <div className="comment_buttom">
        <div className="reply_comment">
          <p onClick={() => setClicked(!clicked)}>
            <ThumbUpIcon
              fontSize="small"
              color={clicked ? "primary" : "inherit"}
            />{" "}
            like
          </p>
          <p onClick={() => setReply(true)}>
            <ChatBubbleOutlineIcon fontSize="small" /> reply
          </p>
        </div>
      </div>
      {reply && (
        <div className="add_reply">
          <input type="text" placeholder="type reply" />
          <button className="interest">reply</button>
          <button className="x" onClick={() => setReply(false)}>
            x
          </button>
        </div>
      )}
    </div>
  );
}

export default Reply;
