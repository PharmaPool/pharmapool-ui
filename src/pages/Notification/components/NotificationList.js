import React from "react";

import Notification from "./Notification";

function NotificationList({ notifications }) {
  return (
    <div className="notification_list">
      {notifications.length < 1 ? (
        <h3>No notifications yet</h3>
      ) : (
        notifications.map((notification, i) => (
          <Notification key={i} notification={notification} />
        ))
      )}
    </div>
  );
}

export default NotificationList;
