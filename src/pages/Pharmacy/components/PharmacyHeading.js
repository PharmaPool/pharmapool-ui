import React, { useContext } from "react";

import { ValueContext } from "../../../Context";
import { useNavigate, useNavigation } from "react-router-dom";
import useWindowDimensions from "../../../components/useWindowDimensions";

import Logout from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import PharmacySettings from "./PharmacySettings";
import Transactions from "./Transactions";

function PharmacyHeading({ id }) {
  const { pharmacy } = useContext(ValueContext);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  return (
    <div className="heading_cont">
      <div className="pharmacy_title">
        <h1 style={{ textTransform: "capitalize" }}>{pharmacy.businessName}</h1>
        <i>{pharmacy.about}</i>
        <br />
        <p>
          <LocationOnIcon /> {pharmacy.location}
        </p>
        <p>
          <LocalPhoneIcon /> {pharmacy.contactNumber}
        </p>
      </div>
      <div className="pharmacy_logo">
        {pharmacy.logo && (
          <img src={pharmacy.logo.imageUrl} alt="pharmacy_logo" />
        )}
      </div>
      <div className="pharmacy_menu">
        <div>
          <button onClick={() => navigate("/pharmacy")}>
            {width > 900 ? "Log out" : <Logout />}
          </button>
        </div>
        <div>
          <button onClick={() => navigate("/product-gallery")}>
            {width > 900 ? "Product Gallery" : <InventoryIcon />}
          </button>
        </div>
        <div>
          <PharmacySettings pharmacyInfo={pharmacy} />
        </div>
        <div>
          <Transactions id={id} />
        </div>
      </div>
    </div>
  );
}

export default PharmacyHeading;
