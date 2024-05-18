import React, { useEffect, useState, useContext } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import Banner from "./components/UserBanner";
import Details from "./components/UserDetails";
import ProfileNavigation from "./components/ProfileNavigation";
import UserProfileBody from "./components/UserProfileBody";
import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";

function Profile() {
  const _id = localStorage.getItem("userId");
  const [details, setDetails] = useState({});
  const [fullname, setFullname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [posts, setPosts] = useState([]);
  const { businesses } = useContext(ValueContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/profile/${_id}`)
      .then((response) => response.json())
      .then((res) => {
        setDetails(res.user.details);
        setFullname(res.user.fullName);
        setProfileImage(res.user.profileImage.imageUrl);
        setPosts(res.user.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {width > 900 ? <PrivateHeader /> : <MediaHeader />}
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
