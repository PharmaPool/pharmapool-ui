import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import Register from "./Register";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
// import { ValueContext } from "../../Context";

function PharmacyLogin() {
  const navigate = useNavigate();
  // const { tokenChecker } = useContext(ValueContext);
  const _id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [pharmacy, setPharmacy] = useState([]);
  const [inventory, setInventory] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate(`/verify/signin?redirectTo=/pharmacy`);
    }
    fetch(`https://www.pharmapoolserver.com/api/business/pharmacies/${_id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate(`/verify/signin?redirectTo=/pharmacy`);
        }
        setPharmacy(json.pharmacy);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="invent_menu">
        <div>
          <button onClick={() => navigate("/profile")}>
            <ArrowCircleLeftIcon /> Back to profile
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
