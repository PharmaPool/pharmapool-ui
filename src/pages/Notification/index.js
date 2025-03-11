import React, { useContext, useEffect, useState } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import NotificationList from "./components/NotificationList";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import useWindowDimensions from "../../components/useWindowDimensions";
import { jwtDecode } from "jwt-decode";
import { ValueContext } from "../../Context";
import { useNavigate, useLocation } from "react-router-dom";

function Notification() {
  const { width } = useWindowDimensions();
  const _id = localStorage.getItem("userId");
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const { tokenChecker } = useContext(ValueContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch(`http://127.0.0.1:8000/api/feed/notifications`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          navigate(`/verify/signin?redirectTo=${location.pathname}`);
          return;
        }
        setNotifications(json.notifications.content);
      })
      .catch((err) => console.log(err));
  }, [_id, navigate, tokenChecker]);

  const clearNotifications = () => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch(`http://127.0.0.1:8000/api/feed/notifications`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          navigate(`/verify/signin?redirectTo=${location.pathname}`);
          return;
        }
        setNotifications(json.notifications.content);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {width > 1000 ? <PrivateHeader /> : <MediaHeader />}
      <div className="notifications">
        <div class="notifications_header">
          <h5>Notifications</h5>
          <div>
            <button onClick={clearNotifications}>
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
