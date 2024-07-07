import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddForm from "./AddForm";
import RemoveForm from "./RemoveForm";

import { ValueContext } from "../../../Context";
import { useParams } from "react-router-dom";

function InventoryItem() {
  const { add, remove, setAdd, setRemove } = useContext(ValueContext);
  const [inventory, setInventory] = useState({});
  const [invent, setInvent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/business/inventory/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setInventory(json.inventory);
        setInvent(json.inventory.inventory);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="inventory_list">
      <div className="interested_partners">
        <h2 style={{ textTransform: "capitalize" }}>{inventory.product}</h2>
        <table>
          <tr>
            <th>Brand</th>
            <th>Strength</th>
            <th>manufacturer</th>
            <th>Date in</th>
            <th>expiry date</th>
            <th>quantity</th>
          </tr>
          {invent.map((invent, i) => {
            return (
              <tr>
                <td>{invent.brand}</td>
                <td>{invent.strength}</td>
                <td>{invent.manufacturer}</td>
                <td>
                  {new Date(invent.dateIn).toUTCString().substring(0, 16)}
                </td>
                <td>
                  {new Date(invent.expiryDate).toUTCString().substring(0, 16)}
                </td>
                <td>{invent.quantity}</td>
              </tr>
            );
          })}
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th style={{ textAlign: "end" }}>total =</th>
            <th style={{ textAlign: "center" }}>{inventory.total}</th>
          </tr>
        </table>
        {add && <AddForm id={inventory._id} />}
        {remove && <RemoveForm id={inventory._id} invent={invent} />}
        <div className="add_product">
          <button className="clicked_interest" onClick={() => setAdd()}>
            <AddIcon /> Add Stock
          </button>
          <button className="interest" onClick={() => setRemove()}>
            <RemoveIcon /> Remove Stock
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryItem;
