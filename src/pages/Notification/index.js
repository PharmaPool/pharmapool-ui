import React, { useContext, useEffect, useState } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import NotificationList from "./components/NotificationList";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";
import { useNavigate } from "react-router-dom";

function Notification() {
  const { width } = useWindowDimensions();
  const _id = localStorage.getItem("userId");
  const [notifications, setNotifications] = useState([]);
  const { tokenChecker } = useContext(ValueContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }
    fetch(`https://www.pharmapoolserver.com/api/feed/notifications/${_id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => setNotifications(json.notifications.content))
      .catch((err) => console.log(err));
  }, [_id, navigate, tokenChecker]);
  return (
    <>
      {width > 1000 ? <PrivateHeader /> : <MediaHeader />}
      <div className="notifications">
        <div class="notifications_header">
          <h5>Notifications</h5>
          <div>
            <button>
              Clear all <DeleteForeverIcon />
            </button>
          </div>
        </div>
        <NotificationList notifications={notifications} />
      </div>
    </>
  );
}

export default Notification;
