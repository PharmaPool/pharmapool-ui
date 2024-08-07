import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Register from "./Register";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function PharmacyLogin() {
  const navigate = useNavigate();
  const _id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [pharmacy, setPharmacy] = useState([]);
  useEffect(() => {
    fetch(`https://pharmapoolserver.com/api/business/pharmacies/${_id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => setPharmacy(json.pharmacy))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="invent_menu">
        <div>
          <button onClick={() => navigate("/profile")}>
            <ArrowCircleLeftIcon /> BACK TO PROFILE
          </button>
        </div>
      </div>
      <div className="login_container">
        <div className="pharmacy_login">
          {pharmacy.length > 0 ? (
            pharmacy.map((pharm, i) => (
              <div
                className="pharm"
                key={i}
                onClick={() => navigate(`/pharmacy/${pharm._id}`)}
              >
                <div className="pharm_logo">
                  {!pharm.logo ? (
                    ""
                  ) : (
                    <img src={pharm.logo.imageUrl} alt="pharmacy logo" />
                  )}
                </div>
                <h5
                  style={{ textTransform: "capitalize", textAlign: "center" }}
                >
                  {pharm.businessName}
                </h5>
              </div>
            ))
          ) : (
            <div>
              <h4>No pharmacy yet</h4>
            </div>
          )}
        </div>
        <Register />
      </div>
    </>
  );
}

export default PharmacyLogin;
