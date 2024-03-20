import React, { useState } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Reply from "./Reply";
import Replies from "./Replies";

function Comments() {
  const [show, setShow] = useState(false);
  return (
    <div className="comments">
      <div className="comment">
        <Reply />
        <div className="view_replies" onClick={() => setShow(!show)}>
          <p>
            view replies{" "}
            {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
          </p>
        </div>
        {show && <Replies />}
      </div>
    </div>
  );
}

export default Comments;
