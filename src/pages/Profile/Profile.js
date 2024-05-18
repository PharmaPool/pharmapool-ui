import React, { useEffect, useState, useContext } from "react";
import "./index.css";

import PrivateHeader from "../../components/PrivateHeader";
import Banner from "./components/Banner";
import Details from "./components/Details";
import ProfileNavigation from "./components/ProfileNavigation";
import ProfileBody from "./components/ProfileBody";

import { ValueContext } from "../../Context";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [fullname, setFullname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [posts, setPosts] = useState([]);
  const { businesses } = useContext(ValueContext);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/profile/${id}`)
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
      <PrivateHeader />
      <div className="profile">
        <Banner fullname={fullname} profileImage={profileImage} />
        <Details details={details} />
        <ProfileNavigation />
        <ProfileBody posts={posts} businesses={businesses} id={id} />
      </div>
    </>
  );
}

export default Profile;
