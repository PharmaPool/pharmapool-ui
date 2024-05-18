import React, { useEffect, useState } from "react";
import "./index.css";
import InventoryList from "./components/InventoryList";

import { useParams } from "react-router-dom";

function Pharmacy() {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState({});
  const [inventory, setInventory] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/business/pharmacy/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setInventory(json.pharmacy.inventory);
        setPharmacy(json.pharmacy);
        setShow(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="pharmacy">
      <div className="pharmacy_banner">
        <div className="pharmacy_title">
          <h1 style={{ textTransform: "capitalize" }}>
            {pharmacy.businessName}
          </h1>
          <p>{pharmacy.about}</p>
        </div>
        <div className="pharmacy_logo">
          {pharmacy.logo && (
            <img src={pharmacy.logo.imageUrl} alt="pharmacy_logo" />
          )}
        </div>
        <div className="pharmacy_menu">
          <div>
            <button>Home</button>
          </div>
          <div>
            <button>Product Gallery</button>
          </div>
        </div>
        <InventoryList inventories={inventory} id={id} />
      </div>
    </div>
  );
}

export default Pharmacy;
