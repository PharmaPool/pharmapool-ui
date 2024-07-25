import React, { useEffect, useState, useContext } from "react";
import "./index.css";
import InventoryList from "./components/InventoryList";

import { useParams } from "react-router-dom";
import PharmacyHeading from "./components/PharmacyHeading";

import { ValueContext } from "../../Context";

function Pharmacy() {
  const { id } = useParams();
  const { setPharmacy } = useContext(ValueContext);
  const [inventory, setInventory] = useState([]);
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch(`https://pharmapoolserver.com/api/business/pharmacy/${id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((json) => {
        setInventory(json.pharmacy.inventory);
        setPharmacy(json.pharmacy);
        setTransactions(json.pharmacy.allTransactions);
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
