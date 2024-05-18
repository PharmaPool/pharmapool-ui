import React from "react";
import "./index.css"

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import NotificationList from "./components/NotificationList";

import useWindowDimensions from "../../components/useWindowDimensions";

function Notification() {
  const { width } = useWindowDimensions();
  return (
    <>
      {width > 1000 ? <PrivateHeader /> : <MediaHeader />}
      <div className="notifications">
        <h4>Notifications</h4>
        <NotificationList />
      </div>
    </>
  );
}

export default Notification;
