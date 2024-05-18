import React from "react";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

import ImageModal from "./ImageModal";
import NameModal from "./NameModal";

import { useNavigate } from "react-router-dom";

function UserBanner({ fullname, profileImage }) {
  const navigate = useNavigate()
  return (
    <div className="profile_banner">
      <div className="pharmacy_button">
        <button onClick={()=>navigate("/pharmacy")}>
          <LocalPharmacyIcon /> Visit Pharmacy
        </button>
      </div>
      <div className="profile_image">
        <img src={profileImage} alt="" />
      </div>
      <div className="edit_image">
        <ImageModal />
      </div>
      <div className="full_name">
        <h3>{fullname}</h3>
        <NameModal />
      </div>
    </div>
  );
}

export default UserBanner;
