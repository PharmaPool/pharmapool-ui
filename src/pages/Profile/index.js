import React, { useEffect, useState, useContext } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import Banner from "./components/UserBanner";
import Details from "./components/UserDetails";
import ProfileNavigation from "./components/ProfileNavigation";
import UserProfileBody from "./components/UserProfileBody";
import useWindowDimensions from "../../components/useWindowDimensions";
import { jwtDecode } from "jwt-decode";
import { ValueContext } from "../../Context";
import { useNavigate, useLocation } from "react-router-dom";

function Profile() {
  const _id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [details, setDetails] = useState({});
  const [fullname, setFullname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [posts, setPosts] = useState([]);
  const { businesses } = useContext(ValueContext);
  const { width } = useWindowDimensions();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch(`http://127.0.0.1:8000/api/user/profile/${_id}`, {
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
      })
      .catch((err) => console.log(err));
  }, [_id, token]);

  return (
    <>
      {width > 1200 ? <PrivateHeader /> : <MediaHeader />}
      <div className="profile">
        <Banner fullname={fullname} profileImage={profileImage} />
        <Details details={details} />
        <ProfileNavigation />
        <UserProfileBody posts={posts} businesses={businesses} />
      </div>
    </>
  );
}

export default Profile;
