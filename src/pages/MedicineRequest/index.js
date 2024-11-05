import React from "react";
import "./index.css"
import MedicineRequest from "./components/MedicineRequest";
import images from "../../data/images";

import { useNavigate } from "react-router-dom";

function MedicineRequests() {
  const navigate = useNavigate();
  return (
    <div className="medicine_requests">
      <div class="medicine_img">
        <img
          src={images.logo}
          alt="pharmapool logo"
          width={80}
          onClick={() => navigate("/")}
        />
      </div>
      <MedicineRequest />
    </div>
  );
}

export default MedicineRequests;
