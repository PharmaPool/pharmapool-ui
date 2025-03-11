import React, { useContext, useEffect, useState } from "react";

import Header from "../../components/Header";
import SingleBusiness from "./components/SingleBusiness";
import BusinessLoader from "./components/BusinessLoader";

import { ValueContext } from "../../Context";

function Business() {
  const { businesses, setBusinesses, tokenChecker } = useContext(ValueContext);
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/auth/", {
      Authorization: token,
    })
      .then((response) => response.json())
      .then((json) => {
        setLoggedIn(json.loggedIn);
        setBusinesses(json.businesses);
      })
      .catch((err) => console.log(err));
  }, [setBusinesses, token, tokenChecker]);
  return (
    <>
      <Header />
      <div className="businesses">
        <div className="business_body">
          {businesses ? (
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

export default Business;
