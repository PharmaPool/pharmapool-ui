import React, { useContext, useEffect } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import PostModal from "./components/BusinessModal";
import SingleBusiness from "./components/SingleBusiness";
import BusinessLoader from "./components/BusinessLoader";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";
import { useNavigate } from "react-router-dom";

function PrivateBusiness() {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { businesses, setBusinesses, tokenChecker } = useContext(ValueContext);

  useEffect(() => {
    const token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }
    fetch("http://127.0.0.1:8000/api/business/", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setBusinesses(json.businesses);
      })
      .catch((err) => console.log(err));
  }, [navigate, setBusinesses, tokenChecker]);
  return (
    <>
      {width > 900 ? <PrivateHeader /> : <MediaHeader />}
      <div className="businesses">
        <div className="create_business">
          <PostModal />
        </div>
        <div className="business_body">
          {businesses ? (
            businesses.map((business, i) => (
              <SingleBusiness key={i} business={business} />
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
