import React, { useContext, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

import AddProduct from "./AddProduct";

import { ValueContext } from "../../../Context";
import { useNavigate } from "react-router-dom";

function InventoryList({ inventories, id }) {
  const { product, setProduct } = useContext(ValueContext);
  const navigate = useNavigate();
  return (
    <div className="inventory_list">
      <div className="interested_partners">
        <h4>Available Products</h4>
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity available</th>
            <th></th>
          </tr>
          {inventories.map((invent, i) => (
            <tr key={i}>
              <td>{invent.product}</td>
              <td>{invent.total} cartons</td>
              <td>
                <button
                  className="interest"
                  onClick={() => navigate(`/pharmacy/${invent._id}/inventory`)}
                >
                  Inventory
                </button>
              </td>
            </tr>
          ))}
        </table>
        {product && <AddProduct id={id} />}
        <div className="add_product">
          <button
            className="interest"
            onClick={() => {
              setProduct();
            }}
          >
            <AddIcon /> Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryList;
