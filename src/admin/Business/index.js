import React, { useContext, useEffect, useState } from "react";

import AdminHeader from "../components/AdminHeader";
import SingleBusiness from "../../pages/Business/components/SingleBusiness";
import BusinessLoader from "../../pages/Business/components/BusinessLoader";

import { ValueContext } from "../../Context";

function AdminBusiness() {
  const { businesses, setBusinesses } = useContext(ValueContext);
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("https://www.pharmapoolserver.com/api/admin/business", {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        setBusinesses(json.businesses);
      })
      .catch((err) => console.log(err));
  }, [setBusinesses, token]);
  return (
    <>
      <AdminHeader />
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

export default AdminBusiness;
