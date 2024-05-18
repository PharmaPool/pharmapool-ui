import React from "react";

import Logo from "../../../data/logo.png";
import InventoryItem from "./InventoryItem";

function Inventory() {
  return (
    <div className="pharmacy">
      <div className="pharmacy_banner">
        <div className="pharmacy_title">
          <h1>HealthWise GLobal Connect Pharmaceutical Limited</h1>
          <p>with pharmapool, your pharmacy is connected</p>
        </div>
        <div className="pharmacy_logo">
          <img src={Logo} alt="pharmacy_logo" />
        </div>
        <div className="pharmacy_menu">
          <div>
            <button>Home</button>
          </div>
          <div>
            <button>Product Gallery</button>
          </div>
        </div>
        <InventoryItem />
      </div>
    </div>
  );
}

export default Inventory;
