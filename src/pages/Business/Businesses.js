import React, { useContext, useEffect } from "react";

import Header from "../../components/Header";
import SingleBusiness from "./components/SingleBusiness";
import BusinessLoader from "./components/BusinessLoader";

import { ValueContext } from "../../Context";

function Business() {
  const { businesses, setBusinesses, tokenChecker } = useContext(ValueContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    tokenChecker();
    fetch("https://pharmapoolserver.com/api/auth/", {
      Authorization: token,
    })
      .then((response) => response.json())
      .then((json) => setBusinesses(json.businesses))
      .catch((err) => console.log(err));
  }, [setBusinesses, token, tokenChecker]);
  return (
    <>
      <Header />
      <div className="businesses">
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

export default Business;
