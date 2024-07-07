import React from "react";

import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

import { useNavigate } from "react-router-dom";

function SingleRequest({ request }) {
  const navigate = useNavigate();
  return (
    <div
      className="single_request"
      onClick={() => navigate(`/profile/${request.user._id}`)}
    >
      <div className="request_user">
        <div className="users_image">
          <img
            src={request.user.profileImage.imageUrl}
            alt="user_image"
            width={100}
          />
        </div>
        <h5>
          {request.user.firstName} {request.user.lastName}
        </h5>
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
