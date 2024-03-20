import React from 'react'

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Reply() {
  return (
    <div>
      <div className="comment_shade">
        <div className="comment_user">
          <div className="comment_image"></div>
          <p>Wilson Faith</p>
        </div>
        <div className="comment_body">
          <p>Congratulations Sir/Madam</p>
        </div>
      </div>
      <div className="comment_buttom">
        <div className="reply_comment">
          <p>
            <ThumbUpIcon fontSize="small" /> like
          </p>
          <p>
            <ChatBubbleOutlineIcon fontSize="small" /> reply
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Reply
