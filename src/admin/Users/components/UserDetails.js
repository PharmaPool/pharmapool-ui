import React, { useState, useEffect, useContext } from "react";

import images from "../../../data/images";

import ProfileBody from "../../../pages/Profile/components/ProfileBody";
import ProfileNavigation from "../../../pages/Profile/components/ProfileNavigation";

import { ValueContext } from "../../../Context";

function UserDetails() {
  const { adminUserId } = useContext(ValueContext);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    if (adminUserId !== "") {
      fetch(
        `https://www.pharmapoolserver.com/api/user/profile/${adminUserId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          setUser(res.user);
          setPosts(res.user.posts);
        })
        .catch((err) => console.log(err));

      fetch("https://www.pharmapoolserver.com/api/admin/business", {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((json) => setBusinesses(json.businesses))
        .catch((err) => console.log(err));
    }
  }, [adminUserId]);

  return (
    <>
      {user._id !== undefined ? (
        <div className="user_details">
          <div class="user_details_banner">
            <div class="user_details_banner_img">
              <img src={user.profileImage.imageUrl} alt="" />
            </div>
            <h3>{user.fullName}</h3>
            <div class="user_details_banner_detail">
              <p>License number: {user.details.registrationNumber}</p>
              <p>Email: {user.details.email}</p>
              <p>Phone: {user.details.phoneNumber}</p>
              <p>Location: {user.details.address}</p>
              <p>State: {user.details.state}</p>
            </div>
          </div>
          <ProfileNavigation />
          <ProfileBody posts={posts} businesses={businesses} id={user._id} />
        </div>
      ) : (
        <div className="user_details"></div>
      )}
    </>
  );
}

export default UserDetails;
