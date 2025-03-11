import React, { useEffect, useState } from "react";

import AdminHeader from "../components/AdminHeader";
import SingleBusiness from "./components/SingleBusiness";
import BusinessLoader from "../../pages/Business/components/BusinessLoader";

// import { ValueContext } from "../../Context";
import { useNavigate } from "react-router-dom";

function AdminBusiness() {
  const [businesses, setBusinesses] = useState([]);
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/admin/business", {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate("/admin/auth");
        }
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

export default AdminBusiness;
