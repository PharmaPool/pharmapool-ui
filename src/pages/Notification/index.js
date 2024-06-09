import React, { useEffect, useState } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import NotificationList from "./components/NotificationList";

import useWindowDimensions from "../../components/useWindowDimensions";

function Notification() {
  const { width } = useWindowDimensions();
  const _id = localStorage.getItem("userId");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/feed/notifications/${_id}`)
      .then((res) => res.json())
      .then((json) => setNotifications(json.notifications.content))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {width > 1000 ? <PrivateHeader /> : <MediaHeader />}
      <div className="notifications">
        <h4>Notifications</h4>
        <NotificationList notifications={notifications} />
      </div>
    </>
  );
}

export default Notification;
