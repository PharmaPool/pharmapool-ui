import React, { useEffect, useState, useContext } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import Banner from "./components/Banner";
import Details from "./components/Details";
import ProfileNavigation from "./components/ProfileNavigation";
import ProfileBody from "./components/ProfileBody";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MessageIcon from "@mui/icons-material/Message";
import DoneIcon from "@mui/icons-material/Done";

import { ValueContext } from "../../Context";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useWindowDimensions from "../../components/useWindowDimensions";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [details, setDetails] = useState({});
  const [fullname, setFullname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [posts, setPosts] = useState([]);
  const { businesses, tokenChecker } = useContext(ValueContext);
  const currentUser = localStorage.getItem("userId");
  const [requestSent, setRequestSent] = useState(false);
  const [friends, setFriends] = useState([]);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [requestAccepted, setRequestAccepted] = useState(false);
  const location = useLocation();
  const [requestId, setRequestId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/profile/${id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          navigate(`/verify/signin?redirectTo=${location.pathname}`);
          return;
        }
        setDetails(res.user.details);
        setFullname(res.user.fullName);
        setProfileImage(res.user.profileImage.imageUrl);
        setPosts(res.user.posts);
        setFriends(res.user.friends);
        if (
          res.user.requests.content.find(
            (user) => user.user._id === currentUser
          ) !== undefined
        ) {
          setRequestSent(true);
        }
      })
      .catch((err) => console.log(err));

    fetch(`http://127.0.0.1:8000/api/user/profile/${currentUser}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (
          res.user.requests.content.find((user) => user.user._id === id) !==
          undefined
        ) {
          setAlreadyRequested(true);

          const request = res.user.requests.content.find(
            (user) => user.user._id === id
          );
          setRequestId(request._id);
        }
      })
      .catch((err) => console.log(err));
  }, [id, navigate, currentUser]);

  const handleRequest = () => {
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch("http://127.0.0.1:8000/api/user/friend-request", {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser,
        friendId: id,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success === true) {
          setRequestSent(true);
        }
      });
  };

  const handleChat = () => {
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch("http://127.0.0.1:8000/api/user/chat", {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser,
        friendId: id,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        navigate(`/chat/${json.chat._id}`);
      })
      .catch((err) => console.log(err));
  };

  const acceptRequest = () => {
    const token = tokenChecker();
    if (!token) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch("http://127.0.0.1:8000/api/user/accept-request", {
      method: "POST",
      body: JSON.stringify({
        friendId: id,
        requestId,
      }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success === true) {
          setRequestAccepted(true);
          window.location.reload();
        }
      });
  };

  return (
    <>
      {width > 1200 ? <PrivateHeader /> : <MediaHeader />}
      <div className="profile">
        <Banner fullname={fullname} profileImage={profileImage} />
        <Details details={details} />
        {alreadyRequested ? (
          <div>
            {currentUser !== id && (
              <div className="request_button">
                {friends.find((friend) => friend._id === currentUser) ===
                  undefined && (
                  <button onClick={acceptRequest}>
                    {requestAccepted ? (
                      <DoneIcon style={{ marginRight: "0.5rem" }} />
                    ) : (
                      <PersonAddIcon style={{ marginRight: "0.5rem" }} />
                    )}
                    {requestAccepted && width > 900
                      ? "Request accepted"
                      : "Accept request"}
                  </button>
                )}

                <button onClick={handleChat}>
                  <MessageIcon style={{ marginRight: "0.5rem" }} />
                  {width > 900 ? "Message user" : ""}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {currentUser !== id && (
              <div className="request_button">
                {friends.find((friend) => friend._id === currentUser) ===
                  undefined && (
                  <button onClick={handleRequest}>
                    {requestSent ? (
                      <DoneIcon style={{ marginRight: "0.5rem" }} />
                    ) : (
                      <PersonAddIcon style={{ marginRight: "0.5rem" }} />
                    )}
                    {requestSent && width > 900
                      ? "Request sent"
                      : "Send request"}
                  </button>
                )}

                <button onClick={handleChat}>
                  <MessageIcon style={{ marginRight: "0.5rem" }} />
                  {width > 900 ? "Message user" : ""}
                </button>
              </div>
            )}
          </div>
        )}
        <ProfileNavigation />
        <ProfileBody posts={posts} businesses={businesses} id={id} />
      </div>
    </>
  );
}

export default Profile;
