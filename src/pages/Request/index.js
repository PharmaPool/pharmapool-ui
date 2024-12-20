import React, { useContext, useEffect, useState } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import RequestList from "./components/RequestList";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import useWindowDimensions from "../../components/useWindowDimensions";
import { jwtDecode } from "jwt-decode";
import { ValueContext } from "../../Context";
import { useNavigate, useLocation } from "react-router-dom";

function Request() {
  const { width } = useWindowDimensions();
  const _id = localStorage.getItem("userId");
  const [content, setContent] = useState([]);
  const [result, setResult] = useState([]);
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const { tokenChecker, socket } = useContext(ValueContext);
  const navigate = useNavigate();
  const location = useLocation();

  socket.on("search", (result) => {
    setResult(result.user);
  });

  const handleAdd = (friendId) => {
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch("http://127.0.0.1:8000/api/user/chatroom/add", {
      method: "POST",
      body: JSON.stringify({
        friendId,
      }),
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => window.location.reload())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch(`http://127.0.0.1:8000/api/user/friend-request/${_id}`, {
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
        setContent(json.request.content);
      });
  }, [_id, navigate, tokenChecker, location.pathname]);
  return (
    <>
      {width > 1000 ? <PrivateHeader /> : <MediaHeader />}
      <div className="requests">
        <div class="request_header">
          <h5>Partner Requests</h5>
          <div>
            <button>
              Clear all
              <DeleteForeverIcon />
            </button>
          </div>
        </div>
        <RequestList content={content} />
        <div class="find_friends">
          <h5 style={{ textAlign: "center" }}>Find partners</h5>
          <div class="add_friend">
            <div class="add_friend_input">
              <input
                type="search"
                placeholder="search partner"
                onChange={(e) =>
                  socket.emit("search", { name: e.target.value })
                }
              />
            </div>
            <div class="search_result">
              {result.length > 0 &&
                result.map((user) => (
                  <div className="search_result_item">
                    <div onClick={() => navigate(`/profile/${user._id}`)}>
                      <div className="result_user_image">
                        <img src={user.profileImage.imageUrl} alt="" />
                      </div>
                    </div>
                    <div
                      className="chat_titl"
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      <p>{user.fullName}</p>
                    </div>
                    <div>
                      {users.find((partner) => partner._id === user._id) ===
                        undefined && (
                        <button
                          className="add_button"
                          onClick={() => handleAdd(user._id)}
                        >
                          <PersonAddAltIcon />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Request;
