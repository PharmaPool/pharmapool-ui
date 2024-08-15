import React, { useState } from "react";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Reply({ comment, postId }) {
  const [reply, setReply] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [addReply, setAddReply] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  console.log(comment);

  const handleReply = () => {
    fetch(
      `https://www.pharmapoolserver.com/api/feed/post/${postId}/comment/reply`,
      {
        method: "POST",
        body: JSON.stringify({
          content: addReply,
          userId,
          commentId: comment._id,
        }),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setAddReply("");
        setReply(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {/* <div className="comment_shade">
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
          <input
            type="text"
            placeholder="type reply"
            value={addReply}
            onChange={(e) => setAddReply(e.target.value)}
          />
          <button className="interest" onClick={handleReply}>
            reply
          </button>
          <button className="x" onClick={() => setReply(false)}>
            x
          </button>
        </div>
      )} */}
    </div>
  );
}

export default Reply;
