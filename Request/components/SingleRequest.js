import React from "react";

import Logo from "../../../data/logo.png";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

function SingleRequest() {
  return (
    <div className="single_request">
      <div className="request_user">
        <div className="users_image">
          <img src={Logo} alt="user_image" width={100} />
        </div>
        <h5>wilson zimthamaha</h5>
      </div>
      <div className="request_buttons">
        <button className="accept">
          <DoneIcon />
        </button>
        <button className="decline">
          <ClearIcon />
        </button>
        {/* <button className="view_profile">View Profile</button> */}
      </div>
    </div>
  );
}

export default SingleRequest;
