import React, { useContext, useEffect, useState } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import PostModal from "./components/BusinessModal";
import SingleBusiness from "./components/SingleBusiness";
import BusinessLoader from "./components/BusinessLoader";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateBusiness() {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const location = useLocation();
  const { businesses, setBusinesses, tokenChecker, setAlert } =
    useContext(ValueContext);
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setAlert(
      true,
      "ALL TRANSACTIONS SHOULD BE DONE THROUGH PHARMAPOOL TO AVOID SCAM. ALL FINANCIAL TRANSACTIONS SHOULD BE DONE THROUGH PHARMAPOOL ACCOUNT FOR SECURITY REASONS",
      "Warning"
    );
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch("http://127.0.0.1:8000/api/business/", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate(`/verify/signin?redirectTo=${location.pathname}`);
          return;
        }
        setLoggedIn(json.loggedIn);
        setBusinesses(json.businesses);
      })
      .catch((err) => console.log(err));
  }, [navigate, setBusinesses, tokenChecker]);
  return (
    <>
      {width > 1200 ? <PrivateHeader /> : <MediaHeader />}
      <div className="businesses">
        <div className="create_business">
          <PostModal />
        </div>
        <div className="business_body">
          {businesses.length > 0 ? (
            businesses.map((business, i) => (
              <SingleBusiness key={i} business={business} loggedIn={loggedIn} />
            ))
          ) : (
            <BusinessLoader />
          )}
        </div>
      </div>
    </>
  );
}

export default PrivateBusiness;
