import React, { useContext, useEffect } from "react";
import "./index.css";

import MediaHeader from "../../components/MediaHeader";
import PrivateHeader from "../../components/PrivateHeader";
import PostModal from "./components/BusinessModal";
import SingleBusiness from "./components/SingleBusiness";

import Loading from "../../data/loader.gif";

import useWindowDimensions from "../../components/useWindowDimensions";
import { ValueContext } from "../../Context";

function PrivateBusiness() {
  const { width } = useWindowDimensions();
  const { businesses, setBusinesses, setShow } = useContext(ValueContext);
  const _id = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/business/")
      .then((response) => response.json())
      .then((json) => {
        setBusinesses(json.businesses);
        console.log(json.businesses);
      })
      .catch((err) => console.log(err));
  }, []);
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
            <div className="loader">
              <img src={Loading} alt="" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PrivateBusiness;
