import React, { useState } from "react";

import Reply from "./Reply";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Replies() {
  const [show, setShow] = useState(false);
  return (
    <div className="replies">
      <div className="comment">
        <Reply />
        <div className="view_replies" onClick={() => setShow(!show)}>
          <p>
            view replies{" "}
            {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
          </p>
        </div>
        <div className="reply">{show && <Reply />}</div>
      </div>
    </div>
  );
}

export default Replies;
