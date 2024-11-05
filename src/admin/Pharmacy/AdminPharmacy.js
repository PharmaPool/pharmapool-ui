import React, { useEffect, useState, useContext } from "react";
import "./index.css";
import InventoryList from "./components/InventoryList";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import PharmacyHeading from "./components/PharmacyHeading";

import { jwtDecode } from "jwt-decode";
import { ValueContext } from "../../Context";

function AdminPharmacy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { setPharmacy, tokenChecker } = useContext(ValueContext);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/admin/pharmacy/${id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigate(`/admin/auth`);
        }
        setInventory(json.pharmacy.inventory);
        setPharmacy(json.pharmacy);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="pharmacy">
      <div className="pharmacy_banner">
        <PharmacyHeading id={id} />
        <InventoryList inventories={inventory} id={id} />
      </div>
    </div>
  );
}

export default AdminPharmacy;
