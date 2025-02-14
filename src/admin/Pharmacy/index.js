import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
// import { ValueContext } from "../../Context";

function PharmacyLogin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [pharmacy, setPharmacy] = useState([]);

  useEffect(() => {
    fetch(`https://pharmapoolserver.com/api/admin/pharmacies`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate(`/admin/auth`);
        }
        setPharmacy(json.pharmacies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="invent_menu">
        <div>
          <button onClick={() => navigate("/admin/overview")}>
            <ArrowCircleLeftIcon /> Overview
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
                onClick={() => navigate(`/admin/pharmacy/${pharm._id}`)}
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
      </div>
    </>
  );
}

export default PharmacyLogin;
