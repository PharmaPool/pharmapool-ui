import React, { useState } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Reply from "./Reply";
import Replies from "./Replies";

function Comments({ comments, postId }) {
  const [show, setShow] = useState(false);
  return (
    <div className="comments">
      {comments.map((comment, i) => (
        <div className="comment" key={i}>
          <Reply comment={comment} postId={postId} />
          {comment.replies.length > 0 && (
            <div className="view_replies" onClick={() => setShow(!show)}>
              <p>
                view replies{" "}
                {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
              </p>
            </div>
          )}
          {show && <Replies replies={comment.replies} />}
        </div>
      ))}
    </div>
  );
}

export default Comments;
