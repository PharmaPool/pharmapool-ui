import React, { useContext } from "react";

import { ValueContext } from "../../../Context";
import { useNavigate, useNavigation } from "react-router-dom";

function PharmacyHeading({ title, url }) {
    const { pharmacy } = useContext(ValueContext);
    const navigate = useNavigate()
  return (
    <div className="heading_cont">
      <div className="pharmacy_title">
        <h1 style={{ textTransform: "capitalize" }}>{pharmacy.businessName}</h1>
        <p>{pharmacy.about}</p>
      </div>
      <div className="pharmacy_logo">
        {pharmacy.logo && (
          <img src={pharmacy.logo.imageUrl} alt="pharmacy_logo" />
        )}
      </div>
      <div className="pharmacy_menu">
        <div>
          <button onClick={()=>navigate(url)}>{title}</button>
        </div>
        <div>
          <button onClick={()=>navigate("/product-gallery")}>Product Gallery</button>
        </div>
      </div>
    </div>
  );
}

export default PharmacyHeading;
