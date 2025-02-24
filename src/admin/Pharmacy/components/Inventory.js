import React from "react";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import InventoryItem from "./InventoryItem";
import { useNavigate } from "react-router-dom";

function AdminInventory() {
  const navigate = useNavigate();
  return (
    <div className="pharmacy">
      <div className="invent_menu">
        <div>
          <button onClick={() => navigate(-1)}>
            <ArrowCircleLeftIcon />
            Back
          </button>
        </div>
      </div>
      <InventoryItem />
    </div>
  );
}

export default AdminInventory;
