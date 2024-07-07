import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

function Notification({ notification }) {
  return (
    <div className="notification">
      <div>
        <h6>{notification.payload.alertType}</h6>
        <p>{notification.message}</p>
      </div>
    </div>
  );
}

export default Notification;
