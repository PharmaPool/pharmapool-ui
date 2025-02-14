import React, { useContext } from "react";

import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

import { useNavigate, useLocation } from "react-router-dom";
import { ValueContext } from "../../../Context";

function SingleRequest({ request }) {
  const navigate = useNavigate();
  const { tokenChecker } = useContext(ValueContext);
  const location = useLocation();

  const acceptRequest = () => {
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }

    fetch("https://pharmapoolserver.com/api/user/accept-request", {
      method: "POST",
      body: JSON.stringify({
        friendId: request.user._id,
        requestId: request._id,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success === true) {
          window.location.reload();
        }
      });
  };

  const declineRequest = () => {
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }

    fetch("https://pharmapoolserver.com/api/user/decline-request", {
      method: "POST",
      body: JSON.stringify({
        requestId: request._id,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success === true) {
          window.location.reload();
        }
      });
  };
  return (
    <div className="single_request">
      <div
        className="request_user"
        onClick={() => navigate(`/profile/${request.user._id}`)}
      >
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
        <button className="accept" onClick={acceptRequest}>
          <DoneIcon />
        </button>
        <button className="decline" onClick={declineRequest}>
          <ClearIcon />
        </button>
      </div>
    </div>
  );
}

export default SingleRequest;
