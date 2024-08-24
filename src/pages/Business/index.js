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
  const { businesses, setBusinesses, tokenChecker } = useContext(ValueContext);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const login = jwtDecode(token);
    if (!login.user.loggedIn) {
      navigate(`/verify/signin?redirectTo=${location.pathname}`);
      return;
    }
    fetch("https://www.pharmapoolserver.com/api/business/", {
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
