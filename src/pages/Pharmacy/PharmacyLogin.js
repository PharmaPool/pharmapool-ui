import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Register from "./Register";

function PharmacyLogin() {
  const navigate = useNavigate();
  const _id = localStorage.getItem("userId");
  const [pharmacy, setPharmacy] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/business/pharmacies/${_id}`)
      .then((response) => response.json())
      .then((json) => setPharmacy(json.pharmacy))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="login_container">
      <h5>Click to continue</h5>
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
              <h5 style={{ textTransform: "capitalize" }}>
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
  );
}

export default PharmacyLogin;
