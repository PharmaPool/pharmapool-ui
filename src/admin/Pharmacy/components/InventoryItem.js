import React, { useContext, useEffect, useState } from "react";

import { ValueContext } from "../../../Context";
import { useParams } from "react-router-dom";
import useWindowDimensions from "../../../components/useWindowDimensions";

function InventoryItem() {
  const { add, remove, setAdd, setRemove } = useContext(ValueContext);
  const [inventory, setInventory] = useState({});
  const [invent, setInvent] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const { width } = useWindowDimensions();

  
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/admin/inventory/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        setInventory(json.inventory);
        setInvent(json.inventory.inventory);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="inventory_item">
      <h2 style={{ textTransform: "capitalize" }}>{inventory.product}</h2>
      <div className="inventory">
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
      </div>
    </div>
  );
}

export default InventoryItem;
