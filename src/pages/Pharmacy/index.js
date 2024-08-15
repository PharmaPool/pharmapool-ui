import React, { useEffect, useState, useContext } from "react";
import "./index.css";
import InventoryList from "./components/InventoryList";

import { useParams, useNavigate } from "react-router-dom";
import PharmacyHeading from "./components/PharmacyHeading";

import { ValueContext } from "../../Context";

function Pharmacy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setPharmacy, tokenChecker } = useContext(ValueContext);
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    const token = tokenChecker();
    if (!token) {
      navigate("/signin");
    }
    fetch(`https://www.pharmapoolserver.com/api/business/pharmacy/${id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
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

export default Pharmacy;
