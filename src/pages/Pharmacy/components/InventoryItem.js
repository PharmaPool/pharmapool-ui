import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddFormWide from "./AddFormWide";
import AddFormMin from "./AddFormMin";
import RemoveForm from "./RemoveForm";
import RemoveFormMin from "./RemoveFormMin";

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
    fetch(`https://www.pharmapoolserver.com/api/business/inventory/${id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
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
      <div className="table_below">
        {add && width > 1000 ? <AddFormWide id={inventory._id} /> : ""}
        {add && width < 1000 ? <AddFormMin id={inventory._id} /> : ""}
        {remove && width > 1000 ? (
          <RemoveForm id={inventory._id} invent={invent} />
        ) : (
          ""
        )}
        {remove && width < 1000 ? (
          <RemoveFormMin id={inventory._id} invent={invent} />
        ) : (
          ""
        )}
        <div class="table_below">
          <div className="add_product">
            <button className="interest" onClick={() => setAdd()}>
              <AddIcon /> Add
            </button>
            <button className="not_interest" onClick={() => setRemove()}>
              <RemoveIcon /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryItem;
