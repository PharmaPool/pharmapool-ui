import React from "react";

function Banner({ fullname, profileImage }) {
  return (
    <div className="profile_banner">
      <div className="profile_image">
        <img src={profileImage} alt="" />
      </div>
      <div className="full_name">
        <h3>{fullname}</h3>
      </div>
    </div>
  );
}

export default Banner;
