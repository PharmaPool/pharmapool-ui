import React, { useContext, useEffect } from "react";

import Header from "../../components/Header";
import SingleBusiness from "./components/SingleBusiness";

import Loading from "../../data/loader.gif";

import { ValueContext } from "../../Context";

function Business() {
  const { businesses, setBusinesses } = useContext(ValueContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/business/")
      .then((response) => response.json())
      .then((json) => setBusinesses(json.businesses))
      .catch((err) => console.log(err));
  }, []);
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
            <div className="loader">
              <img src={Loading} alt="" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Business;
