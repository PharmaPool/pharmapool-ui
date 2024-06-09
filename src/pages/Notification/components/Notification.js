import React from "react";

function Notification({ notification }) {
  return (
    <div className="notification">
      <h6>{notification.payload.alertType}</h6>
      <p>{notification.message}</p>
    </div>
  );
}

export default Notification;
